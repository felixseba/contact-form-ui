import React from "react";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useState } from "react";
import { addNewContact } from "../actions/contactsActions";
import { useContactContext } from "../context/contactContext";

const AddContact = () => {
  const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const [newContact, setNewContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    place: "",
  });

  const [showEmailValidError, setShowEmailValidError] = useState(false);
  const { dispatch } = useContactContext();

  const onChange = (event) => {
    if (event.target.name === "email") {
      if (event.target?.value && event.target.value.match(isValidEmail)) {
        setShowEmailValidError(false);
      } else {
        setShowEmailValidError(true);
      }
    }
    setNewContact({
      ...newContact,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmitHandler = () => {
    addNewContact(dispatch,newContact);
  };

  return (
    <React.Fragment>
      <Container maxWidth="lg" sx={{ mt: 15 }}>
        <Paper
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          variant="outlined"
        >
          <Typography variant="h5" gutterBottom align="center">
            New Contact
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={onChange}
                required
                id="firstName"
                name="firstName"
                label="First name"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                helperText=""
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={onChange}
                required
                id="lastName"
                name="lastName"
                label="Last name"
                fullWidth
                autoComplete="family-name"
                variant="standard"
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
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 3, mb: 2 }}
                disabled={
                  newContact.firstName.length < 3 ||
                  newContact.lastName.length < 3 ||
                  showEmailValidError ||
                  newContact.age.length < 1 ||
                  newContact.place.length < 3
                }
                onClick={onSubmitHandler}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </React.Fragment>
  );
};

export default AddContact;
