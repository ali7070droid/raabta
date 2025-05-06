# Raabta - Contact Management System

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Environment Setup](#environment-setup)
   - [Running the Application](#running-the-application)
3. [Project Structure](#project-structure)
4. [Components](#components)
   - [UI Components](#ui-components)
   - [Layout Components](#layout-components)
   - [Navigation Components](#navigation-components)
5. [Contexts](#contexts)
6. [Hooks](#hooks)
7. [Services](#services)
8. [Utils](#utils)
9. [Building for Production](#building-for-production)
10. [Deployment](#deployment)
11. [Code Formatting](#code-formatting)
12. [Contributing](#contributing)

## Introduction

Raabta is a contact management system built with React that allows users to manage contacts and their interactions. It provides a user-friendly interface with dark mode support and responsive design.

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher) or yarn (v1.22.0 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ali7070droid/raabta.git
   cd raabta
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Environment Setup

Raabta uses environment variables to manage configuration for different environments. The project includes three environment files:

- `.env` - Default environment variables
- `.env.development` - Development-specific variables (used with `npm start`)
- `.env.production` - Production-specific variables (used with `npm run build`)

You can customize these files based on your environment needs. Here are the available environment variables:

```
# API URL
VITE_API_URL=http://your-api-url.com/api

# Environment name
VITE_ENV=development
```

### Running the Application

To start the development server:

```bash
npm start
# or
yarn start
```

This will run the app in development mode using the variables from `.env.development`. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── ui/             # Base UI components
│   └── navBar/         # Navigation components
├── contexts/           # React context providers
├── hooks/              # Custom React hooks
├── layouts/            # Layout components
├── pages/              # Page components
│   ├── auth/           # Authentication pages
│   ├── contact/        # Contact management pages
│   ├── interaction/    # Interaction management pages
│   └── reports/        # Report pages
├── services/           # API and utility services
├── utils/              # Utility functions
├── App.jsx             # Main application component
└── index.js            # Application entry point
```

## Components

### UI Components

The application includes several reusable UI components located in `src/components/ui/`. Here's how to use them:

#### Button

```jsx
import { Button } from '../../components/ui';

// Basic usage
<Button>Click me</Button>

// With variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="success">Success</Button>
<Button variant="danger">Danger</Button>
<Button variant="warning">Warning</Button>
<Button variant="info">Info</Button>
<Button variant="light">Light</Button>
<Button variant="dark">Dark</Button>

// With sizes
<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>

// Full width
<Button fullWidth>Full Width Button</Button>

// Disabled state
<Button disabled>Disabled</Button>

// Loading state
<Button loading>Loading...</Button>

// With icon
<Button icon={<SomeIcon />}>With Icon</Button>

// Icon position
<Button icon={<SomeIcon />} iconPosition="right">Right Icon</Button>

// With click handler
<Button onClick={() => console.log('Button clicked')}>Click me</Button>
```

#### Card

```jsx
import { Card } from '../../components/ui';

// Basic usage
<Card>
  <p>Card content</p>
</Card>

// With title
<Card title="Card Title">
  <p>Card content</p>
</Card>

// With custom classes
<Card 
  className="my-custom-card" 
  titleClassName="my-title-class"
  bodyClassName="my-body-class"
>
  <p>Card content</p>
</Card>

// With header action
<Card 
  title="Card with Action"
  headerAction={<Button size="sm">Action</Button>}
>
  <p>Card content</p>
</Card>
```

#### Input

```jsx
import { Input } from '../../components/ui';

// Basic usage
<Input
  label="Username"
  id="username"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
/>

// Required field
<Input
  label="Email"
  id="email"
  type="email"
  required
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

// With error message
<Input
  label="Password"
  id="password"
  type="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  error={errors.password}
/>

// With helper text
<Input
  label="Username"
  id="username"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
  helpText="Choose a username that is at least 3 characters long"
/>
```

#### Select

```jsx
import { Select } from '../../components/ui';

// Basic usage with array of options
<Select
  label="Priority"
  id="priority"
  name="priority"
  value={priority}
  onChange={handleChange}
  options={['High', 'Medium', 'Low']}
/>

// With objects as options
<Select
  label="Status"
  id="status"
  name="status"
  value={status}
  onChange={handleChange}
  options={[
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
  ]}
/>

// Required field
<Select
  label="Category"
  id="category"
  name="category"
  value={category}
  onChange={handleChange}
  options={categories}
  required
/>

// With error
<Select
  label="Priority"
  id="priority"
  name="priority"
  value={priority}
  onChange={handleChange}
  options={['High', 'Medium', 'Low']}
  error={errors.priority}
/>

// With placeholder
<Select
  label="Status"
  id="status"
  name="status"
  value={status}
  onChange={handleChange}
  options={statuses}
  placeholder="--select a status--"
/>
```

#### Textarea

```jsx
import { Textarea } from '../../components/ui';

// Basic usage
<Textarea
  label="Description"
  id="description"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
/>

// With rows
<Textarea
  label="Address"
  id="address"
  rows={4}
  value={address}
  onChange={(e) => setAddress(e.target.value)}
/>

// Required field
<Textarea
  label="Comments"
  id="comments"
  value={comments}
  onChange={(e) => setComments(e.target.value)}
  required
/>

// With error
<Textarea
  label="Description"
  id="description"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  error={errors.description}
/>
```

#### Table

```jsx
import { Table } from '../../components/ui';

// Define columns
const columns = [
  { field: 'id', headerName: 'ID' },
  { field: 'name', headerName: 'Name' },
  { field: 'email', headerName: 'Email' },
  { field: 'phone', headerName: 'Phone' },
  { 
    field: 'actions', 
    headerName: 'Actions',
    sortable: false,
    cellRenderer: (row) => (
      <div className="flex gap-2">
        <Button size="xs" variant="warning" onClick={() => handleEdit(row.id)}>Edit</Button>
        <Button size="xs" variant="danger" onClick={() => handleDelete(row.id)}>Delete</Button>
      </div>
    )
  }
];

// Basic usage
<Table
  columns={columns}
  data={contacts}
  loading={loading}
/>

// With pagination
<Table
  columns={columns}
  data={contacts}
  loading={loading}
  pagination
  pageSize={10}
/>

// With row click handler
<Table
  columns={columns}
  data={contacts}
  loading={loading}
  onRowClick={(row) => handleRowClick(row)}
/>

// With custom empty message
<Table
  columns={columns}
  data={contacts}
  loading={loading}
  emptyMessage="No contacts found. Add some contacts to see them here."
/>
```

#### Modal

```jsx
import { Modal, Button } from '../../components/ui';
import { useState } from 'react';

const MyComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Modal Title"
      >
        <p>Modal content goes here...</p>
        
        <div className="mt-4 flex justify-end space-x-2">
          <Button variant="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSubmit}>Submit</Button>
        </div>
      </Modal>
    </>
  );
};
```

#### Loader

```jsx
import { Loader } from '../../components/ui';

// Basic usage
<Loader />

// Different sizes
<Loader size="sm" />
<Loader size="md" />
<Loader size="lg" />
<Loader size="xl" />

// Different colors
<Loader color="blue" />
<Loader color="red" />
<Loader color="green" />
<Loader color="yellow" />
<Loader color="gray" />
<Loader color="white" />

// Full screen loader
<Loader fullScreen />
```

#### Typeahead

```jsx
import { Typeahead } from '../../components/ui';

// Basic usage
<Typeahead
  id="contact-search"
  options={contacts.map(c => c.name)}
  onChange={handleSelect}
  placeholder="Search contacts..."
/>

// With selected value
<Typeahead
  id="contact-search"
  options={contacts.map(c => c.name)}
  onChange={handleSelect}
  selected={[selectedContact]}
  placeholder="Search contacts..."
/>
```

#### DarkModeToggle

```jsx
import { DarkModeToggle } from '../../components/ui';

// Basic usage
<DarkModeToggle />
```

### Layout Components

The main layout component is located in `src/layouts/MainLayout.jsx`:

```jsx
import { MainLayout } from '../layouts';

const HomePage = () => {
  return (
    <MainLayout>
      <h1>Home Page Content</h1>
    </MainLayout>
  );
};
```

### Navigation Components

The Navbar component is located in `src/components/navBar/NavBar.jsx` and is automatically included in the `MainLayout`.

## Contexts

### UserContext

Located in `src/contexts/UserContext.js`, this context provides authentication state and user information:

```jsx
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

const MyComponent = () => {
  const { user, setUser, isLoggedIn, logout } = useContext(UserContext);
  
  return (
    <div>
      {isLoggedIn ? (
        <>
          <p>Welcome, {user}</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <p>Please log in</p>
      )}
    </div>
  );
};
```

## Hooks

### useAuth

Custom hook for authentication functions:

```jsx
import { useAuth } from '../hooks/useAuth';

const MyComponent = () => {
  const { login, register, logout, isAuthenticated } = useAuth();
  
  const handleLogin = async () => {
    try {
      await login(email, password);
      // Redirect after successful login
    } catch (error) {
      // Handle error
    }
  };
  
  return (
    // Component JSX
  );
};
```

## Services

### apiService

Located in `src/services/apiService.js`, this service handles API requests:

```jsx
import { apiService } from '../services';

// GET request
const fetchContacts = async () => {
  try {
    const contacts = await apiService.get('/api/Contacts');
    return contacts;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
};

// POST request
const createContact = async (contactData) => {
  try {
    const response = await apiService.post('/api/Contacts', contactData);
    return response;
  } catch (error) {
    console.error('Error creating contact:', error);
    throw error;
  }
};

// PUT request
const updateContact = async (id, contactData) => {
  try {
    const response = await apiService.put(`/api/Contacts/${id}`, contactData);
    return response;
  } catch (error) {
    console.error('Error updating contact:', error);
    throw error;
  }
};

// DELETE request
const deleteContact = async (id) => {
  try {
    await apiService.delete(`/api/Contacts/${id}`);
  } catch (error) {
    console.error('Error deleting contact:', error);
    throw error;
  }
};
```

### contactService

Located in `src/services/contactService.js`, this service handles contact-specific operations:

```jsx
import { contactService } from '../services';

// Get all contacts
const loadContacts = async () => {
  try {
    const contacts = await contactService.getAllContacts();
    setContacts(contacts);
  } catch (error) {
    // Handle error
  }
};

// Get contact by ID
const loadContactDetails = async (id) => {
  try {
    const contact = await contactService.getContactById(id);
    setContact(contact);
  } catch (error) {
    // Handle error
  }
};
```

### interactionService

Located in `src/services/interactionService.js`, this service handles interaction-specific operations:

```jsx
import { interactionService } from '../services';

// Get interactions for a contact
const loadInteractions = async (contactId) => {
  try {
    const interactions = await interactionService.getInteractionsByContactId(contactId);
    setInteractions(interactions);
  } catch (error) {
    // Handle error
  }
};
```

### notificationService

Located in `src/services/notificationService.js`, this service handles UI notifications:

```jsx
import { notificationService } from '../services';

// Success notification
notificationService.success('Success', 'Contact created successfully');

// Error notification
notificationService.error('Error', 'Failed to create contact');

// Info notification
notificationService.info('Info', 'Contact data loaded');

// Warning notification
notificationService.warning('Warning', 'Some fields may be incomplete');

// Toast notification (short message)
notificationService.toast('Contact updated successfully');

// Confirmation dialog
notificationService.confirm(
  'Delete Contact',
  'Are you sure you want to delete this contact?',
  'Yes, delete',
  'Cancel'
).then((result) => {
  if (result.isConfirmed) {
    // User confirmed - proceed with delete
    deleteContact(id);
  }
});
```

### validationService

Located in `src/services/validationService.js`, this service provides form validation:

```jsx
import { validationService } from '../services';

// Validate email
if (!validationService.isValidEmail(email)) {
  setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
  isValid = false;
}

// Validate phone
if (!validationService.isValidPhone(phone)) {
  setErrors(prev => ({ ...prev, phone: 'Please enter a valid phone number' }));
  isValid = false;
}

// Validate password strength
if (!validationService.isStrongPassword(password)) {
  setErrors(prev => ({ 
    ...prev, 
    password: 'Password must contain at least 8 characters, including uppercase, lowercase, and a number' 
  }));
  isValid = false;
}
```

## Utils

### authUtils

Located in `src/utils/authUtils.js`, this utility handles authentication-related functions:

```jsx
import { isTokenValid, getTokenExpiration } from '../utils/authUtils';

// Check if the user's token is valid
if (!isTokenValid()) {
  // Redirect to login page
  navigate('/');
}

// Get token expiration time
const expiresIn = getTokenExpiration();
```

## Building for Production

To build the application for production:

```bash
npm run build
# or
yarn build
```

This will create an optimized production build in the `dist` folder using the variables from `.env.production`. 

## Deployment

### Static Site Hosting (Netlify, Vercel, etc.)

1. Set up environment variables in your hosting provider:
   - For Netlify: Configure environment variables in the Netlify dashboard
   - For Vercel: Use the Vercel dashboard or `vercel.json` file

2. Create a production build:
   ```bash
   npm run build
   ```

3. Upload the contents of the `dist` folder to your hosting provider or use the provider's CLI/GitHub integration.

4. For Netlify/Vercel, you can connect your GitHub repository for automatic deployments.

### Environment Variables in CI/CD

If you're using CI/CD pipelines:

1. Set environment variables in your CI/CD platform (GitHub Actions, GitLab CI, etc.)

2. Create a script that generates the `.env.production` file during the build process:
   ```bash
   echo "VITE_API_URL=$API_URL" > .env.production
   echo "VITE_ENV=production" >> .env.production
   ```

3. Run the build command after creating the environment file.

## Running the Application

### Development Mode

To start the development server:

```bash
npm start
# or
yarn start
```

This will run the app in development mode using the variables from `.env.development`. The application will be available at [http://localhost:3000](http://localhost:3000).

### Production Mode Locally

To test the production build locally:

1. Create a production build:
   ```bash
   npm run build
   ```

2. Serve the dist directory:
   ```bash
   npx serve -s dist -l 3000
   ```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Code Formatting

This project uses Prettier with a custom configuration for consistent and automated code formatting — including automatic import sorting.

To format all JavaScript, JSX, and HTML files in the src directory, run:

```bash
npm run format
# or
yarn format
```

### Recommended VSCode Setup

For the best development experience with Prettier in VSCode:

1. Install the [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
2. Enable "Format On Save" in your settings:
   ```json
   "editor.formatOnSave": true,
   "editor.defaultFormatter": "esbenp.prettier-vscode"
   ```

This will automatically format your code whenever you save a file.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Open a pull request
