// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Container,
//   Typography,
//   CircularProgress,
//   Alert,
//   Box,
//   Avatar,
//   Chip,
//   Stack,
// } from "@mui/material";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import PersonIcon from "@mui/icons-material/Person";
// import ButtonAppBar from "../Navbar";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// interface Post {
//   id: number;
//   titulo: string;
//   conteudo: string;
//   imagem: string | null;
//   usuario_id: number;
//   data_criacao: string;
//   Usuario: {
//     id: number;
//     nome: string;
//     email: string;
//   };
// }

// export default function PostDetail() {
//   const { id } = useParams<{ id: string }>();
//   const [post, setPost] = useState<Post | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         const response = await axios.get(`getApiUrl("/posts/${id}`);
//         setPost(response.data);
//       } catch (err) {
//         setError("Erro ao carregar o post.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPost();
//   }, [id]);

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     const now = new Date();
//     const diffTime = Math.abs(now.getTime() - date.getTime());
//     const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

//     if (diffDays === 0) return "Hoje";
//     if (diffDays === 1) return "Ontem";
//     if (diffDays < 7) return `${diffDays} dias atrás`;

//     return date.toLocaleDateString("pt-BR", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });
//   };

//   const getInitials = (nome: string) => {
//     const names = nome.split(" ");
//     if (names.length >= 2) {
//       return `${names[0][0]}${names[1][0]}`.toUpperCase();
//     }
//     return nome.substring(0, 2).toUpperCase();
//   };

//   const getAvatarColor = (id: number) => {
//     const colors = [
//       "#667eea",
//       "#4CAF50",
//       "#FF6B6B",
//       "#FFA726",
//       "#42A5F5",
//       "#AB47BC",
//       "#26C6DA",
//       "#66BB6A",
//     ];
//     return colors[id % colors.length];
//   };

//   if (loading) {
//     return (
//       <>
//         <ButtonAppBar />
//         <Container maxWidth="md" sx={{ mt: 18, display: "flex", justifyContent: "center" }}>
//           <CircularProgress />
//         </Container>
//       </>
//     );
//   }

//   if (error || !post) {
//     return (
//       <>
//         <ButtonAppBar />
//         <Container maxWidth="md" sx={{ mt: 18 }}>
//           <Alert severity="error">{error || "Post não encontrado"}</Alert>
//         </Container>
//       </>
//     );
//   }

//   return (
//     <>
//       <ButtonAppBar />

//       <Container maxWidth="md" sx={{ mt: 18, mb: 6 }}>
//         {/* Header */}
//         <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 3 }}>
//           <Avatar
//             sx={{
//               width: 50,
//               height: 50,
//               background: getAvatarColor(post.Usuario.id),
//               fontWeight: 600,
//               fontSize: "1rem",
//             }}
//           >
//             {getInitials(post.Usuario.nome)}
//           </Avatar>
//           <Box sx={{ flex: 1 }}>
//             <Stack direction="row" spacing={0.5} alignItems="center" flexWrap="wrap">
//               <Typography
//                 variant="subtitle1"
//                 sx={{
//                   fontWeight: 600,
//                   color: "#2c3e50",
//                 }}
//               >
//                 {post.Usuario.nome}
//               </Typography>
//               <Chip
//                 label="Prof"
//                 size="small"
//                 sx={{
//                   height: 20,
//                   fontSize: "0.7rem",
//                   fontWeight: 600,
//                   background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//                   color: "#fff",
//                 }}
//               />
//             </Stack>
//             <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mt: 0.3 }}>
//               <AccessTimeIcon sx={{ fontSize: 14, color: "#5a6c7d" }} />
//               <Typography variant="caption" sx={{ color: "#5a6c7d", fontSize: "0.75rem" }}>
//                 {formatDate(post.data_criacao)}
//               </Typography>
//             </Stack>
//           </Box>
//         </Stack>

//         {/* Título */}
//         <Typography
//           variant="h3"
//           sx={{
//             fontWeight: 700,
//             color: "#2c3e50",
//             mb: 3,
//             lineHeight: 1.2,
//           }}
//         >
//           {post.titulo}
//         </Typography>

//         {/* Imagem */}
//         {post.imagem && (
//           <Box
//             sx={{
//               width: "100%",
//               borderRadius: 3,
//               overflow: "hidden",
//               mb: 3,
//               background: "#f5f5f5",
//             }}
//           >
//             <img
//               src={`getApiUrl("/uploads/${post.imagem}`}
//               alt={post.titulo}
//               style={{
//                 width: "100%",
//                 maxHeight: 500,
//                 objectFit: "cover",
//               }}
//               onError={(e) => {
//                 e.currentTarget.src = `https://picsum.photos/800/400?random=${post.id}`;
//               }}
//             />
//           </Box>
//         )}

//         {/* Conteúdo */}
//         <Typography
//           variant="body1"
//           sx={{
//             color: "#5a6c7d",
//             lineHeight: 1.8,
//             mb: 4,
//             whiteSpace: "pre-line",
//             fontSize: "1.05rem",
//           }}
//         >
//           {post.conteudo}
//         </Typography>

//         {/* Rodapé */}
//         <Box sx={{ pt: 2, borderTop: "1px solid #e0e0e0" }}>
//           <Chip
//             icon={<PersonIcon sx={{ fontSize: 16 }} />}
//             label={post.Usuario.email}
//             size="small"
//             variant="outlined"
//             sx={{
//               borderColor: "#e0e0e0",
//               color: "#5a6c7d",
//               fontSize: "0.8rem",
//               height: 26,
//               "& .MuiChip-label": {
//                 overflow: "hidden",
//                 textOverflow: "ellipsis",
//                 whiteSpace: "nowrap",
//               },
//             }}
//           />
//         </Box>
//       </Container>
//     </>
//   );
// }

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Box,
  Avatar,
  Chip,
  Stack,
  IconButton,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import ButtonAppBar from "../Navbar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface Post {
  id: number;
  titulo: string;
  conteudo: string;
  imagem: string | null;
  usuario_id: number;
  data_criacao: string;
  Usuario: {
    id: number;
    nome: string;
    email: string;
  };
}

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`getApiUrl("/posts/${id}`);
        setPost(response.data);
      } catch (err) {
        setError("Erro ao carregar o post.");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

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

  if (loading) {
    return (
      <>
        <ButtonAppBar />
        <Container
          maxWidth="md"
          sx={{ mt: 18, display: "flex", justifyContent: "center" }}
        >
          <CircularProgress />
        </Container>
      </>
    );
  }

  if (error || !post) {
    return (
      <>
        <ButtonAppBar />
        <Container maxWidth="md" sx={{ mt: 18 }}>
          <Alert severity="error">{error || "Post não encontrado"}</Alert>
        </Container>
      </>
    );
  }

  return (
    <>
      <ButtonAppBar />

      <Container maxWidth="md" sx={{ mt: 18, mb: 6 }}>
        {/* Header */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 3 }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Avatar
              sx={{
                width: 50,
                height: 50,
                background: getAvatarColor(post.Usuario.id),
                fontWeight: 600,
                fontSize: "1rem",
              }}
            >
              {getInitials(post.Usuario.nome)}
            </Avatar>
            <Box>
              <Stack direction="row" spacing={0.5} alignItems="center" flexWrap="wrap">
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    color: "#2c3e50",
                  }}
                >
                  {post.Usuario.nome}
                </Typography>
                <Chip
                  label="Prof"
                  size="small"
                  sx={{
                    height: 20,
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "#fff",
                  }}
                />
              </Stack>
              <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mt: 0.3 }}>
                <AccessTimeIcon sx={{ fontSize: 14, color: "#5a6c7d" }} />
                <Typography variant="caption" sx={{ color: "#5a6c7d", fontSize: "0.75rem" }}>
                  {formatDate(post.data_criacao)}
                </Typography>
              </Stack>
            </Box>
          </Stack>

          {/* Botão voltar */}
          <IconButton
            onClick={() => navigate(-1)}
            sx={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              "&:hover": {
                background: "linear-gradient(135deg, #5a6c7d 0%, #2c3e50 100%)",
              },
              width: 42,
              height: 42,
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        </Stack>

        {/* Título */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            color: "#2c3e50",
            mb: 3,
            lineHeight: 1.2,
          }}
        >
          {post.titulo}
        </Typography>

        {/* Imagem */}
        {post.imagem && (
          <Box
            sx={{
              width: "100%",
              borderRadius: 3,
              overflow: "hidden",
              mb: 3,
              background: "#f5f5f5",
            }}
          >
            <img
              src={`getApiUrl("/uploads/${post.imagem}`}
              alt={post.titulo}
              style={{
                width: "100%",
                maxHeight: 500,
                objectFit: "cover",
              }}
              onError={(e) => {
                e.currentTarget.src = `https://picsum.photos/800/400?random=${post.id}`;
              }}
            />
          </Box>
        )}

        {/* Conteúdo */}
        <Typography
          variant="body1"
          sx={{
            color: "#5a6c7d",
            lineHeight: 1.8,
            mb: 4,
            whiteSpace: "pre-line",
            fontSize: "1.05rem",
          }}
        >
          {post.conteudo}
        </Typography>

        {/* Rodapé */}
        <Box sx={{ pt: 2, borderTop: "1px solid #e0e0e0" }}>
          <Chip
            icon={<PersonIcon sx={{ fontSize: 16 }} />}
            label={post.Usuario.email}
            size="small"
            variant="outlined"
            sx={{
              borderColor: "#e0e0e0",
              color: "#5a6c7d",
              fontSize: "0.8rem",
              height: 26,
              "& .MuiChip-label": {
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              },
            }}
          />
        </Box>
      </Container>
    </>
  );
}
