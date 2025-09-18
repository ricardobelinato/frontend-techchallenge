import * as React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from "@mui/material";

interface VisualizarPostProps {
  open: boolean;
  onClose: () => void;
  post: {
    titulo: string;
    conteudo: string;
    Usuario: { nome: string };
    data_criacao: string;
    imagem?: string;
  } | null;
}

export default function VisualizarPost({ open, onClose, post }: VisualizarPostProps) {
  const [expand, setExpand] = React.useState(false);

  if (!post) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{post.titulo}</DialogTitle>
      <DialogContent dividers>
        <Typography variant="subtitle2" color="text.secondary">
          Autor: {post.Usuario.nome} | {new Date(post.data_criacao).toLocaleDateString("pt-BR")}
        </Typography>

        {post.imagem && (
          <Box sx={{ mt: 2, textAlign: "center" }}>
            <img
              src={post.imagem}
              alt="Imagem do post"
              style={{ maxWidth: "100%", borderRadius: 8, boxShadow: "0 2px 6px rgba(0,0,0,0.2)" }}
            />
          </Box>
        )}

        <Typography variant="body1" sx={{ mt: 2 }}>
          {expand ? post.conteudo : post.conteudo.slice(0, 150) + (post.conteudo.length > 150 ? "..." : "")}
        </Typography>

        {post.conteudo.length > 150 && (
          <Button size="small" onClick={() => setExpand(!expand)} sx={{ mt: 1 }}>
            {expand ? "Ver menos" : "Ver mais"}
          </Button>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="primary">Fechar</Button>
      </DialogActions>
    </Dialog>
  );
}
