import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './hooks/useProtectedRoute';
import MainLayout from './layouts/MainLayout';
import AuthPage from './pages/auth/AuthPage';
import { ContactDetailsPage, ContactFormPage, ContactsPage } from './pages/contact';
import { InteractionDetailsPage, InteractionFormPage, InteractionsPage } from './pages/interaction';

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route
          path="/contacts"
          element={
            <ProtectedRoute>
              <ContactsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contact/:id"
          element={
            <ProtectedRoute>
              <ContactDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/interactions"
          element={
            <ProtectedRoute>
              <InteractionsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/interaction/:id"
          element={
            <ProtectedRoute>
              <InteractionDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contacts/add"
          element={
            <ProtectedRoute>
              <ContactFormPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/interactions/add"
          element={
            <ProtectedRoute>
              <InteractionFormPage />
            </ProtectedRoute>
          }
        />
        {/* Legacy routes for backward compatibility */}
        <Route
          path="/contactList"
          element={
            <ProtectedRoute>
              <ContactsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-contact"
          element={
            <ProtectedRoute>
              <ContactFormPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-interaction"
          element={
            <ProtectedRoute>
              <InteractionFormPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </MainLayout>
  );
}

export default App;
