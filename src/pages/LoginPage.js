import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email === "ad" && password === "ad") {
      window.location.href = "/dashboard";
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <Box sx={{ position: "relative", height: "100vh", overflow: "hidden" }}>
      
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1
        }}
      >
        <source src="/videos/bg.mp4" type="video/mp4" />
      </video>

      {/* Overlay Light Effect */}
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(circle at center, rgba(255,255,255,0.2), rgba(255,255,255,0.05))",
          backdropFilter: "blur(2px)"
        }}
      />

      {/* Glass Card */}
      <Box
        sx={{
          position: "relative",
          width: 400,
          p: 5,
          borderRadius: "28px",
          background: "rgba(255, 255, 255, 0.25)",
          backdropFilter: "blur(25px)",
          WebkitBackdropFilter: "blur(25px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          boxShadow: "0 25px 45px rgba(0, 0, 0, 0.2)",
          textAlign: "center",
          margin: "auto",
          top: "50%",
          transform: "translateY(-50%)"
        }}
      >
        {/* Icon Circle */}
        <Box
          sx={{
            width: 70,
            height: 70,
            borderRadius: "20px",
            background: "rgba(255,255,255,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 25px",
            fontSize: 26,
            boxShadow: "0 8px 20px rgba(0,0,0,0.1)"
          }}
        >
          ➜
        </Box>

        <Typography variant="h5" fontWeight="600" mb={1}>
          Sign in with email
        </Typography>

        <Typography
          variant="body2"
          sx={{ opacity: 0.7, mb: 4 }}
        >
          Make a new doc to bring your words, data,
          and teams together. For free
        </Typography>

        <TextField
          fullWidth
          placeholder="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            mb: 2,
            background: "rgba(255,255,255,0.5)",
            borderRadius: "12px"
          }}
        />

        <TextField
          fullWidth
          placeholder="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            mb: 3,
            background: "rgba(255,255,255,0.5)",
            borderRadius: "12px"
          }}
        />

        <Button
          fullWidth
          onClick={handleLogin}
          sx={{
            py: 1.6,
            borderRadius: "14px",
            background:
              "linear-gradient(180deg, #2d2d2d 0%, #000000 100%)",
            color: "white",
            fontWeight: 600,
            boxShadow: "0 6px 18px rgba(0,0,0,0.4)",
            "&:hover": {
              background:
                "linear-gradient(180deg, #000000 0%, #2d2d2d 100%)"
            }
          }}
        >
          Get Started
        </Button>
      </Box>
    </Box>
  );
}