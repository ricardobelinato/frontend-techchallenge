import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
} from "@mui/material";

interface Post {
  id: number;
  titulo: string;
  conteudo: string;
  data?: string; // opcional
  imagem?: string; // URL ou base64
}

interface EditarPostProps {
  open: boolean;
  onClose: () => void;
  post: Post | null;
  onSave: (updated: { titulo: string; conteudo: string; data?: string; imagem?: string }) => void;
}

export default function EditarPost({ open, onClose, post, onSave }: EditarPostProps) {
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [data, setData] = useState("");
  const [imagem, setImagem] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (post) {
      setTitulo(post.titulo);
      setConteudo(post.conteudo);
      setData(post.data || "");
      setPreview(post.imagem || null);
    }
  }, [post]);

  // Gera preview da imagem selecionada
  useEffect(() => {
    if (!imagem) return;
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(imagem);
  }, [imagem]);

  const handleSave = () => {
    onSave({ titulo, conteudo, data, imagem: preview || undefined });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Editar Post</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 1 }}>
          <TextField
            label="Título"
            fullWidth
            margin="normal"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
          <TextField
            label="Conteúdo"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={conteudo}
            onChange={(e) => setConteudo(e.target.value)}
          />
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2">Data do post</Typography>
            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              style={{ padding: "8px", marginTop: "4px", width: "100%" }}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2">Imagem do post</Typography>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImagem(e.target.files ? e.target.files[0] : null)}
              style={{ marginTop: "4px" }}
            />
            {preview && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="caption">Preview:</Typography>
                <img src={preview} alt="Preview" style={{ width: "100%", marginTop: "4px", borderRadius: 4 }} />
              </Box>
            )}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
