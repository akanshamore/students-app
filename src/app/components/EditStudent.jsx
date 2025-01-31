import React, { useState, useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Alert,
  CircularProgress,
} from "@mui/material";

const EditStudent = ({ isOpen, onClose, student, onUpdate }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    class: "",
    section: "",
    rollNo: "",
    ID: "",
  });

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || "",
        class: student.class || "",
        section: student.section || "",
        rollNo: student.rollNo || "",
        ID: student.id || "",
      });
    }
  }, [student]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validation
    if (!formData.name || !formData.class || !formData.rollNo) {
      setError("Name, Class and Roll No are required fields");
      setLoading(false);
      return;
    }

    try {
      const studentRef = doc(db, "students", student.id);
      await updateDoc(studentRef, formData);
      onUpdate();
      onClose();
    } catch (error) {
      setError(error.message);
      console.error("Error updating student: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Student</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 2 }}>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            name="ID"
            label="Student ID"
            value={formData.ID}
            onChange={handleChange}
            fullWidth
            disabled
          />
          <TextField
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
            error={!formData.name}
          />
          <TextField
            name="class"
            label="Class"
            value={formData.class}
            onChange={handleChange}
            fullWidth
            required
            error={!formData.class}
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
            required
            error={!formData.rollNo}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading}
          startIcon={loading && <CircularProgress size={20} />}
        >
          {loading ? "Updating..." : "Update"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditStudent;
