import { Box, Typography } from "@mui/material";
import Logo from "../../assets/logobg.png"; // ou logobg.png

export default function Banner() {
  return (
    <Box
      sx={{
        width: "100%",
        height: 200,
        background: "linear-gradient(90deg, #2e7d32 0%, #1565c0 100%)", // verde -> azul
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 3,
        color: "#fff",
        mb: 4,
      }}
    >
      <img
        src={Logo}
        alt="SchoolOn Logo"
        style={{ height: "120px", objectFit: "contain" }}
      />
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", textShadow: "1px 1px 4px rgba(0,0,0,0.3)" }}
      >
        Bem-vindo ao SchoolOn
      </Typography>
    </Box>
  );
}
