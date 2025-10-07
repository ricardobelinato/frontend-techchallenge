import {
  Box,
  Typography,
  Avatar,
  Card,
  CardContent,
  Stack,
  Chip,
  Container,
  CircularProgress,
  Alert,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import ButtonAppBar from "../Navbar";
import Banner from "../Banner/Banner";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import { getApiUrl, getUploadUrl } from "../../config/api";

interface Post {
  id: number;
  titulo: string;
  conteudo: string;
  imagem: string | null;
  usuario_id: number;
  data_criacao: string;
  data_atualizacao: string;
  Usuario: {
    id: number;
    nome: string;
    email: string;
  };
}

export default function StudentPanel() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(getApiUrl("/posts"));
        setPosts(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Erro ao carregar posts:", err);
        setError("Não foi possível carregar os posts. Tente novamente mais tarde.");
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Hoje";
    if (diffDays === 1) return "Ontem";
    if (diffDays < 7) return `${diffDays} dias atrás`;

    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getInitials = (nome: string) => {
    const names = nome.split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return nome.substring(0, 2).toUpperCase();
  };

  const getAvatarColor = (id: number) => {
    const colors = [
      "#667eea",
      "#4CAF50",
      "#FF6B6B",
      "#FFA726",
      "#42A5F5",
      "#AB47BC",
      "#26C6DA",
      "#66BB6A",
    ];
    return colors[id % colors.length];
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.conteudo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <>
        <ButtonAppBar />
        <Banner />
        <Container
          maxWidth="md"
          sx={{ mt: 4, display: "flex", justifyContent: "center" }}
        >
          <CircularProgress />
        </Container>
      </>
    );
  }

  if (error) {
    return (
      <>
        <ButtonAppBar />
        <Banner />
        <Container maxWidth="md" sx={{ mt: 4 }}>
          <Alert severity="error">{error}</Alert>
        </Container>
      </>
    );
  }

  return (
    <>
      <ButtonAppBar />
      <Banner />

      <Container
        maxWidth="xl"
        sx={{ mt: 4, mb: 6, px: { xs: 2, sm: 3, md: 4 } }}
      >
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "#2c3e50",
              mb: 1,
              mt: { md: 5 },
              ml: { md: 18 },
            }}
          >
            Feed de Atividades
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "#5a6c7d", ml: { md: 18 }, mb: 3 }}
          >
            Acompanhe as últimas publicações e conteúdos dos seus professores
          </Typography>

          {/* Campo de busca */}
          <Box sx={{ ml: { md: 18 }, mr: { md: 18 }, mb: 4 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Buscar post por palavra-chave..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                backgroundColor: "#fff",
                borderRadius: 2,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#ccc",
                  },
                  "&:hover fieldset": {
                    borderColor: "#667eea",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#667eea",
                    boxShadow: "0 0 0 2px rgba(102,126,234,0.2)",
                  },
                },
              }}
            />
          </Box>
        </Box>

        {filteredPosts.length === 0 ? (
          <Card sx={{ p: 4, textAlign: "center", borderRadius: 3 }}>
            <Typography variant="h6" color="text.secondary">
              Nenhum post encontrado
            </Typography>
          </Card>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              },
              gap: 3,
              ml: { md: 18 },
              mr: { md: 18 },
            }}
          >
            {filteredPosts.map((post) => (
              <Card
                component={Link}
                to={`/aluno/posts/${post.id}`}
                key={post.id}
                sx={{
                  borderRadius: 3,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  transition: "all 0.3s ease",
                  border: "1px solid #e0e0e0",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  "&:hover": {
                    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                    transform: "translateY(-4px)",
                  },
                }}
              >
                <CardContent
                  sx={{
                    p: 2.5,
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={1.5}
                    alignItems="center"
                    sx={{ mb: 2 }}
                  >
                    <Avatar
                      sx={{
                        width: 40,
                        height: 40,
                        background: getAvatarColor(post.Usuario.id),
                        fontWeight: 600,
                        fontSize: "0.9rem",
                      }}
                    >
                      {getInitials(post.Usuario.nome)}
                    </Avatar>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Stack
                        direction="row"
                        spacing={0.5}
                        alignItems="center"
                        flexWrap="wrap"
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontWeight: 600,
                            color: "#2c3e50",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {post.Usuario.nome.split(" ")[0]}
                        </Typography>
                        <Chip
                          label="Prof"
                          size="small"
                          sx={{
                            height: 18,
                            fontSize: "0.65rem",
                            fontWeight: 600,
                            background:
                              "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            color: "#fff",
                          }}
                        />
                      </Stack>
                      <Stack
                        direction="row"
                        spacing={0.5}
                        alignItems="center"
                        sx={{ mt: 0.3 }}
                      >
                        <AccessTimeIcon sx={{ fontSize: 12, color: "#5a6c7d" }} />
                        <Typography
                          variant="caption"
                          sx={{ color: "#5a6c7d", fontSize: "0.7rem" }}
                        >
                          {formatDate(post.data_criacao)}
                        </Typography>
                      </Stack>
                    </Box>
                  </Stack>

                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: "#2c3e50",
                      mb: 1.5,
                      lineHeight: 1.3,
                      fontSize: "1.1rem",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {post.titulo}
                  </Typography>

                  {post.imagem && (
                    <Box
                      sx={{
                        width: "100%",
                        height: 180,
                        borderRadius: 2,
                        overflow: "hidden",
                        mb: 1.5,
                        background: "#f5f5f5",
                      }}
                    >
                      <img
                        src={getUploadUrl(post.imagem)}
                        alt={post.titulo}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        onError={(e) => {
                          e.currentTarget.src = `https://picsum.photos/600/300?random=${post.id}`;
                        }}
                      />
                    </Box>
                  )}

                  <Typography
                    variant="body2"
                    sx={{
                      color: "#5a6c7d",
                      lineHeight: 1.6,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      flex: 1,
                    }}
                  >
                    {post.conteudo}
                  </Typography>

                  <Box
                    sx={{
                      mt: 2,
                      pt: 1.5,
                      borderTop: "1px solid #e0e0e0",
                    }}
                  >
                    <Chip
                      icon={<PersonIcon sx={{ fontSize: 14 }} />}
                      label={post.Usuario.email}
                      size="small"
                      variant="outlined"
                      sx={{
                        borderColor: "#e0e0e0",
                        color: "#5a6c7d",
                        fontSize: "0.7rem",
                        height: 24,
                        maxWidth: "100%",
                        "& .MuiChip-label": {
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        },
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Container>
    </>
  );
}
