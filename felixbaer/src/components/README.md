# AI-Fertigungsstrecke Component Library

This component library implements the design system from the "AI-Fertigungsstrecke" Figma file, providing a complete set of reusable UI components with all their states and animations.

## Components Overview

### 🔘 Button
A fully interactive button component with three states from the Figma design.

```tsx
import { Button } from '@/components';

<Button onClick={() => console.log('clicked!')}>
  nach unten scrollen für mehr
</Button>

<Button variant="secondary">Secondary Button</Button>
<Button disabled>Disabled Button</Button>
```

**Props:**
- `children`: Button text/content
- `onClick`: Click handler
- `variant`: 'primary' | 'secondary' 
- `disabled`: Boolean
- `className`: Additional CSS classes

**States:** Default, Hover (with shadow), Click (with blur effect)

### 📝 TextField
An input field component with comprehensive state management.

```tsx
import { TextField } from '@/components';

const [value, setValue] = useState('');

<TextField
  label="Name"
  value={value}
  onChange={setValue}
  placeholder="Max Mustermann"
  error="This field is required"
  required
/>
```

**Props:**
- `label`: Field label
- `value`: Input value
- `onChange`: Value change handler
- `placeholder`: Placeholder text
- `error`: Error message
- `required`: Boolean
- `type`: Input type
- `disabled`: Boolean

**States:** Default, Hover, Active, Filled, Error (with validation)

### ☑️ Checkbox
A checkbox component with custom styling and hover effects.

```tsx
import { Checkbox } from '@/components';

const [checked, setChecked] = useState(false);

<Checkbox
  label="Ich habe die Datenschutzerklärung gelesen und stimme der Verarbeitung meiner Daten zu."
  checked={checked}
  onChange={setChecked}
/>
```

**Props:**
- `label`: Checkbox label
- `checked`: Checked state
- `onChange`: State change handler
- `disabled`: Boolean

**States:** Unchecked, Checked (with hover animations)

### 🧭 Navigation
A navigation component with decorative font and active states.

```tsx
import { Navigation, NavigationItem } from '@/components';

const items: NavigationItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
];

const [activeItem, setActiveItem] = useState('home');

<Navigation
  items={items}
  activeItemId={activeItem}
  onItemClick={setActiveItem}
/>
```

**Props:**
- `items`: Array of navigation items
- `activeItemId`: Currently active item ID
- `onItemClick`: Item click handler

**States:** Default, Active (with underline), Hover (with dot animation)

### 🍔 Menu
An animated hamburger menu component.

```tsx
import { Menu } from '@/components';

const [isOpen, setIsOpen] = useState(false);

<Menu
  isOpen={isOpen}
  onToggle={setIsOpen}
/>
```

**Props:**
- `isOpen`: Menu open state
- `onToggle`: Toggle handler

**States:** Closed (hamburger), Open (X), with smooth rotation animations

### ➡️ Arrow
A directional arrow component with hover states.

```tsx
import { Arrow } from '@/components';

<Arrow 
  direction="down" 
  onClick={() => console.log('Arrow clicked')}
/>
```

**Props:**
- `direction`: 'up' | 'down' | 'left' | 'right'
- `state`: 'default' | 'hover'
- `onClick`: Click handler
- `disabled`: Boolean

**States:** Default (blue-gray), Hover (coral red)

### 🖱️ Cursor
A cursor state indicator component.

```tsx
import { Cursor } from '@/components';

<Cursor state="hover" />
```

**Props:**
- `state`: 'default' | 'hover' | 'focus'

**States:** Default (transparent), Hover/Focus (gradient with blur)

## Design Tokens

The components use a comprehensive design token system:

### Colors
- **Primary:** #333333 (dark), #505C7F (medium), #FFFFFF (light)
- **Accent:** #E57373 (primary), #FFA9A9 (light), #FADCD9 (lightest)
- **Error:** #C30000

### Typography
- **Decorative:** Nanum Myeongjo (for navigation)
- **Primary:** Public Sans (for UI text)
- **Weights:** Light (300), Normal (400), Medium (500), Semibold (600)

### Spacing & Effects
- Consistent spacing scale (4px, 8px, 16px, 20px, 32px, 48px)
- Border radius system (4px, 5px, 100px)
- Smooth transitions and hover effects
- Box shadows and blur filters

## Usage

1. **Import components:**
```tsx
import { Button, TextField, Checkbox } from '@/components';
```

2. **Import design tokens:**
```tsx
import { colors, typography, spacing } from '@/styles/tokens';
```

3. **Use in your pages/components:**
All components are fully typed with TypeScript and include proper accessibility features.

## Features

- ✅ **Figma Design Compliant:** All components match the exact specifications
- ✅ **TypeScript Support:** Full type safety
- ✅ **Accessibility:** ARIA labels, keyboard navigation, focus management
- ✅ **Responsive:** Works on all screen sizes
- ✅ **Animations:** Smooth state transitions and hover effects
- ✅ **Customizable:** Props for styling and behavior modification
- ✅ **State Management:** Proper controlled/uncontrolled component patterns

## File Structure

```
src/
├── components/
│   ├── Button.tsx
│   ├── TextField.tsx
│   ├── Checkbox.tsx
│   ├── Navigation.tsx
│   ├── Menu.tsx
│   ├── Cursor.tsx
│   ├── Arrow.tsx
│   ├── index.ts
│   └── README.md
├── styles/
│   └── tokens/
│       ├── colors.ts
│       ├── typography.ts
│       ├── spacing.ts
│       └── index.ts
└── assets/
    └── images/
```

All components are production-ready and can be used immediately in any Next.js application.