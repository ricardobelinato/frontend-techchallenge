import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";

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

// Dados mockados
const mockPosts: Post[] = [
  {
    id: 1,
    titulo: "Primeiro Post",
    conteudo: "Conteúdo do primeiro post...",
    data_criacao: "2025-09-01T12:00:00Z",
    Usuario: { id: 1, nome: "Roberto Silva", email: "roberto@email.com" },
  },
  {
    id: 2,
    titulo: "Segundo Post",
    conteudo: "Outro conteúdo do post",
    data_criacao: "2025-09-05T14:30:00Z",
    Usuario: { id: 2, nome: "Maria Souza", email: "maria@email.com" },
  },
];

// Estilização customizada
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:hover": {
    backgroundColor: theme.palette.action.selected,
    transition: "0.3s",
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
  color: theme.palette.text.primary,
}));

export default function CustomTable() {
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

      {/* Tabela */}
      <TableContainer sx={{ borderRadius: 2, overflowX: "auto" }}>
        <Table sx={{ minWidth: 700 }} aria-label="Tabela de Posts">
          <TableHead sx={{ backgroundColor: "#1976d2" }}>
            <TableRow>
              <StyledTableCell sx={{ color: "#fff" }}>ID</StyledTableCell>
              <StyledTableCell sx={{ color: "#fff" }}>Título</StyledTableCell>
              <StyledTableCell sx={{ color: "#fff" }}>Autor</StyledTableCell>
              <StyledTableCell sx={{ color: "#fff" }}>Email</StyledTableCell>
              <StyledTableCell sx={{ color: "#fff" }}>Data</StyledTableCell>
              <StyledTableCell sx={{ color: "#fff" }} align="center">
                Ações
              </StyledTableCell>
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
    </Paper>
  );
}
