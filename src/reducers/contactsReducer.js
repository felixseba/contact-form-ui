import {
  CLOSE_ALERT_DIALOG_BOX,
  CLOSE_ALERT_POPUP,
  OPEN_ALERT_DIALOG_BOX,
  OPEN_ALERT_POPUP,
} from "../actions/actions";

export const contactReducer = (state, action) => {
  switch (action.type) {
    case OPEN_ALERT_DIALOG_BOX:
      return {
        ...state,
        openAlertDialog: true,
        contactId: action.payload,
      };
    case CLOSE_ALERT_DIALOG_BOX:
      return {
        ...state,
        openAlertDialog: false,
        contactId: "",
      };
    case OPEN_ALERT_POPUP:
      return {
        ...state,
        openAlertPopup: true,
        alertType: action.payload.type,
        alertMessage: action.payload.message,
      };
    case CLOSE_ALERT_POPUP:
      return {
        ...state,
        openAlertPopup: false,
        alertType: "info",
        alertMessage: "",
      };

    default:
      return state;
  }
};
