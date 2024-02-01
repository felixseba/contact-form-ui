import React, { useEffect, useState } from "react";
import { useContactContext } from "../context/contactContext";
import { useParams, useNavigate } from "react-router-dom";

import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import { getContactById, updateContact } from "../actions/contactsActions";
import { OPEN_ALERT_POPUP } from "../actions/actions";

const UpdateContact = () => {
  const navigate = useNavigate();
  const { dispatch } = useContactContext();
  const { id } = useParams();

  const [contact, setContact] = useState({});
  const [showEmailValidError, setShowEmailValidError] = useState(false);

  const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  useEffect(() => {
    getContactById(dispatch, id)
      .then((data) => {
        if (!data.status) {
          dispatch({
            type: OPEN_ALERT_POPUP,
            payload: {
              type: "error",
              message: data.message,
            },
          });
          navigate("/");
        } else {
          setContact(data.contact);
        }
      })
      .catch((error) => {
        setContact({});
        dispatch({
          type: OPEN_ALERT_POPUP,
          payload: {
            type: "error",
            message: error.message,
          },
        });
        navigate("/");
      });
  }, [dispatch, id, navigate]);

  const onChange = (event) => {
    if (event.target.name === "email") {
      if (event.target?.value && event.target.value.match(isValidEmail)) {
        setShowEmailValidError(false);
      } else {
        setShowEmailValidError(true);
      }
    }
    setContact({
      ...contact,
      [event.target.name]: event.target.value,
    });
  };
  const onSubmitHandler = () => {
   updateContact(dispatch, id, contact);
  };


  return (
    <React.Fragment>
      <Container maxWidth="lg" sx={{ mt: 15 }}>
        {Object.keys(contact).length > 0 ? (
          <Paper
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
            variant="outlined"
          >
            <Typography variant="h5" gutterBottom align="center">
              Update Contact
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={onChange}
                  required
                  id="firstname"
                  name="firstname"
                  label="First name"
                  fullWidth
                  autoComplete="given-name"
                  variant="standard"
                  helperText=""
                  defaultValue={contact.firstname}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={onChange}
                  required
                  id="lastname"
                  name="lastname"
                  label="Last name"
                  fullWidth
                  autoComplete="family-name"
                  variant="standard"
                  defaultValue={contact.lastname}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={onChange}
                  required
                  id="email"
                  name="email"
                  label="Email Id"
                  fullWidth
                  autoComplete="given-email"
                  variant="standard"
                  error={showEmailValidError}
                  helperText={showEmailValidError ? "Email is not valid" : ""}
                  defaultValue={contact.email}
                  InputProps={{
                    readOnly: true
                  }}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={onChange}
                  required
                  id="age"
                  name="age"
                  label="Age"
                  fullWidth
                  autoComplete="given-Age"
                  variant="standard"
                  defaultValue={contact.age}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={onChange}
                  required
                  id="place"
                  name="place"
                  label="Place"
                  fullWidth
                  autoComplete="Place"
                  variant="standard"
                  defaultValue={contact.place}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ mt: 3, mb: 2 }}
                  disabled={
                    contact.firstname?.length < 3 ||
                    contact.lastname?.length < 3 ||
                    showEmailValidError ||
                    contact.age.length < 1 ||
                    contact.place.length < 3
                  }
                  onClick={onSubmitHandler}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Paper>
        ) : (
          ""
        )}
      </Container>
    </React.Fragment>
  );
};

export default UpdateContact;
