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
function App() {
  const [contacts, setContacts] = useState([]);

  // useEffect(() => {
  //   fetch("http://localhost:8081/mockBackend")
  //   .then(response => response.json())
  //   .then(data => setContacts(data))
  //   console.log(contacts)
  // }, [])

  const addContact = (newContact) => {
    setContacts([...contacts, { id: toString(contacts.length + 1), ...newContact }]);
  };

  //new code. Looking at ag-grid  docs
  // useEffect(() => {
  //   fetch("http://localhost:8081/mockBackend")
  //   .then(response  => response.json())
  //   .then(data => {
  //     setContacts(data);
  //     console.log(data);
  //     console.log(contacts)
  //   })
  //   // console.log(data)
  // }, []);
  useEffect(() => {
    fetch("http://localhost:8081/mockBackend")
    .then(response => response.json())
    .then((data) => setContacts(data))
    // console.log(contacts)
  }, []) //check THis part
  

  

  return (
    <Router>
      {/* <NavBar/> */}
      <Routes>
        <Route path="/" element={<ContactList contacts={contacts} />} />
        <Route path="/contact/:id" element={<ContactDetails contacts={contacts} />} />
        <Route path="/add-contact" element={<AddEditContact/>}/>
        <Route path="/interaction/:id" element={<InteractionDetails />} />
        <Route path="/add-interaction" element={<AddEditInteraction/>} />
      </Routes>
    </Router>
  );
}

export default App;
