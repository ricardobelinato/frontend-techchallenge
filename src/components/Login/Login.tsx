import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Paper,
  Alert,
  Box,
  IconButton,
  InputAdornment,
  Typography,
  Stack,
  Container,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import SchoolIcon from "@mui/icons-material/School";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:3000/auth/login", {
        email,
        senha,
      });

      setLoading(false);

      const usuario = res.data;

      if (usuario.admin) {
        navigate("/admin");
      } else {
        navigate("/aluno");
      }

      localStorage.setItem("token", usuario.token);
      localStorage.setItem("user", JSON.stringify({
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        admin: usuario.admin
      }));

    } catch (err: any) {
      setLoading(false);

      if (err.response && err.response.status === 401) {
        setError("Email ou senha incorretos.");
      } else {
        setError("Erro ao conectar com o servidor.");
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Lado esquerdo - Branding */}
      <Box
        sx={{
          flex: 1,
          position: "fixed",
          top: 0,
          left: 0,
          width: "50vw",
          height: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 6,
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 
              "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), " +
              "radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)",
            pointerEvents: "none",
          }
        }}
      >
        <Box sx={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <Box
            sx={{
              background: "rgba(255, 255, 255, 0.15)",
              backdropFilter: "blur(10px)",
              borderRadius: 4,
              p: 3,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              mb: 3,
            }}
          >
            <SchoolIcon sx={{ fontSize: 80, color: "#fff" }} />
          </Box>
          
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              color: "#fff",
              mb: 2,
              letterSpacing: "-1px"
            }}
          >
            SchoolOn
          </Typography>
          
          <Typography
            variant="h6"
            sx={{
              color: "rgba(255,255,255,0.9)",
              fontWeight: 400,
              maxWidth: 400,
              lineHeight: 1.6,
            }}
          >
            Plataforma educacional para professores e alunos construírem conhecimento juntos
          </Typography>

          <Stack 
            direction="row" 
            spacing={4} 
            sx={{ 
              mt: 6,
              justifyContent: "center"
            }}
          >
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h3" sx={{ fontWeight: 700, color: "#fff" }}>
                500+
              </Typography>
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)", mt: 0.5 }}>
                Professores
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h3" sx={{ fontWeight: 700, color: "#fff" }}>
                10k+
              </Typography>
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)", mt: 0.5 }}>
                Alunos
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h3" sx={{ fontWeight: 700, color: "#fff" }}>
                95%
              </Typography>
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)", mt: 0.5 }}>
                Satisfação
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Box>

      {/* Lado direito - Formulário */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f8f9fa",
          p: 3,
          ml: { md: "50vw" },
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, sm: 5 },
              borderRadius: 3,
              border: "1px solid #e0e0e0",
              background: "#fff",
            }}
          >
            {/* Logo mobile */}
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                justifyContent: "center",
                mb: 3,
              }}
            >
              <Box
                sx={{
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  borderRadius: 2,
                  p: 2,
                  display: "inline-flex",
                }}
              >
                <SchoolIcon sx={{ fontSize: 40, color: "#fff" }} />
              </Box>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: "#2c3e50",
                  mb: 1,
                  textAlign: { xs: "center", md: "left" }
                }}
              >
                Bem-vindo de volta!
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#5a6c7d",
                  textAlign: { xs: "center", md: "left" }
                }}
              >
                Faça login para acessar sua conta
              </Typography>
            </Box>

            {error && (
              <Alert 
                severity="error" 
                sx={{ 
                  mb: 3,
                  borderRadius: 2,
                  border: "1px solid #f8d7da"
                }}
              >
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={2.5}>
                <TextField
                  required
                  fullWidth
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      "&:hover fieldset": {
                        borderColor: "#667eea",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#667eea",
                      },
                    },
                  }}
                />
                
                <TextField
                  required
                  fullWidth
                  label="Senha"
                  type={showPassword ? "text" : "password"}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      "&:hover fieldset": {
                        borderColor: "#667eea",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#667eea",
                      },
                    },
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  sx={{
                    py: 1.5,
                    mt: 2,
                    fontWeight: 600,
                    fontSize: "1rem",
                    borderRadius: 2,
                    textTransform: "none",
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
                    "&:hover": {
                      background: "linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 6px 16px rgba(102, 126, 234, 0.4)",
                    },
                    "&:disabled": {
                      background: "#ccc",
                    },
                    transition: "all 0.3s ease"
                  }}
                >
                  {loading ? "Entrando..." : "Entrar"}
                </Button>
              </Stack>
            </Box>

            {/* <Box sx={{ mt: 3, textAlign: "center" }}>
              <Typography variant="body2" sx={{ color: "#5a6c7d" }}>
                Esqueceu sua senha?{" "}
                <Box
                  component="span"
                  sx={{
                    color: "#667eea",
                    fontWeight: 600,
                    cursor: "pointer",
                    "&:hover": { textDecoration: "underline" }
                  }}
                >
                  Recuperar acesso
                </Box>
              </Typography>
            </Box> */}
          </Paper>

          <Typography
            variant="caption"
            sx={{
              display: "block",
              textAlign: "center",
              color: "#5a6c7d",
              mt: 3,
            }}
          >
            © 2025 SchoolOn. Todos os direitos reservados.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}