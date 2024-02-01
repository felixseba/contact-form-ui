import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ViewContacts from './components/ViewContacts';
import AddContact from './components/AddContact';
import AlertPopup from './components/pages/AlertPopup';
import UpdateContact from './components/UpdateContact';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <AlertPopup />
      <Routes>
        <Route path="/" element={<ViewContacts />}/>
        <Route path="/add" element={<AddContact />}/>
        <Route path="/update/:id" element={<UpdateContact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
