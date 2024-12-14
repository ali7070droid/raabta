import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ContactDetails from './components/contactDetails/ContactDetails';
import ContactList from './components/contactList/ContactList';
import NavBar from './components/navBar/NavBar';
import InteractionDetails from './components/InteractionDetails/interactionDetails';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddEditInteraction from './components/addEditInteraction/addEditInteraction';
import AddEditContact from './components/addEditContact/addEditContact';
import AuthPage from './components/AuthPage/AuthPage';
import ProtectedRoute from './components/AuthenticationUtils/ProtectedRoute';
function App() {

  return (
    <Router>
      {/* <NavBar/> */}
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/contactList" element={<ProtectedRoute><ContactList /></ProtectedRoute>} />
        <Route path="/contact/:id" element={<ProtectedRoute><ContactDetails /></ProtectedRoute>} />
        <Route path="/interaction/:id" element={<ProtectedRoute><InteractionDetails /></ProtectedRoute>} />
        <Route path="/add-contact" element={<AddEditContact/>}/>
        
        <Route path="/add-interaction" element={<AddEditInteraction/>} />
      </Routes>
    </Router>
  );
}

export default App;
