import React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";
import SchoolIcon from "@mui/icons-material/School";

interface User {
  id: number;
  nome: string;
  email: string;
  admin: boolean;
}

export default function ButtonAppBar() {
  const navigate = useNavigate();

  const [user, setUser] = React.useState<User | null>(null);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
      }
    }
  }, []);

  const handleLogout = () => {
    handleMenuClose();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const getInitials = (nome: string) => {
    const names = nome.split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return nome.substring(0, 2).toUpperCase();
  };

  const getAvatarColor = (admin: boolean) => {
    return admin ? "#667eea" : "#4CAF50";
  };

  const getUserType = (admin: boolean) => {
    return admin ? "Professor" : "Aluno";
  };

  return (
    <Box sx={{ flexGrow: 1, width: "100%" }}>
      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{ 
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          top: 0,
          right: 0,
          left: 0
        }}
      >
        <Toolbar sx={{ 
          justifyContent: "space-between",
          minHeight: { xs: 64, sm: 70 },
          px: 2,
          width: "100%"
        }}>
          <Stack 
            direction="row" 
            spacing={{ xs: 1, sm: 1.5 }}
            alignItems="center"
            sx={{ cursor: "pointer" }}
            onClick={() => {
              if (user) {
                navigate(user.admin ? "/admin" : "/aluno");
              } else {
                navigate("/");
              }
            }}
          >
            <Box
              sx={{
                background: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(10px)",
                borderRadius: 2,
                p: { xs: 0.6, sm: 0.8 },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              <SchoolIcon sx={{ fontSize: { xs: 28, sm: 32 }, color: "#fff" }} />
            </Box>
            <Box>
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: 700, 
                  color: "#fff",
                  letterSpacing: "-0.5px",
                  lineHeight: 1,
                  fontSize: { xs: "1.1rem", sm: "1.5rem" }
                }}
              >
                SchoolOn
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: "rgba(255, 255, 255, 0.8)",
                  fontSize: { xs: "0.6rem", sm: "0.7rem" },
                  letterSpacing: "0.5px",
                  display: { xs: "none", sm: "block" }
                }}
              >
                EDUCATION PLATFORM
              </Typography>
            </Box>
          </Stack>

          {user ? (
            <Box>
              <Stack 
                direction="row" 
                spacing={{ xs: 1, sm: 1.5 }}
                alignItems="center"
                onClick={handleMenuOpen}
                sx={{ 
                  cursor: "pointer",
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                  borderRadius: 3,
                  px: { xs: 1, sm: 1.5 },
                  py: { xs: 0.6, sm: 0.8 },
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: "rgba(255, 255, 255, 0.15)",
                    transform: "translateY(-1px)",
                  },
                  mr: 7
                }}
              >
                <Box sx={{ display: { xs: "none", md: "block" }, textAlign: "right" }}>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontWeight: 600, 
                      color: "#fff",
                      lineHeight: 1.2,
                      fontSize: "0.875rem"
                    }}
                  >
                    {user.nome}
                  </Typography>
                  <Chip 
                    label={getUserType(user.admin)}
                    size="small"
                    sx={{ 
                      height: 18,
                      fontSize: "0.65rem",
                      fontWeight: 600,
                      mt: 0.3,
                      background: "rgba(255, 255, 255, 0.25)",
                      color: "#fff",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                    }}
                  />
                </Box>
                <Avatar 
                  sx={{ 
                    width: { xs: 36, sm: 42 }, 
                    height: { xs: 36, sm: 42 },
                    border: "2px solid rgba(255, 255, 255, 0.4)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    background: getAvatarColor(user.admin),
                    fontWeight: 600,
                    fontSize: { xs: "0.85rem", sm: "0.95rem" }
                  }}
                >
                  {getInitials(user.nome)}
                </Avatar>
              </Stack>

              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                PaperProps={{ 
                  elevation: 8,
                  sx: { 
                    mt: 1.5, 
                    minWidth: { xs: 200, sm: 240 }, 
                    borderRadius: 2,
                    overflow: "hidden",
                    background: "#fff",
                  } 
                }}
              >
                <Box sx={{ px: 2, py: 1.5, background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Avatar 
                      sx={{ 
                        width: 40, 
                        height: 40,
                        background: getAvatarColor(user.admin),
                        fontWeight: 600
                      }}
                    >
                      {getInitials(user.nome)}
                    </Avatar>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontWeight: 600, 
                          color: "#fff",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap"
                        }}
                      >
                        {user.nome}
                      </Typography>
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: "rgba(255,255,255,0.9)",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          display: "block"
                        }}
                      >
                        {user.email}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
                
                <Divider />
                
                {/* <MenuItem 
                  onClick={handleMenuClose}
                  sx={{ 
                    py: 1.2,
                    "&:hover": { background: "rgba(102, 126, 234, 0.08)" }
                  }}
                >
                  <ListItemIcon>
                    <PersonIcon fontSize="small" sx={{ color: "#667eea" }} />
                  </ListItemIcon>
                  <ListItemText>Meu Perfil</ListItemText>
                </MenuItem>

                <MenuItem 
                  onClick={handleMenuClose}
                  sx={{ 
                    py: 1.2,
                    "&:hover": { background: "rgba(102, 126, 234, 0.08)" }
                  }}
                >
                  <ListItemIcon>
                    <SettingsIcon fontSize="small" sx={{ color: "#667eea" }} />
                  </ListItemIcon>
                  <ListItemText>Configurações</ListItemText>
                </MenuItem> */}
                
                <Divider />
                
                <MenuItem 
                  onClick={handleLogout}
                  sx={{ 
                    py: 1.2,
                    color: "#d32f2f",
                    "&:hover": { background: "rgba(211, 47, 47, 0.08)" }
                  }}
                >
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" sx={{ color: "#d32f2f" }} />
                  </ListItemIcon>
                  <ListItemText>Sair</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box
              onClick={() => navigate("/login")}
              sx={{
                cursor: "pointer",
                background: "rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                borderRadius: 2,
                px: { xs: 2, sm: 3 },
                py: { xs: 0.8, sm: 1 },
                transition: "all 0.3s ease",
                "&:hover": {
                  background: "rgba(255, 255, 255, 0.3)",
                  transform: "translateY(-1px)",
                }
              }}
            >
              <Typography sx={{ color: "#fff", fontWeight: 600, fontSize: { xs: "0.875rem", sm: "0.95rem" } }}>
                Entrar
              </Typography>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
