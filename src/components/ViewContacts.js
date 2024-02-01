import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import { fetchContacts, openDialogBox } from "../actions/contactsActions";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useContactContext } from "../context/contactContext";
import AlertDialogBox from "./pages/AlertDialogBox";
import { Link } from "react-router-dom";

const ViewContacts = () => {
  const { dispatch } = useContactContext();

  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts(dispatch)
      .then((data) => {
        setContacts(data);
      })
      .catch((error) => {});
  }, [dispatch]);

  return (
    <Container maxWidth="lg" sx={{ mt: 15 }}>
      <AlertDialogBox />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">First Name</TableCell>
              <TableCell align="center">Last Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Age</TableCell>
              <TableCell align="center">Place</TableCell>
              <TableCell align="center">Edit</TableCell>
              <TableCell align="center">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.map((contact) => (
              <TableRow
                key={contact.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{contact.firstname}</TableCell>
                <TableCell align="center">{contact.lastname}</TableCell>
                <TableCell align="center">{contact.email}</TableCell>
                <TableCell align="center">{contact.age}</TableCell>
                <TableCell align="center">{contact.place}</TableCell>
                <TableCell align="center">
                  <IconButton
                    aria-label="edit"
                    LinkComponent={Link}
                    to={"/update/" + contact.id}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    aria-label="delete"
                    onClick={() => {
                      openDialogBox(dispatch, contact.id);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ViewContacts;
