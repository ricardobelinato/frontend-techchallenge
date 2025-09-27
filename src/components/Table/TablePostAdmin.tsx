import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Button,
  Stack,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

// Interfaces
interface Usuario {
  id: number;
  nome: string;
  email: string;
}

interface Post {
  id: number;
  titulo: string;
  conteudo: string;
  data_criacao: string;
  Usuario: Usuario;
}

// Mock
const mockPosts: Post[] = [
  {
    id: 1,
    titulo: "Primeiro Post",
    conteudo:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus...",
    data_criacao: "2025-09-01T12:00:00Z",
    Usuario: { id: 1, nome: "Roberto Silva", email: "roberto@email.com" },
  },
  {
    id: 2,
    titulo: "Segundo Post",
    conteudo:
      "Outro conteúdo do post, com mais detalhes que aparecem no card...",
    data_criacao: "2025-09-05T14:30:00Z",
    Usuario: { id: 2, nome: "Maria Souza", email: "maria@email.com" },
  },
];

// Estilização da tabela
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:hover": {
    backgroundColor: theme.palette.action.selected,
    transition: "0.3s",
  },
}));

export default function CustomTable() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // <600px

  const handleView = (id: number) => console.log("Visualizar post:", id);
  const handleEdit = (id: number) => console.log("Editar post:", id);
  const handleDelete = (id: number) => console.log("Excluir post:", id);
  const handleNewPost = () => console.log("Nova postagem clicada");

  return (
    <Paper sx={{ borderRadius: 3, boxShadow: 3, p: 2 }}>
      {/* Botão Nova Postagem */}
      <Stack direction="row" justifyContent="flex-end" sx={{ mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleNewPost}
        >
          Nova Postagem
        </Button>
      </Stack>

      {/* Se for mobile => Cards, senão => Tabela */}
      {isMobile ? (
        <Stack spacing={2}>
          {mockPosts.map((post) => (
            <Card key={post.id} sx={{ borderRadius: 2, boxShadow: 2 }}>
              <CardContent>
                <Typography variant="h6">{post.titulo}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {post.conteudo}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Autor: {post.Usuario.nome} -{" "}
                  {new Date(post.data_criacao).toLocaleDateString("pt-BR")}
                </Typography>

                {/* Botões */}
                <Box mt={2} display="flex" gap={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => handleEdit(post.id)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    fullWidth
                    onClick={() => handleDelete(post.id)}
                  >
                    Excluir
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Stack>
      ) : (
        <TableContainer sx={{ borderRadius: 2, overflowX: "auto" }}>
          <Table sx={{ minWidth: 700 }} aria-label="Tabela de Posts">
            <TableHead sx={{ backgroundColor: "#1976d2" }}>
              <TableRow>
                <TableCell sx={{ color: "#fff" }}>ID</TableCell>
                <TableCell sx={{ color: "#fff" }}>Título</TableCell>
                <TableCell sx={{ color: "#fff" }}>Autor</TableCell>
                <TableCell sx={{ color: "#fff" }}>Email</TableCell>
                <TableCell sx={{ color: "#fff" }}>Data</TableCell>
                <TableCell sx={{ color: "#fff" }} align="center">
                  Ações
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockPosts.map((post) => (
                <StyledTableRow key={post.id}>
                  <TableCell>{post.id}</TableCell>
                  <TableCell>{post.titulo}</TableCell>
                  <TableCell>{post.Usuario.nome}</TableCell>
                  <TableCell>{post.Usuario.email}</TableCell>
                  <TableCell>
                    {new Date(post.data_criacao).toLocaleDateString("pt-BR")}
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Visualizar" arrow>
                      <IconButton
                        color="primary"
                        onClick={() => handleView(post.id)}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Editar" arrow>
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(post.id)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Excluir" arrow>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(post.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
}
