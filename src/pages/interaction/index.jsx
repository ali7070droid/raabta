import InteractionDetails from './InteractionDetails';
import InteractionForm from './InteractionForm';
import InteractionsList from './InteractionsList';

// Page Components
export const InteractionsPage = ({ contact }) => {
  return <InteractionsList contact={contact} />;
};

export const InteractionFormPage = () => {
  return <InteractionForm />;
};

export const InteractionDetailsPage = () => {
  return <InteractionDetails />;
};

// Export components for direct use
export { InteractionsList, InteractionForm, InteractionDetails };
