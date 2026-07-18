import ContactDetails from './ContactDetails';
import ContactForm from './ContactForm';
import ContactList from './ContactList';

// Page Components
export const ContactsPage = () => {
  return <ContactList />;
};

export const ContactDetailsPage = () => {
  return <ContactDetails />;
};

export const ContactFormPage = () => {
  return <ContactForm />;
};

// Export components for direct use
export { ContactList, ContactDetails, ContactForm };
