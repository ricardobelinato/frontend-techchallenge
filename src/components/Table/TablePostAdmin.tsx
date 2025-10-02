import * as React from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Tooltip, Button, Stack, Dialog, DialogTitle,
  DialogContent, DialogActions, TextField, Typography, Avatar, Box,
  Chip, CircularProgress, Alert
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import axios from "axios";

interface Usuario {
  id: number;
  nome: string;
  email: string;
}

interface Post {
  id: number;
  titulo: string;
  conteudo: string;
  imagem: string | null;
  usuario_id: number;
  data_criacao: string;
  data_atualizacao: string;
  Usuario: Usuario;
}

export default function PostsTable() {
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  const [openView, setOpenView] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openCreate, setOpenCreate] = React.useState(false);
  const [selectedPost, setSelectedPost] = React.useState<Post | null>(null);
  const [formData, setFormData] = React.useState({ titulo: "", conteudo: "", imagem: "" });
  const [submitLoading, setSubmitLoading] = React.useState(false);

  const fetchPosts = React.useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/posts");
      setPosts(response.data);
      setError("");
    } catch (err) {
      console.error("Erro ao carregar posts:", err);
      setError("Não foi possível carregar os posts.");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleView = (post: Post) => {
    setSelectedPost(post);
    setOpenView(true);
  };

  const handleEdit = (post: Post) => {
    setSelectedPost(post);
    setFormData({ 
      titulo: post.titulo, 
      conteudo: post.conteudo, 
      imagem: post.imagem || "" 
    });
    setOpenEdit(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Deseja realmente excluir este post?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:3000/posts/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchPosts();
      } catch (err) {
        console.error("Erro ao excluir post:", err);
        alert("Erro ao excluir o post.");
      }
    }
  };

  const handleNewPost = () => {
    setFormData({ titulo: "", conteudo: "", imagem: "" });
    setOpenCreate(true);
  };

  const handleSaveEdit = async () => {
    if (!selectedPost) return;
    
    setSubmitLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:3000/posts/${selectedPost.id}`,
        {
          titulo: formData.titulo,
          conteudo: formData.conteudo,
          imagem: formData.imagem || null,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOpenEdit(false);
      fetchPosts();
    } catch (err) {
      console.error("Erro ao editar post:", err);
      alert("Erro ao editar o post.");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleSaveCreate = async () => {
    setSubmitLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:3000/posts",
        {
          titulo: formData.titulo,
          conteudo: formData.conteudo,
          imagem: formData.imagem || null,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOpenCreate(false);
      fetchPosts();
    } catch (err) {
      console.error("Erro ao criar post:", err);
      alert("Erro ao criar o post.");
    } finally {
      setSubmitLoading(false);
    }
  };

  const getInitials = (nome: string) => {
    const names = nome.split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return nome.substring(0, 2).toUpperCase();
  };

  const getAvatarColor = (id: number) => {
    const colors = ["#667eea", "#4CAF50", "#FF6B6B", "#FFA726", "#42A5F5", "#AB47BC"];
    return colors[id % colors.length];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Stack 
        direction={{ xs: "column", sm: "row" }} 
        justifyContent="space-between" 
        alignItems={{ xs: "stretch", sm: "center" }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: "#2c3e50" }}>
            Gerenciar Posts
          </Typography>
          <Typography variant="body2" sx={{ color: "#5a6c7d", mt: 0.5 }}>
            Crie, edite e remova publicações
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />} 
          onClick={handleNewPost}
          sx={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
            "&:hover": {
              background: "linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)",
              transform: "translateY(-2px)",
              boxShadow: "0 6px 16px rgba(102, 126, 234, 0.4)",
            },
            transition: "all 0.3s ease"
          }}
        >
          Nova Postagem
        </Button>
      </Stack>

      <Paper 
        sx={{ 
          borderRadius: 3, 
          overflow: "hidden",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          border: "1px solid #e0e0e0"
        }}
      >
        <TableContainer>
          <Table sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow sx={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
                <TableCell sx={{ color: "#fff", fontWeight: 700, fontSize: "0.875rem" }}>ID</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: 700, fontSize: "0.875rem" }}>Imagem</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: 700, fontSize: "0.875rem" }}>Título</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: 700, fontSize: "0.875rem" }}>Autor</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: 700, fontSize: "0.875rem" }}>Data</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: 700, fontSize: "0.875rem" }} align="center">Ações</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {posts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                    <Typography color="text.secondary">Nenhum post encontrado</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                posts.map((post, index) => (
                  <TableRow 
                    key={post.id}
                    sx={{
                      "&:nth-of-type(odd)": { backgroundColor: "#f8f9fa" },
                      "&:hover": { 
                        backgroundColor: "#e8eaf6",
                        transition: "0.2s" 
                      },
                    }}
                  >
                    <TableCell sx={{ fontWeight: 600, color: "#667eea" }}>#{post.id}</TableCell>
                    <TableCell>
                      {post.imagem ? (
                        <Avatar 
                          src={`http://localhost:3000/uploads/${post.imagem}`} 
                          variant="rounded"
                          sx={{ width: 50, height: 50 }}
                          onError={(e: any) => {
                            e.target.src = `https://picsum.photos/50/50?random=${post.id}`;
                          }}
                        />
                      ) : (
                        <Avatar 
                          variant="rounded"
                          sx={{ 
                            width: 50, 
                            height: 50, 
                            background: "#f0f0f0",
                            color: "#999"
                          }}
                        >
                          -
                        </Avatar>
                      )}
                    </TableCell>
                    <TableCell>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontWeight: 600,
                          color: "#2c3e50",
                          maxWidth: 300,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap"
                        }}
                      >
                        {post.titulo}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Avatar 
                          sx={{ 
                            width: 32, 
                            height: 32,
                            background: getAvatarColor(post.Usuario.id),
                            fontSize: "0.75rem",
                            fontWeight: 600
                          }}
                        >
                          {getInitials(post.Usuario.nome)}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 600, fontSize: "0.875rem" }}>
                            {post.Usuario.nome}
                          </Typography>
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <AccessTimeIcon sx={{ fontSize: 14, color: "#5a6c7d" }} />
                        <Typography variant="caption" sx={{ color: "#5a6c7d" }}>
                          {formatDate(post.data_criacao)}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={0.5} justifyContent="center">
                        <Tooltip title="Visualizar">
                          <IconButton 
                            size="small"
                            onClick={() => handleView(post)}
                            sx={{
                              color: "#667eea",
                              "&:hover": { background: "rgba(102, 126, 234, 0.1)" }
                            }}
                          >
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Editar">
                          <IconButton 
                            size="small"
                            onClick={() => handleEdit(post)}
                            sx={{
                              color: "#4CAF50",
                              "&:hover": { background: "rgba(76, 175, 80, 0.1)" }
                            }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Excluir">
                          <IconButton 
                            size="small"
                            onClick={() => handleDelete(post.id)}
                            sx={{
                              color: "#d32f2f",
                              "&:hover": { background: "rgba(211, 47, 47, 0.1)" }
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Dialog 
        open={openView} 
        onClose={() => setOpenView(false)} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3 }
        }}
      >
        {selectedPost?.imagem && (
          <Box
            sx={{
              width: "100%",
              height: 300,
              background: "#f5f5f5",
              overflow: "hidden"
            }}
          >
            <img
              src={`http://localhost:3000/uploads/${selectedPost.imagem}`}
              alt={selectedPost.titulo}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e: any) => {
                e.target.src = `https://picsum.photos/600/300?random=${selectedPost.id}`;
              }}
            />
          </Box>
        )}
        <DialogTitle sx={{ fontWeight: 700, fontSize: "1.5rem", color: "#2c3e50" }}>
          {selectedPost?.titulo}
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar 
                sx={{ 
                  width: 40, 
                  height: 40,
                  background: selectedPost ? getAvatarColor(selectedPost.Usuario.id) : "#ccc",
                  fontWeight: 600
                }}
              >
                {selectedPost && getInitials(selectedPost.Usuario.nome)}
              </Avatar>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {selectedPost?.Usuario.nome}
                </Typography>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <AccessTimeIcon sx={{ fontSize: 12, color: "#5a6c7d" }} />
                  <Typography variant="caption" sx={{ color: "#5a6c7d" }}>
                    {selectedPost && formatDate(selectedPost.data_criacao)}
                  </Typography>
                </Stack>
              </Box>
            </Stack>
            <Typography sx={{ whiteSpace: "pre-wrap", lineHeight: 1.7, color: "#5a6c7d" }}>
              {selectedPost?.conteudo}
            </Typography>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button 
            variant="contained" 
            onClick={() => setOpenView(false)}
            sx={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            }}
          >
            Fechar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog 
        open={openEdit || openCreate} 
        onClose={() => { setOpenEdit(false); setOpenCreate(false); }} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3 }
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, fontSize: "1.5rem", color: "#2c3e50" }}>
          {openEdit ? "Editar Post" : "Nova Postagem"}
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2.5}>
            <TextField
              label="Título"
              value={formData.titulo}
              onChange={e => setFormData({ ...formData, titulo: e.target.value })}
              fullWidth
              required
            />
            <TextField
              label="Conteúdo"
              value={formData.conteudo}
              onChange={e => setFormData({ ...formData, conteudo: e.target.value })}
              multiline
              rows={4}
              fullWidth
              required
            />
            <TextField
              label="Nome da Imagem"
              value={formData.imagem}
              onChange={e => setFormData({ ...formData, imagem: e.target.value })}
              fullWidth
              placeholder="exemplo.jpg"
              helperText="Deixe em branco se não quiser adicionar imagem"
            />
            {formData.imagem && (
              <Box
                sx={{
                  width: "100%",
                  height: 200,
                  borderRadius: 2,
                  overflow: "hidden",
                  background: "#f5f5f5"
                }}
              >
                <img
                  src={`http://localhost:3000/uploads/${formData.imagem}`}
                  alt="Preview"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(e: any) => {
                    e.target.src = "https://via.placeholder.com/400x200?text=Imagem+não+encontrada";
                  }}
                />
              </Box>
            )}
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button 
            onClick={() => { setOpenEdit(false); setOpenCreate(false); }}
            sx={{ color: "#5a6c7d" }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={openEdit ? handleSaveEdit : handleSaveCreate}
            disabled={submitLoading || !formData.titulo || !formData.conteudo}
            sx={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              minWidth: 100
            }}
          >
            {submitLoading ? <CircularProgress size={24} color="inherit" /> : (openEdit ? "Salvar" : "Criar")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
