import React from "react";
import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";
import AddStudent from "./AddStudent";
import MoreVertIcon from "@mui/icons-material/MoreVert";

// Material UI imports
import {
  Box,
  Card,
  Table,
  Stack,
  Button,
  Popover,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  TableHead,
  AppBar,
  Toolbar,
  Grid,
  Avatar,
  CardContent,
} from "@mui/material";

// Icons
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { signOut } from "firebase/auth";
import EditStudent from "./EditStudent";

const StudentsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = "/login";
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };
  const handleMenuClick = (event, studentId) => {
    setAnchorEl(event.currentTarget);
    setSelectedId(studentId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedId(null);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const querySnapshot = await getDocs(collection(db, "students"));
    const studentList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setStudents(studentList);
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setIsEditModalOpen(true);
  };

  const handleUpdate = () => {
    fetchStudents();
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "students", id));
      setStudents(students.filter((student) => student.id !== id));
    } catch (error) {
      console.error("Error deleting student: ", error);
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#F9FAFB" }}>
      {/* Sidebar */}
      <Box
        component="nav"
        sx={{
          width: 280,
          flexShrink: 0,
          bgcolor: "white",
          borderRight: "1px solid rgba(145, 158, 171, 0.24)",
          height: "100vh",
          position: "fixed",
          boxShadow: "0 8px 16px 0 rgba(145, 158, 171, 0.16)",
        }}
      >
        <Stack spacing={3} sx={{ p: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
            <Avatar sx={{ bgcolor: "#00AB55" }}>S</Avatar>
            <Typography variant="h6" sx={{ color: "text.primary" }}>
              Student Portal
            </Typography>
          </Box>
          <Button
            variant="contained"
            fullWidth
            sx={{
              bgcolor: "#00AB55",
              "&:hover": { bgcolor: "#007B55" },
            }}
          >
            Students Page
          </Button>
          <Button
            variant="outlined"
            color="error"
            fullWidth
            onClick={handleLogout}
            startIcon={<LogoutIcon />}
          >
            Logout
          </Button>
        </Stack>
      </Box>

      {/* Header */}
      <AppBar
        position="fixed"
        sx={{
          ml: "280px",
          width: `calc(100% - 280px)`,
          boxShadow: "none",
          bgcolor: "white",
          borderBottom: "1px solid rgba(145, 158, 171, 0.24)",
        }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ color: "text.primary" }}>
            Dashboard
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton>
            <NotificationsIcon />
          </IconButton>
          <IconButton>
            <PersonIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: "280px",
          mt: "64px",
        }}
      >
        <Container maxWidth="xl">
          {/* Stats Cards */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="h4" sx={{ color: "#00AB55" }}>
                    {students.length}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "text.secondary" }}
                  >
                    Total Students
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            {/* Add more stat cards as needed */}
          </Grid>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={5}
          >
            <Typography variant="h4">Students</Typography>
            <Button
              variant="contained"
              onClick={() => setIsModalOpen(true)}
              sx={{
                textTransform: "none",
                bgcolor: "#00AB55",
                "&:hover": { bgcolor: "#007B55" },
              }}
            >
              Add New Student
            </Button>
          </Stack>

          <Card>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Class</TableCell>
                    <TableCell>Section</TableCell>
                    <TableCell>Roll No</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {students
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((student, index) => (
                      <TableRow key={student.id}>
                        <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{student.class}</TableCell>
                        <TableCell>{student.section}</TableCell>
                        <TableCell>{student.rollNo}</TableCell>
                        <TableCell>
                          <IconButton
                            onClick={(e) => handleMenuClick(e, student.id)}
                          >
                            <MoreVertIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Popover
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem
                onClick={() => {
                  handleEdit(students.find((s) => s.id === selectedId));
                  handleMenuClose();
                }}
              >
                <EditIcon sx={{ mr: 1 }} /> Edit
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleDelete(selectedId);
                  handleMenuClose();
                }}
              >
                <DeleteIcon sx={{ mr: 1 }} /> Delete
              </MenuItem>
            </Popover>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={students.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        </Container>
      </Box>

      <AddStudent
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleUpdate}
      />
      <EditStudent
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        student={selectedStudent}
        onUpdate={handleUpdate}
      />
    </Box>
  );
};

export default StudentsPage;
