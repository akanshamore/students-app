import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

const StyledRoot = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  width: "100%",
  backgroundColor: theme.palette.background.default,
  position: "fixed",
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

function Header() {
  return (
    <StyledRoot>
      <Toolbar
        sx={{
          height: 96,
          display: "flex",
          justifyContent: "space-between",
          padding: "0 64px",
        }}
      >
        <Typography
          variant="h4"
          sx={{ color: "text.primary", fontWeight: 700 }}
        >
          Student Management Portal
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button variant="contained" color="primary" href="/dashboard">
            Dashboard
          </Button>
          <Button variant="outlined" color="primary" href="/students">
            Students
          </Button>
        </Box>
      </Toolbar>
    </StyledRoot>
  );
}

export default Header;
