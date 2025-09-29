import React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Logo from "../assets/logobg.png";

// Tipo do usuário
interface User {
  nome: string;
  tipo: "Professor" | "Aluno";
  avatar: string;
}

export default function ButtonAppBar() {
  const navigate = useNavigate();

  // Estado do usuário logado
  const [user, setUser] = React.useState<User | null>({
    nome: "Carlos",
    tipo: "Professor",
    avatar: "https://picsum.photos/40/40?random=10",
  });

  // Controle do menu
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  // Logout
  const handleLogout = () => {
    handleMenuClose();
    setUser(null);
    navigate("/login");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#1565c0", boxShadow: 3 }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Logo e título */}
          <Stack direction="row" spacing={1} alignItems="center">
            <Avatar src={Logo} alt="Logo" variant="square" sx={{ width: 50, height: 50 }} />
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fff" }}>
              SchoolOn
            </Typography>
          </Stack>

          {/* Avatar do usuário */}
          {user ? (
            <Box>
              <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                <Avatar src={user.avatar} alt={user.nome} />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                PaperProps={{ elevation: 4, sx: { mt: 1, minWidth: 150, borderRadius: 2 } }}
              >
                <MenuItem onClick={handleLogout} sx={{ color: "red" }}>
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Typography
              onClick={() => navigate("/login")}
              sx={{ cursor: "pointer", color: "#fff", fontWeight: 600 }}
            >
              Login
            </Typography>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
