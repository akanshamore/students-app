"use client";

import { useState, useCallback } from "react";
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
  Divider,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { LoadingButton } from "@mui/lab";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../authContext";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("admin@123.com");
  const [password, setPassword] = useState("admin@123");
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  console.log("user", user);

  if (user) {
    router.push("/");
  }

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
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
      onSubmit={handleSignIn}
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

      <Link variant="body2" color="inherit" sx={{ mb: 1.5 }}>
        Forgot password?
      </Link>

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

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        color="inherit"
        variant="contained"
        loading={loading}
      >
        Sign in
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
          <Typography variant="h5">Sign in</Typography>
          <Typography variant="body2" color="text.secondary">
            Don't have an account?
            <NextLink href="/register" passHref>
              <MuiLink
                component="span"
                variant="subtitle2"
                sx={{ ml: 0.5, cursor: "pointer" }}
              >
                Get started
              </MuiLink>
            </NextLink>
          </Typography>
        </Box>

        {renderForm}
      </Card>
    </Box>
  );
}
