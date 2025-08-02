# 📚 Component Documentation

This document provides detailed information about all components in the Wanderly Nepal application.

## 🏗️ Architecture Overview

The application follows a component-based architecture with the following structure:

```
App.tsx (Main App Component)
├── MainNavigation.tsx (Global Navigation)
├── HomePage.tsx (Landing Page)
├── TravelJournal.tsx (Journal Features)
├── LocalMarketplace.tsx (Marketplace Features)
├── OfflineGuideBuilder.tsx (Offline Features)
├── AuthModal.tsx (Authentication)
└── UI Components (Reusable Components)
```

## 🧭 Core Components

### App.tsx
**Purpose**: Main application component that manages global state and routing.

**Key Features**:
- User authentication state management
- Tab navigation between main sections
- Loading state handling
- Scroll-based interactions

**Props**: None (Root component)

**State**:
```tsx
const [activeTab, setActiveTab] = useState('home');
const [isAuthenticated, setIsAuthenticated] = useState(false);
const [currentUser, setCurrentUser] = useState<User | null>(null);
const [searchQuery, setSearchQuery] = useState('');
const [isScrolled, setIsScrolled] = useState(false);
const [isLoading, setIsLoading] = useState(true);
```

**Usage**:
```tsx
// Root component - no direct usage
ReactDOM.render(<App />, document.getElementById('root'));
```

---

### MainNavigation.tsx
**Purpose**: Primary navigation component with search, tabs, and user controls.

**Key Features**:
- Responsive tab navigation
- Expandable search functionality
- User authentication controls
- Scroll-to-top button

**Props**:
```tsx
interface MainNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  profile?: UserProfile;
  isAuthenticated: boolean;
  onLogin: () => void;
  onLogout: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isScrolled: boolean;
}
```

**Usage**:
```tsx
<MainNavigation
  activeTab={activeTab}
  onTabChange={setActiveTab}
  profile={userProfile}
  isAuthenticated={isAuthenticated}
  onLogin={handleLogin}
  onLogout={handleLogout}
  searchQuery={searchQuery}
  onSearchChange={setSearchQuery}
  isScrolled={isScrolled}
/>
```

---

### HomePage.tsx
**Purpose**: Landing page showcasing popular destinations and travel information.

**Key Features**:
- Hero section with search
- Popular destinations grid
- Travel statistics
- Featured experiences

**Props**:
```tsx
interface HomePageProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  popularSectionRef: React.RefObject<HTMLDivElement>;
}
```

**State**:
```tsx
const [selectedCategory, setSelectedCategory] = useState('all');
const [favorites, setFavorites] = useState<string[]>([]);
```

**Usage**:
```tsx
<HomePage
  searchQuery={searchQuery}
  onSearchChange={setSearchQuery}
  popularSectionRef={popularSectionRef}
/>
```

---

### TravelJournal.tsx
**Purpose**: Digital travel diary with entries, photos, and mood tracking.

**Key Features**:
- Create and edit journal entries
- Photo upload and gallery
- Mood tracking system
- Social sharing capabilities

**Props**: None (Self-contained component)

**State**:
```tsx
const [entries, setEntries] = useState<JournalEntry[]>([]);
const [isCreating, setIsCreating] = useState(false);
const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
const [selectedMood, setSelectedMood] = useState<string>('');
```

**Data Types**:
```tsx
interface JournalEntry {
  id: string;
  title: string;
  content: string;
  date: string;
  location: string;
  mood: string;
  images: string[];
  tags: string[];
  isPublic: boolean;
  likes: number;
  comments: number;
}
```

**Usage**:
```tsx
<TravelJournal />
```

---

### LocalMarketplace.tsx
**Purpose**: Marketplace for local services, guides, and experiences.

**Key Features**:
- Browse local services
- Filter by category and location
- Contact service providers
- Booking system integration

**Props**: None (Self-contained component)

**State**:
```tsx
const [selectedCategory, setSelectedCategory] = useState('all');
const [searchQuery, setSearchQuery] = useState('');
const [selectedLocation, setSelectedLocation] = useState('');
const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
```

**Data Types**:
```tsx
interface MarketplaceItem {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  location: string;
  provider: {
    name: string;
    rating: number;
    verified: boolean;
    avatar: string;
  };
  images: string[];
  tags: string[];
  rating: number;
  reviews: number;
}
```

**Usage**:
```tsx
<LocalMarketplace />
```

---

### OfflineGuideBuilder.tsx
**Purpose**: Create and manage offline travel guides for areas with limited connectivity.

**Key Features**:
- Download content for offline use
- Manage storage space
- Create custom itineraries
- Emergency information access

**Props**: None (Self-contained component)

**State**:
```tsx
const [guides, setGuides] = useState<OfflineGuide[]>([]);
const [downloadQueue, setDownloadQueue] = useState<string[]>([]);
const [storageUsed, setStorageUsed] = useState(0);
const [isOnline, setIsOnline] = useState(navigator.onLine);
```

**Data Types**:
```tsx
interface OfflineGuide {
  id: string;
  title: string;
  description: string;
  size: number;
  downloadProgress: number;
  status: 'pending' | 'downloading' | 'downloaded' | 'error';
  lastUpdated: string;
  location: string;
  includes: string[];
}
```

**Usage**:
```tsx
<OfflineGuideBuilder />
```

---

### AuthModal.tsx
**Purpose**: Authentication modal with login, registration, and profile management.

**Key Features**:
- Multi-step registration process
- Role-based registration (Traveler, Guide, Business)
- Form validation
- Password strength checking

**Props**:
```tsx
interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
  initialMode?: 'login' | 'register';
}
```

**State**:
```tsx
const [mode, setMode] = useState<'login' | 'register'>('login');
const [userType, setUserType] = useState<UserType>('Traveler');
const [formData, setFormData] = useState<FormData>({});
const [errors, setErrors] = useState<FormErrors>({});
```

**Usage**:
```tsx
<AuthModal
  isOpen={showAuthModal}
  onClose={() => setShowAuthModal(false)}
  onLogin={handleLogin}
  initialMode="login"
/>
```

## 🎨 UI Components

### Button Component
**Location**: `components/ui/button.tsx`

**Variants**:
- `default`: Standard button style
- `destructive`: For dangerous actions
- `outline`: Outlined button
- `secondary`: Secondary styling
- `ghost`: Minimal styling
- `link`: Link-styled button

**Sizes**:
- `default`: Standard size
- `sm`: Small button
- `lg`: Large button
- `icon`: Icon-only button

**Usage**:
```tsx
<Button variant="default" size="lg" onClick={handleClick}>
  Click me
</Button>
```

### Card Component
**Location**: `components/ui/card.tsx`

**Sub-components**:
- `Card`: Main container
- `CardHeader`: Header section
- `CardTitle`: Title component
- `CardContent`: Content area

**Usage**:
```tsx
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
</Card>
```

### Input Component
**Location**: `components/ui/input.tsx`

**Props**:
```tsx
interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
}
```

**Usage**:
```tsx
<Input
  type="text"
  placeholder="Enter your name"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>
```

## 🎯 State Management

### Global State
The application uses React's built-in state management with hooks:

- **Authentication State**: Managed in `App.tsx`
- **Navigation State**: Managed in `App.tsx`
- **Component State**: Local state in individual components

### State Flow
```
App.tsx (Global State)
├── User Authentication
├── Active Tab
├── Search Query
└── Scroll Position
    ↓
Individual Components (Local State)
├── Component-specific data
├── Form states
└── UI interactions
```

## 🔧 Utility Functions

### Common Utilities
**Location**: `components/ui/utils.ts`

```tsx
// Combine CSS classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format date
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US').format(date);
}

// Debounce function
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
```

## 🎨 Styling Guidelines

### Color System
The application uses a neutral color palette defined in `styles/globals.css`:

```css
:root {
  --gray-50: #f9fafb;
  --gray-100: #f3f4f6;
  --gray-200: #e5e7eb;
  --gray-300: #d1d5db;
  --gray-800: #374151;
  --gray-900: #111827;
  --blue-600: #2563eb;
  --emerald-600: #059669;
}
```

### Responsive Design
Components use Tailwind CSS breakpoints:

- `sm`: 640px and up
- `md`: 768px and up
- `lg`: 1024px and up
- `xl`: 1280px and up

### Accessibility
All components follow WCAG guidelines:

- Proper ARIA labels
- Keyboard navigation support
- High contrast ratios
- Screen reader compatibility

## 🚀 Performance Considerations

### Optimization Strategies
1. **Lazy Loading**: Components load only when needed
2. **Memoization**: Use `React.memo` for expensive components
3. **Debouncing**: Search inputs use debounced updates
4. **Image Optimization**: Responsive images with lazy loading

### Bundle Size
Current optimizations:
- Tree shaking for unused imports
- Code splitting for routes
- Optimized icon imports from Lucide React

## 🧪 Testing Components

### Component Testing
```tsx
// Example test for Button component
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './button';

test('button renders with correct text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});

test('button calls onClick when clicked', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click me</Button>);
  fireEvent.click(screen.getByText('Click me'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### Accessibility Testing
```tsx
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('component has no accessibility violations', async () => {
  const { container } = render(<Component />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## 📱 Mobile Considerations

### Touch Interactions
- Minimum touch target size: 44px × 44px
- Adequate spacing between interactive elements
- Swipe gestures for galleries and carousels

### Performance
- Optimized images for mobile bandwidth
- Lazy loading for off-screen content
- Minimal JavaScript bundles

### Responsive Behavior
```tsx
// Example responsive component
<div className="
  grid grid-cols-1 gap-4
  sm:grid-cols-2 sm:gap-6
  lg:grid-cols-3 lg:gap-8
">
  {items.map(item => (
    <Card key={item.id} />
  ))}
</div>
```

This documentation provides a comprehensive overview of the component architecture and implementation details for the Wanderly Nepal application.
