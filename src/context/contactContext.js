import { createContext, useContext, useReducer } from "react";
import { contactReducer } from "../reducers/contactsReducer";

const initialState = {
  openAlertDialog: false,
  contactId: "",
  openAlertPopup: false,
  alertMessage: "",
  alertType: "",
};
const ContactContext = createContext({});

export const ContactProvider = ({ children }) => {
  const [state, dispatch] = useReducer(contactReducer, initialState);
  return (
    <ContactContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ContactContext.Provider>
  );
};

export const useContactContext = () => {
  return useContext(ContactContext);
};
