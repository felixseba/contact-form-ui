import axios from "../api/axios";
import {
  CLOSE_ALERT_DIALOG_BOX,
  OPEN_ALERT_DIALOG_BOX,
  OPEN_ALERT_POPUP,
} from "./actions";

export const fetchContacts = async (dispatch) => {
  try {
    const response = await axios.get("/");
    return response.data.contacts;
  } catch (error) {
    dispatch({
      type: OPEN_ALERT_POPUP,
      payload: {
        type: "error",
        message: error.message,
      },
    });
  }
};

export const openDialogBox = async (dispatch, contactId) => {
  dispatch({
    type: OPEN_ALERT_DIALOG_BOX,
    payload: contactId,
  });
};

export const closeDialogBox = async (dispatch) => {
  dispatch({
    type: CLOSE_ALERT_DIALOG_BOX,
  });
};

export const deleteContact = async (dispatch, userId) => {
  try {
    await axios.delete("/" + userId);
    fetchContacts(dispatch);
    dispatch({
      type: CLOSE_ALERT_DIALOG_BOX,
    });
  } catch (error) {
    dispatch({
      type: OPEN_ALERT_POPUP,
      payload: {
        type: "error",
        message: error.message,
      },
    });
  }
};

export const addNewContact = async (dispatch, newContact) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    const response = await axios.post("/", newContact, headers);
    if (!response.data.status) {
      dispatch({
        type: OPEN_ALERT_POPUP,
        payload: {
          type: "error",
          message: response.data.message,
        },
      });
    } else {
      dispatch({
        type: OPEN_ALERT_POPUP,
        payload: {
          type: "success",
          message: response.data.message,
        },
      });
    }
  } catch (error) {
    dispatch({
      type: OPEN_ALERT_POPUP,
      payload: {
        type: "error",
        message: error.message,
      },
    });
  }
};

export const getContactById = async (dispatch, contactId) => {
  try {
    const response = await axios.get("/" + contactId);
    if (!response.data.status) {
      return {
        contact: {},
        status: false,
        message: response.data.message,
      };
    } else {
      return response.data.contact.length > 0
        ? {
            contact: response.data.contact[0],
            status: true,
            message: response.data.message,
          }
        : {};
    }
  } catch (error) {
    dispatch({
      type: OPEN_ALERT_POPUP,
      payload: {
        type: "error",
        message: error.message,
      },
    });
  }
};

export const updateContact = async (dispatch, contactId, contact) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await axios.put("/" + contactId, contact, headers);
    if (!response.data.status) {
      dispatch({
        type: OPEN_ALERT_POPUP,
        payload: {
          type: "error",
          message: response.data.message,
        },
      });
    } else {
      dispatch({
        type: OPEN_ALERT_POPUP,
        payload: {
          type: "success",
          message: response.data.message,
        },
      });
    }
  } catch (error) {
    dispatch({
      type: OPEN_ALERT_POPUP,
      payload: {
        type: "error",
        message: error.message,
      },
    });
  }
};
