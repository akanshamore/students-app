"use client";

import { useState } from "react";
import NextLink from "next/link";
import { Link as MuiLink } from "@mui/material";
import {
  Box,
  Card,
  TextField,
  IconButton,
  InputAdornment,
  Typography,
  Link,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { LoadingButton } from "@mui/lab";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "../authContext";

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("hello@gmail.com");
  const [password, setPassword] = useState("@demo1234");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const { user } = useAuth();

  if (user) {
    router.push("/");
  }

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    setPasswordError("");
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      toast.success("Registration successful!", { position: "top-center" });
      router.push("/");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderForm = (
    <Box
      component="form"
      onSubmit={handleSignUp}
      display="flex"
      flexDirection="column"
      alignItems="flex-end"
    >
      <TextField
        fullWidth
        name="email"
        label="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 3 }}
      />

      <TextField
        fullWidth
        name="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        InputLabelProps={{ shrink: true }}
        type={showPassword ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ mb: 3 }}
      />

      <TextField
        fullWidth
        name="confirmPassword"
        label="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        InputLabelProps={{ shrink: true }}
        type={showConfirmPassword ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                edge="end"
              >
                {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        error={!!passwordError}
        helperText={passwordError}
        sx={{ mb: 3 }}
      />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        color="inherit"
        variant="contained"
        loading={loading}
      >
        Sign up
      </LoadingButton>
    </Box>
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 3,
        backgroundColor: "#f4f4f4",
      }}
    >
      <Card
        sx={{
          p: 5,
          width: "100%",
          maxWidth: 420,
          borderRadius: 2,
        }}
      >
        <Box
          gap={1.5}
          display="flex"
          flexDirection="column"
          alignItems="center"
          sx={{ mb: 5 }}
        >
          <Typography variant="h5">Sign Up</Typography>
          <Typography variant="body2" color="text.secondary">
            Already have an account?
            <NextLink href="/login" passHref>
              <MuiLink
                component="span"
                variant="subtitle2"
                sx={{ ml: 0.5, cursor: "pointer" }}
              >
                Sign In
              </MuiLink>
            </NextLink>
          </Typography>
        </Box>

        {renderForm}
      </Card>
    </Box>
  );
}
