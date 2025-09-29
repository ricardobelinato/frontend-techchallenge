import * as React from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Tooltip, Button, Stack, Dialog, DialogTitle,
  DialogContent, DialogActions, TextField, Typography, Avatar
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";

// Interfaces
interface Usuario {
  nome: string;
}

interface Post {
  id: number;
  titulo: string;
  conteudo: string;
  Usuario: Usuario;
  data_criacao: string;
  imagem?: string;
}

// Estilização
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": { backgroundColor: theme.palette.action.hover },
  "&:hover": { backgroundColor: theme.palette.action.selected, transition: "0.3s" },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
  color: theme.palette.text.primary,
}));

export default function CustomTable() {
  const [posts, setPosts] = React.useState<Post[]>([
    {
      id: 1,
      titulo: "Introdução à Programação",
      conteudo: "Aprenda os conceitos básicos de lógica de programação usando Python e JavaScript.",
      Usuario: { nome: "Professor Carlos" },
      data_criacao: "2025-09-01T12:00:00Z",
      imagem: "https://picsum.photos/50/50?random=101",
    },
    {
      id: 2,
      titulo: "Estruturas de Dados",
      conteudo: "Exploramos arrays, listas, filas e pilhas, fundamentais para qualquer desenvolvedor.",
      Usuario: { nome: "Professora Ana" },
      data_criacao: "2025-09-03T14:30:00Z",
      imagem: "https://picsum.photos/50/50?random=102",
    },
    {
      id: 3,
      titulo: "Algoritmos de Busca",
      conteudo: "Aprenda sobre busca linear, busca binária e como escolher o algoritmo adequado.",
      Usuario: { nome: "Professor Roberto" },
      data_criacao: "2025-09-05T10:15:00Z",
      imagem: "https://picsum.photos/50/50?random=103",
    },
    {
      id: 4,
      titulo: "Programação Orientada a Objetos",
      conteudo: "Entenda os conceitos de classes, objetos, herança e encapsulamento em Java e C#.",
      Usuario: { nome: "Professora Maria" },
      data_criacao: "2025-09-07T09:45:00Z",
    },
    {
      id: 5,
      titulo: "Redes de Computadores",
      conteudo: "Conheça protocolos, topologias e camadas de rede essenciais para a comunicação entre computadores.",
      Usuario: { nome: "Professor Eduardo" },
      data_criacao: "2025-09-10T16:20:00Z",
      imagem: "https://picsum.photos/50/50?random=104",
    },
  ]);

  // Modais
  const [openView, setOpenView] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openCreate, setOpenCreate] = React.useState(false);
  const [selectedPost, setSelectedPost] = React.useState<Post | null>(null);
  const [formData, setFormData] = React.useState({ titulo: "", conteudo: "", imagem: "" });

  // Handlers
  const handleView = (post: Post) => {
    setSelectedPost(post);
    setOpenView(true);
  };

  const handleEdit = (post: Post) => {
    setSelectedPost(post);
    setFormData({ titulo: post.titulo, conteudo: post.conteudo, imagem: post.imagem || "" });
    setOpenEdit(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Deseja realmente excluir este post?")) {
      setPosts(posts.filter(p => p.id !== id));
    }
  };

  const handleNewPost = () => {
    setFormData({ titulo: "", conteudo: "", imagem: "" });
    setOpenCreate(true);
  };

  const handleSaveEdit = () => {
    if (selectedPost) {
      setPosts(posts.map(p => p.id === selectedPost.id ? { ...p, ...formData } : p));
      setOpenEdit(false);
    }
  };

  const handleSaveCreate = () => {
    const newPost: Post = {
      id: posts.length ? Math.max(...posts.map(p => p.id)) + 1 : 1,
      titulo: formData.titulo,
      conteudo: formData.conteudo,
      Usuario: { nome: "Professor Teste" },
      data_criacao: new Date().toISOString(),
      imagem: formData.imagem || undefined,
    };
    setPosts([newPost, ...posts]);
    setOpenCreate(false);
  };

  return (
    <Paper sx={{ borderRadius: 3, boxShadow: 3, p: 2 }}>
      {/* Botão nova postagem */}
      <Stack direction="row" justifyContent="flex-end" sx={{ mb: 2 }}>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleNewPost}>
          Nova Postagem
        </Button>
      </Stack>

      {/* Tabela */}
      <TableContainer sx={{ borderRadius: 2, overflowX: "auto" }}>
        <Table sx={{ minWidth: 700 }}>
          <TableHead sx={{ backgroundColor: "#1976d2" }}>
            <TableRow>
              <StyledTableCell sx={{ color: "#fff" }}>ID</StyledTableCell>
              <StyledTableCell sx={{ color: "#fff" }}>Imagem</StyledTableCell>
              <StyledTableCell sx={{ color: "#fff" }}>Título</StyledTableCell>
              <StyledTableCell sx={{ color: "#fff" }}>Conteúdo</StyledTableCell>
              <StyledTableCell sx={{ color: "#fff" }}>Autor</StyledTableCell>
              <StyledTableCell sx={{ color: "#fff" }}>Data</StyledTableCell>
              <StyledTableCell sx={{ color: "#fff" }} align="center">Ações</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {posts.map((post) => (
              <StyledTableRow key={post.id}>
                <TableCell>{post.id}</TableCell>
                <TableCell>
                  {post.imagem ? <Avatar src={post.imagem} variant="rounded" /> : "-"}
                </TableCell>
                <TableCell>{post.titulo}</TableCell>
                <TableCell>{post.conteudo}</TableCell>
                <TableCell>{post.Usuario.nome}</TableCell>
                <TableCell>{new Date(post.data_criacao).toLocaleDateString("pt-BR")}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Visualizar">
                    <IconButton color="primary" onClick={() => handleView(post)}>
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Editar">
                    <IconButton color="primary" onClick={() => handleEdit(post)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Excluir">
                    <IconButton color="error" onClick={() => handleDelete(post.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal Visualizar */}
<Dialog open={openView} onClose={() => setOpenView(false)} maxWidth="sm" fullWidth>
  <Paper sx={{ borderRadius: 3, overflow: "hidden" }}>
    {selectedPost?.imagem && (
      <img
        src={selectedPost.imagem}
        alt={selectedPost.titulo}
        style={{ width: "100%", maxHeight: 300, objectFit: "cover" }}
      />
    )}
    <DialogTitle sx={{ fontWeight: "bold" }}>{selectedPost?.titulo}</DialogTitle>
    <DialogContent dividers sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="subtitle2" color="text.secondary">
        {selectedPost?.Usuario.nome} • {selectedPost && new Date(selectedPost.data_criacao).toLocaleDateString("pt-BR")}
      </Typography>
      <Typography sx={{ whiteSpace: "pre-wrap" }}>{selectedPost?.conteudo}</Typography>
    </DialogContent>
    <DialogActions>
      <Button variant="contained" color="primary" onClick={() => setOpenView(false)}>Fechar</Button>
    </DialogActions>
  </Paper>
</Dialog>

{/* Modal Editar / Criar */}
<Dialog open={openEdit || openCreate} onClose={() => { setOpenEdit(false); setOpenCreate(false); }} maxWidth="sm" fullWidth>
  <Paper sx={{ borderRadius: 3 }}>
    <DialogTitle sx={{ fontWeight: "bold" }}>
      {openEdit ? "Editar Post" : "Nova Postagem"}
    </DialogTitle>
    <DialogContent dividers sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        label="Título"
        value={formData.titulo}
        onChange={e => setFormData({ ...formData, titulo: e.target.value })}
        fullWidth
      />
      <TextField
        label="Conteúdo"
        value={formData.conteudo}
        onChange={e => setFormData({ ...formData, conteudo: e.target.value })}
        multiline
        rows={4}
        fullWidth
      />
      <TextField
        label="URL da Imagem"
        value={formData.imagem}
        onChange={e => setFormData({ ...formData, imagem: e.target.value })}
        fullWidth
      />
      {formData.imagem && (
        <img
          src={formData.imagem}
          alt="Preview"
          style={{ width: "100%", maxHeight: 200, objectFit: "cover", borderRadius: 5, marginTop: 10 }}
        />
      )}
    </DialogContent>
    <DialogActions sx={{ justifyContent: "flex-end", padding: 2 }}>
      <Button onClick={() => { setOpenEdit(false); setOpenCreate(false); }}>Cancelar</Button>
      <Button
        variant="contained"
        color="primary"
        onClick={openEdit ? handleSaveEdit : handleSaveCreate}
      >
        {openEdit ? "Salvar" : "Criar"}
      </Button>
    </DialogActions>
  </Paper>
</Dialog>
    </Paper>
  );
}
