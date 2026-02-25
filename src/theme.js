import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1a237e", 
    },
    secondary: {
      main: "#c62828", 
    },
    background: {
      default: "#f4f6f8",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial",
    h1: { fontSize: "2rem", fontWeight: 600 },
    h2: { fontSize: "1.6rem", fontWeight: 600 },
  },
});

export default theme;
