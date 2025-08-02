import { Hono } from 'npm:hono'
import { cors } from 'npm:hono/cors'
import { logger } from 'npm:hono/middleware'
import { createClient } from 'npm:@supabase/supabase-js'
import * as kv from './kv_store.tsx'

const app = new Hono()

// Middleware
app.use('*', cors({
  origin: '*',
  allowHeaders: ['*'],
  allowMethods: ['*'],
}))
app.use('*', logger(console.log))

// Initialize Supabase clients
const supabaseAdmin = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

const supabaseClient = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_ANON_KEY')!
)

// Authentication helper
async function authenticateUser(request: Request) {
  const accessToken = request.headers.get('Authorization')?.split(' ')[1]
  if (!accessToken) {
    return { error: 'No access token provided', user: null }
  }
  
  const { data: { user }, error } = await supabaseAdmin.auth.getUser(accessToken)
  if (error || !user) {
    return { error: 'Invalid or expired token', user: null }
  }
  
  return { error: null, user }
}

// User Registration
app.post('/make-server-011f0f30/auth/signup', async (c) => {
  try {
    const { email, password, name, userType, location } = await c.req.json()
    
    if (!email || !password || !name) {
      return c.json({ error: 'Missing required fields' }, 400)
    }

    // Create user with Supabase Auth
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      user_metadata: { 
        name, 
        user_type: userType || 'traveler',
        location: location || '',
        verified: false,
        safety_rating: 5,
        created_at: new Date().toISOString()
      },
      // Automatically confirm the user's email since an email server hasn't been configured
      email_confirm: true
    })

    if (error) {
      console.log('Signup error:', error)
      return c.json({ error: error.message }, 400)
    }

    // Store additional user profile data
    const userProfile = {
      user_id: data.user.id,
      email,
      name,
      user_type: userType || 'traveler',
      location: location || '',
      verified: false,
      safety_rating: 5,
      bio: '',
      languages: ['English'],
      experience_years: 0,
      specialties: [],
      rating: 0,
      review_count: 0,
      created_at: new Date().toISOString()
    }

    await kv.set(`user_profile:${data.user.id}`, userProfile)

    return c.json({ 
      message: 'User created successfully',
      user: data.user,
      profile: userProfile
    })
  } catch (error) {
    console.log('Signup error:', error)
    return c.json({ error: 'Internal server error during signup' }, 500)
  }
})

// Get User Profile
app.get('/make-server-011f0f30/auth/profile', async (c) => {
  try {
    const { error, user } = await authenticateUser(c.req.raw)
    if (error || !user) {
      return c.json({ error: error || 'Authentication failed' }, 401)
    }

    const profile = await kv.get(`user_profile:${user.id}`)
    if (!profile) {
      return c.json({ error: 'Profile not found' }, 404)
    }

    return c.json({ profile })
  } catch (error) {
    console.log('Profile fetch error:', error)
    return c.json({ error: 'Failed to fetch profile' }, 500)
  }
})

// Update User Profile
app.put('/make-server-011f0f30/auth/profile', async (c) => {
  try {
    const { error, user } = await authenticateUser(c.req.raw)
    if (error || !user) {
      return c.json({ error: error || 'Authentication failed' }, 401)
    }

    const updates = await c.req.json()
    const currentProfile = await kv.get(`user_profile:${user.id}`)
    
    if (!currentProfile) {
      return c.json({ error: 'Profile not found' }, 404)
    }

    const updatedProfile = {
      ...currentProfile,
      ...updates,
      updated_at: new Date().toISOString()
    }

    await kv.set(`user_profile:${user.id}`, updatedProfile)

    return c.json({ profile: updatedProfile })
  } catch (error) {
    console.log('Profile update error:', error)
    return c.json({ error: 'Failed to update profile' }, 500)
  }
})

// Travel Journal Routes

// Create Journal Entry
app.post('/make-server-011f0f30/journal/create', async (c) => {
  try {
    const { error, user } = await authenticateUser(c.req.raw)
    if (error || !user) {
      return c.json({ error: error || 'Authentication required' }, 401)
    }

    const { title, content, location, tags, images, safety_rating } = await c.req.json()
    
    if (!title || !content) {
      return c.json({ error: 'Title and content are required' }, 400)
    }

    const journalEntry = {
      id: crypto.randomUUID(),
      user_id: user.id,
      title,
      content,
      location: location || '',
      tags: tags || [],
      images: images || [],
      safety_rating: safety_rating || 5,
      likes: 0,
      comments: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    await kv.set(`journal:${journalEntry.id}`, journalEntry)
    
    // Add to user's journal list
    const userJournals = await kv.get(`user_journals:${user.id}`) || []
    userJournals.unshift(journalEntry.id)
    await kv.set(`user_journals:${user.id}`, userJournals)

    return c.json({ 
      message: 'Journal entry created successfully',
      entry: journalEntry
    })
  } catch (error) {
    console.log('Journal creation error:', error)
    return c.json({ error: 'Failed to create journal entry' }, 500)
  }
})

// Get Journal Entries
app.get('/make-server-011f0f30/journal/list', async (c) => {
  try {
    const page = parseInt(c.req.query('page') || '1')
    const limit = parseInt(c.req.query('limit') || '10')
    const category = c.req.query('category') || 'all'

    // Get all journal entries
    const allEntries = await kv.getByPrefix('journal:')
    
    if (!allEntries || allEntries.length === 0) {
      return c.json({ entries: [], total: 0, page, limit })
    }

    // Filter by category if specified
    let filteredEntries = allEntries
    if (category !== 'all') {
      filteredEntries = allEntries.filter(entry => {
        return entry.tags && entry.tags.some((tag: string) => 
          tag.toLowerCase().includes(category.toLowerCase())
        )
      })
    }

    // Sort by creation date (newest first)
    filteredEntries.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

    // Paginate
    const startIndex = (page - 1) * limit
    const paginatedEntries = filteredEntries.slice(startIndex, startIndex + limit)

    // Enrich with user profiles
    const enrichedEntries = await Promise.all(
      paginatedEntries.map(async (entry) => {
        const userProfile = await kv.get(`user_profile:${entry.user_id}`)
        return {
          ...entry,
          author: userProfile ? {
            name: userProfile.name,
            verified: userProfile.verified,
            nationality: userProfile.location,
            user_type: userProfile.user_type
          } : null
        }
      })
    )

    return c.json({
      entries: enrichedEntries,
      total: filteredEntries.length,
      page,
      limit
    })
  } catch (error) {
    console.log('Journal list error:', error)
    return c.json({ error: 'Failed to fetch journal entries' }, 500)
  }
})

// Like Journal Entry
app.post('/make-server-011f0f30/journal/:id/like', async (c) => {
  try {
    const { error, user } = await authenticateUser(c.req.raw)
    if (error || !user) {
      return c.json({ error: error || 'Authentication required' }, 401)
    }

    const entryId = c.req.param('id')
    const entry = await kv.get(`journal:${entryId}`)
    
    if (!entry) {
      return c.json({ error: 'Journal entry not found' }, 404)
    }

    // Check if user already liked
    const userLikes = await kv.get(`user_likes:${user.id}`) || []
    const hasLiked = userLikes.includes(entryId)

    if (hasLiked) {
      // Unlike
      entry.likes = Math.max(0, entry.likes - 1)
      const updatedLikes = userLikes.filter((id: string) => id !== entryId)
      await kv.set(`user_likes:${user.id}`, updatedLikes)
    } else {
      // Like
      entry.likes += 1
      userLikes.push(entryId)
      await kv.set(`user_likes:${user.id}`, userLikes)
    }

    await kv.set(`journal:${entryId}`, entry)

    return c.json({ 
      likes: entry.likes,
      liked: !hasLiked
    })
  } catch (error) {
    console.log('Journal like error:', error)
    return c.json({ error: 'Failed to like journal entry' }, 500)
  }
})

// Marketplace Routes

// Create Service Listing
app.post('/make-server-011f0f30/marketplace/create', async (c) => {
  try {
    const { error, user } = await authenticateUser(c.req.raw)
    if (error || !user) {
      return c.json({ error: error || 'Authentication required' }, 401)
    }

    const { 
      title, 
      description, 
      category, 
      price, 
      duration, 
      max_people, 
      location, 
      images, 
      specialties, 
      safety_features 
    } = await c.req.json()
    
    if (!title || !description || !category || !price) {
      return c.json({ error: 'Required fields missing' }, 400)
    }

    const serviceId = crypto.randomUUID()
    const service = {
      id: serviceId,
      provider_id: user.id,
      title,
      description,
      category,
      price,
      duration: duration || '',
      max_people: max_people || 1,
      location: location || '',
      images: images || [],
      specialties: specialties || [],
      safety_features: safety_features || [],
      rating: 0,
      review_count: 0,
      bookings: 0,
      available: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    await kv.set(`service:${serviceId}`, service)
    
    // Add to provider's services list
    const providerServices = await kv.get(`provider_services:${user.id}`) || []
    providerServices.push(serviceId)
    await kv.set(`provider_services:${user.id}`, providerServices)

    return c.json({ 
      message: 'Service listing created successfully',
      service
    })
  } catch (error) {
    console.log('Service creation error:', error)
    return c.json({ error: 'Failed to create service listing' }, 500)
  }
})

// Get Marketplace Services
app.get('/make-server-011f0f30/marketplace/list', async (c) => {
  try {
    const category = c.req.query('category') || 'all'
    const location = c.req.query('location') || ''
    const page = parseInt(c.req.query('page') || '1')
    const limit = parseInt(c.req.query('limit') || '12')

    // Get all services
    const allServices = await kv.getByPrefix('service:')
    
    if (!allServices || allServices.length === 0) {
      return c.json({ services: [], total: 0, page, limit })
    }

    // Filter services
    let filteredServices = allServices.filter(service => service.available)
    
    if (category !== 'all') {
      filteredServices = filteredServices.filter(service => service.category === category)
    }
    
    if (location) {
      filteredServices = filteredServices.filter(service => 
        service.location.toLowerCase().includes(location.toLowerCase())
      )
    }

    // Sort by rating and creation date
    filteredServices.sort((a, b) => {
      if (a.rating !== b.rating) return b.rating - a.rating
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    })

    // Paginate
    const startIndex = (page - 1) * limit
    const paginatedServices = filteredServices.slice(startIndex, startIndex + limit)

    // Enrich with provider profiles
    const enrichedServices = await Promise.all(
      paginatedServices.map(async (service) => {
        const providerProfile = await kv.get(`user_profile:${service.provider_id}`)
        return {
          ...service,
          provider: providerProfile ? {
            name: providerProfile.name,
            verified: providerProfile.verified,
            rating: providerProfile.rating,
            review_count: providerProfile.review_count,
            experience_years: providerProfile.experience_years,
            languages: providerProfile.languages
          } : null
        }
      })
    )

    return c.json({
      services: enrichedServices,
      total: filteredServices.length,
      page,
      limit
    })
  } catch (error) {
    console.log('Marketplace list error:', error)
    return c.json({ error: 'Failed to fetch marketplace services' }, 500)
  }
})

// Help System Routes

// Ask Question
app.post('/make-server-011f0f30/help/ask', async (c) => {
  try {
    const { error, user } = await authenticateUser(c.req.raw)
    if (error || !user) {
      return c.json({ error: error || 'Authentication required' }, 401)
    }

    const { question, location, category, urgency } = await c.req.json()
    
    if (!question) {
      return c.json({ error: 'Question is required' }, 400)
    }

    const questionId = crypto.randomUUID()
    const questionData = {
      id: questionId,
      user_id: user.id,
      question,
      location: location || '',
      category: category || 'general',
      urgency: urgency || 'medium',
      status: urgency === 'emergency' ? 'urgent' : 'open',
      responses: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    await kv.set(`question:${questionId}`, questionData)
    
    // Add to questions list
    const allQuestions = await kv.get('all_questions') || []
    allQuestions.unshift(questionId)
    await kv.set('all_questions', allQuestions)

    return c.json({ 
      message: 'Question posted successfully',
      question: questionData
    })
  } catch (error) {
    console.log('Question posting error:', error)
    return c.json({ error: 'Failed to post question' }, 500)
  }
})

// Get Questions
app.get('/make-server-011f0f30/help/questions', async (c) => {
  try {
    const status = c.req.query('status') || 'all'
    const page = parseInt(c.req.query('page') || '1')
    const limit = parseInt(c.req.query('limit') || '10')

    const questionIds = await kv.get('all_questions') || []
    
    if (questionIds.length === 0) {
      return c.json({ questions: [], total: 0, page, limit })
    }

    // Get question details
    const questions = await Promise.all(
      questionIds.map(async (id: string) => await kv.get(`question:${id}`))
    )

    // Filter valid questions
    let validQuestions = questions.filter(q => q !== null)

    // Filter by status
    if (status !== 'all') {
      if (status === 'unanswered') {
        validQuestions = validQuestions.filter(q => q.responses.length === 0)
      } else if (status === 'urgent') {
        validQuestions = validQuestions.filter(q => q.urgency === 'emergency' || q.status === 'urgent')
      } else {
        validQuestions = validQuestions.filter(q => q.status === status)
      }
    }

    // Sort by urgency and creation date
    validQuestions.sort((a, b) => {
      const urgencyOrder = { emergency: 3, high: 2, medium: 1, low: 0 }
      const aUrgency = urgencyOrder[a.urgency as keyof typeof urgencyOrder] || 0
      const bUrgency = urgencyOrder[b.urgency as keyof typeof urgencyOrder] || 0
      
      if (aUrgency !== bUrgency) return bUrgency - aUrgency
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    })

    // Paginate
    const startIndex = (page - 1) * limit
    const paginatedQuestions = validQuestions.slice(startIndex, startIndex + limit)

    // Enrich with user profiles
    const enrichedQuestions = await Promise.all(
      paginatedQuestions.map(async (question) => {
        const userProfile = await kv.get(`user_profile:${question.user_id}`)
        
        // Enrich responses with responder profiles
        const enrichedResponses = await Promise.all(
          question.responses.map(async (response: any) => {
            const responderProfile = await kv.get(`user_profile:${response.responder_id}`)
            return {
              ...response,
              responder: responderProfile ? {
                name: responderProfile.name,
                verified: responderProfile.verified,
                user_type: responderProfile.user_type,
                rating: responderProfile.rating
              } : null
            }
          })
        )

        return {
          ...question,
          responses: enrichedResponses,
          user: userProfile ? {
            name: userProfile.name,
            nationality: userProfile.location
          } : null
        }
      })
    )

    return c.json({
      questions: enrichedQuestions,
      total: validQuestions.length,
      page,
      limit
    })
  } catch (error) {
    console.log('Questions fetch error:', error)
    return c.json({ error: 'Failed to fetch questions' }, 500)
  }
})

// Answer Question
app.post('/make-server-011f0f30/help/answer/:id', async (c) => {
  try {
    const { error, user } = await authenticateUser(c.req.raw)
    if (error || !user) {
      return c.json({ error: error || 'Authentication required' }, 401)
    }

    const questionId = c.req.param('id')
    const { response } = await c.req.json()
    
    if (!response) {
      return c.json({ error: 'Response is required' }, 400)
    }

    const question = await kv.get(`question:${questionId}`)
    if (!question) {
      return c.json({ error: 'Question not found' }, 404)
    }

    const responseData = {
      id: crypto.randomUUID(),
      responder_id: user.id,
      response,
      helpful: 0,
      created_at: new Date().toISOString()
    }

    question.responses.push(responseData)
    question.status = 'answered'
    question.updated_at = new Date().toISOString()

    await kv.set(`question:${questionId}`, question)

    return c.json({ 
      message: 'Response added successfully',
      response: responseData
    })
  } catch (error) {
    console.log('Response posting error:', error)
    return c.json({ error: 'Failed to post response' }, 500)
  }
})

// Real-time Alerts Routes

// Get Alerts
app.get('/make-server-011f0f30/alerts/list', async (c) => {
  try {
    const location = c.req.query('location') || ''
    const type = c.req.query('type') || 'all'

    // Get all alerts
    const allAlerts = await kv.getByPrefix('alert:')
    
    if (!allAlerts || allAlerts.length === 0) {
      return c.json({ alerts: [] })
    }

    // Filter alerts
    let filteredAlerts = allAlerts.filter(alert => {
      const now = new Date()
      const alertExpiry = new Date(alert.expires_at)
      return alertExpiry > now // Only return active alerts
    })

    if (location) {
      filteredAlerts = filteredAlerts.filter(alert => 
        alert.location.toLowerCase().includes(location.toLowerCase())
      )
    }

    if (type !== 'all') {
      filteredAlerts = filteredAlerts.filter(alert => alert.type === type)
    }

    // Sort by severity and creation date
    filteredAlerts.sort((a, b) => {
      const severityOrder = { emergency: 4, danger: 3, warning: 2, info: 1 }
      const aSeverity = severityOrder[a.severity as keyof typeof severityOrder] || 0
      const bSeverity = severityOrder[b.severity as keyof typeof severityOrder] || 0
      
      if (aSeverity !== bSeverity) return bSeverity - aSeverity
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    })

    return c.json({ alerts: filteredAlerts })
  } catch (error) {
    console.log('Alerts fetch error:', error)
    return c.json({ error: 'Failed to fetch alerts' }, 500)
  }
})

// Create Alert (Admin/Local Authority use)
app.post('/make-server-011f0f30/alerts/create', async (c) => {
  try {
    const { error, user } = await authenticateUser(c.req.raw)
    if (error || !user) {
      return c.json({ error: error || 'Authentication required' }, 401)
    }

    // Check if user is authorized to create alerts (local authority or verified local)
    const userProfile = await kv.get(`user_profile:${user.id}`)
    if (!userProfile || (!userProfile.verified && userProfile.user_type !== 'local_authority')) {
      return c.json({ error: 'Not authorized to create alerts' }, 403)
    }

    const { type, severity, title, message, location, expires_in_hours } = await c.req.json()
    
    if (!type || !severity || !title || !message) {
      return c.json({ error: 'Required fields missing' }, 400)
    }

    const alertId = crypto.randomUUID()
    const expiresAt = new Date()
    expiresAt.setHours(expiresAt.getHours() + (expires_in_hours || 24))

    const alert = {
      id: alertId,
      type,
      severity,
      title,
      message,
      location: location || '',
      created_by: user.id,
      created_at: new Date().toISOString(),
      expires_at: expiresAt.toISOString()
    }

    await kv.set(`alert:${alertId}`, alert)

    return c.json({ 
      message: 'Alert created successfully',
      alert
    })
  } catch (error) {
    console.log('Alert creation error:', error)
    return c.json({ error: 'Failed to create alert' }, 500)
  }
})

// Initialize sample data on startup
async function initializeSampleData() {
  try {
    // Check if sample data already exists
    const existingAlerts = await kv.getByPrefix('alert:')
    if (existingAlerts && existingAlerts.length > 0) {
      console.log('Sample data already exists, skipping initialization')
      return
    }

    console.log('Initializing sample data...')

    // Create sample alerts
    const sampleAlerts = [
      {
        id: crypto.randomUUID(),
        type: 'weather',
        severity: 'warning',
        title: 'Heavy Rain Expected',
        message: 'Monsoon rains expected in Kathmandu Valley for next 3 days. Plan indoor activities.',
        location: 'Kathmandu Valley',
        created_by: 'system',
        created_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString() // 72 hours
      },
      {
        id: crypto.randomUUID(),
        type: 'safety',
        severity: 'info',
        title: 'Festival Celebration',
        message: 'Gai Jatra festival happening in Patan. Expect road closures and crowds in old town area.',
        location: 'Patan',
        created_by: 'system',
        created_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
      }
    ]

    for (const alert of sampleAlerts) {
      await kv.set(`alert:${alert.id}`, alert)
    }

    console.log('Sample data initialized successfully')
  } catch (error) {
    console.log('Error initializing sample data:', error)
  }
}

// Initialize sample data
initializeSampleData()

// Health check
app.get('/make-server-011f0f30/health', async (c) => {
  return c.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    message: 'Nepal Travel Platform API is running'
  })
})

Deno.serve(app.fetch)