import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
} from "@mui/material";

const EditStudent = ({ isOpen, onClose, student, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: student?.name || "",
    class: student?.class || "",
    section: student?.section || "",
    rollNo: student?.rollNo || "",
    ID: student?.ID || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const studentRef = doc(db, "students", student.id);
      await updateDoc(studentRef, formData);
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Error updating student: ", error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Student</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 2 }}>
          <TextField
            name="ID"
            label="Student ID"
            value={formData.ID}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="class"
            label="Class"
            value={formData.class}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="section"
            label="Section"
            value={formData.section}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="rollNo"
            label="Roll No"
            value={formData.rollNo}
            onChange={handleChange}
            fullWidth
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditStudent;
