import { Box, Typography, Stack, Container } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import WavingHandIcon from "@mui/icons-material/WavingHand";
import SchoolIcon from "@mui/icons-material/School";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { getApiUrl } from "../../config/api";

interface User {
  id: number;
  nome: string;
  email: string;
  admin: boolean;
}

export default function Banner() {
  const [user, setUser] = useState<User | null>(null);
  const [greeting, setGreeting] = useState("Olá");
  const [disciplinasCount, setDisciplinasCount] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }

    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Bom dia");
    else if (hour < 18) setGreeting("Boa tarde");
    else setGreeting("Boa noite");
  }, []);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) setUser(JSON.parse(userData));

    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Bom dia");
    else if (hour < 18) setGreeting("Boa tarde");
    else setGreeting("Boa noite");
  }, []);

  useEffect(() => {
    const fetchDisciplinas = async () => {
      if (!user || user.admin) return;

      try {
        const response = await axios.get(getApiUrl("posts"));
        const materiasUnicas = new Set(response.data.map((p: any) => p.materia));
        setDisciplinasCount(materiasUnicas.size);
      } catch (err) {
        console.error("Erro ao buscar disciplinas:", err);
      }
    };

    fetchDisciplinas();
  }, [user]);

  useEffect(() => {
    const fetchTotalAlunos = async () => {
      if (!user) return;

      try {
        const response = await axios.get(getApiUrl("auth/stats"));
        const { totalUsuarios, totalAlunos, totalAdmins } = response.data

        setTotalStudents(totalAlunos);
      } catch (err) {
        console.error("Erro ao buscar alunos:", err);
      }
    };

    fetchTotalAlunos();
  }, [user]);

  const firstName = user?.nome.split(" ")[0] || "Usuário";
  const userType = user?.admin ? "Professor" : "Aluno";

  return (
    <Box
      sx={{
        mt: 9,
        width: "100%",
        background: "#f8f9fa",
        position: "relative",
        overflow: "hidden",
        py: { xs: 4, sm: 5, md: 6 },
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Stack spacing={2} alignItems="flex-start">
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box
              sx={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                borderRadius: 2,
                p: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 12px rgba(102, 126, 234, 0.2)",
              }}
            >
              <WavingHandIcon 
                sx={{ 
                  fontSize: { xs: 28, sm: 36 }, 
                  color: "#fff",
                  animation: "wave 2s ease-in-out infinite",
                  "@keyframes wave": {
                    "0%, 100%": { transform: "rotate(0deg)" },
                    "10%, 30%": { transform: "rotate(14deg)" },
                    "20%": { transform: "rotate(-8deg)" },
                    "40%": { transform: "rotate(-4deg)" },
                    "50%": { transform: "rotate(10deg)" },
                  }
                }} 
              />
            </Box>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: "#2c3e50",
                fontSize: { xs: "1.75rem", sm: "2.5rem", md: "3rem" },
              }}
            >
              {greeting}, {firstName}!
            </Typography>
          </Stack>

          <Typography
            variant="h6"
            sx={{
              color: "#5a6c7d",
              fontSize: { xs: "1rem", sm: "1.15rem", md: "1.25rem" },
              fontWeight: 400,
              maxWidth: "800px",
              lineHeight: 1.6,
            }}
          >
            {user?.admin 
              ? "Gerencie suas turmas, acompanhe o progresso dos alunos e crie conteúdos incríveis."
              : "Continue sua jornada de aprendizado. Acesse suas disciplinas e confira suas atividades."}
          </Typography>

          <Stack 
            direction={{ xs: "column", sm: "row" }} 
            spacing={2} 
            sx={{ mt: 2, width: "100%" }}
          >
            <Box
              sx={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                borderRadius: 2,
                p: 2.5,
                flex: 1,
                boxShadow: "0 4px 12px rgba(102, 126, 234, 0.15)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 20px rgba(102, 126, 234, 0.25)",
                }
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <Box
                  sx={{
                    background: "rgba(255,255,255,0.2)",
                    borderRadius: 2,
                    p: 1.5,
                    display: "flex",
                  }}
                >
                  <SchoolIcon sx={{ fontSize: 32, color: "#fff" }} />
                </Box>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: "#fff", lineHeight: 1 }}>
                    {user?.admin ? "8" : disciplinasCount}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.95)", mt: 0.5 }}>
                    {user?.admin ? "Turmas ativas" : "Disciplinas"}
                  </Typography>
                </Box>
              </Stack>
            </Box>

            <Box
              sx={{
                background: "linear-gradient(135deg, #4CAF50 0%, #2e7d32 100%)",
                borderRadius: 2,
                p: 2.5,
                flex: 1,
                boxShadow: "0 4px 12px rgba(76, 175, 80, 0.15)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 20px rgba(76, 175, 80, 0.25)",
                }
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <Box
                  sx={{
                    background: "rgba(255,255,255,0.2)",
                    borderRadius: 2,
                    p: 1.5,
                    display: "flex",
                  }}
                >
                  <TrendingUpIcon sx={{ fontSize: 32, color: "#fff" }} />
                </Box>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: "#fff", lineHeight: 1 }}>
                    {user?.admin ? totalStudents : "92%"}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.95)", mt: 0.5 }}>
                    {user?.admin ? "Alunos totais" : "Taxa de conclusão"}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Stack>

          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              borderRadius: 2,
              px: 2,
              py: 0.8,
              mt: 1,
              boxShadow: "0 2px 8px rgba(102, 126, 234, 0.2)",
            }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#4CAF50",
                boxShadow: "0 0 8px rgba(76,175,80,0.8)",
              }}
            />
            <Typography variant="body2" sx={{ color: "#fff", fontWeight: 600, fontSize: "0.875rem" }}>
              Conectado como {userType}
            </Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
