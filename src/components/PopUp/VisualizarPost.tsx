// import * as React from "react";
// import {
//   Card, CardHeader, CardContent, CardActions, CardMedia,
//   Typography, IconButton, Button, Dialog, DialogTitle,
//   DialogContent, DialogActions, TextField, Stack
// } from "@mui/material";
// import Grid from "@mui/material/Grid";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import AddIcon from "@mui/icons-material/Add";

// interface Usuario {
//   nome: string;
// }

// interface Post {
//   id: number;
//   titulo: string;
//   conteudo: string;
//   Usuario: Usuario;
//   data_criacao: string;
//   imagem?: string;
// }

// export default function PostFeed() {
//   const [posts, setPosts] = React.useState<Post[]>([
//     {
//       id: 1,
//       titulo: "Primeiro Post",
//       conteudo: "Este é o conteúdo do primeiro post.",
//       Usuario: { nome: "Roberto Silva" },
//       data_criacao: "2025-09-01T12:00:00Z",
//       imagem: "https://picsum.photos/500/300?random=1",
//     },
//     {
//       id: 2,
//       titulo: "Segundo Post",
//       conteudo: "Outro conteúdo interessante do post.",
//       Usuario: { nome: "Maria Souza" },
//       data_criacao: "2025-09-05T14:30:00Z",
//     },
//   ]);

//   // Modais
//   const [openView, setOpenView] = React.useState(false);
//   const [openEdit, setOpenEdit] = React.useState(false);
//   const [openCreate, setOpenCreate] = React.useState(false);
//   const [selectedPost, setSelectedPost] = React.useState<Post | null>(null);
//   const [formData, setFormData] = React.useState({ titulo: "", conteudo: "", imagem: "" });

//   // Handlers
//   const handleView = (post: Post) => {
//     setSelectedPost(post);
//     setOpenView(true);
//   };

//   const handleEdit = (post: Post) => {
//     setSelectedPost(post);
//     setFormData({ titulo: post.titulo, conteudo: post.conteudo, imagem: post.imagem || "" });
//     setOpenEdit(true);
//   };

//   const handleDelete = (id: number) => {
//     if (window.confirm("Deseja realmente excluir este post?")) {
//       setPosts(posts.filter(p => p.id !== id));
//     }
//   };

//   const handleNewPost = () => {
//     setFormData({ titulo: "", conteudo: "", imagem: "" });
//     setOpenCreate(true);
//   };

//   const handleSaveEdit = () => {
//     if (selectedPost) {
//       setPosts(posts.map(p => p.id === selectedPost.id ? { ...p, ...formData } : p));
//       setOpenEdit(false);
//     }
//   };

//   const handleSaveCreate = () => {
//     const newPost: Post = {
//       id: posts.length ? Math.max(...posts.map(p => p.id)) + 1 : 1,
//       titulo: formData.titulo,
//       conteudo: formData.conteudo,
//       Usuario: { nome: "Professor Teste" },
//       data_criacao: new Date().toISOString(),
//       imagem: formData.imagem || undefined,
//     };
//     setPosts([newPost, ...posts]); // adiciona no topo
//     setOpenCreate(false);
//   };

//   return (
//     <div>
//       {/* Botão nova postagem */}
//       <Stack direction="row" justifyContent="flex-end" sx={{ mb: 2 }}>
//         <Button variant="contained" startIcon={<AddIcon />} onClick={handleNewPost}>
//           Nova Postagem
//         </Button>
//       </Stack>

//       {/* Feed de posts */}
//       <Grid container spacing={3}>
//         {posts.map(post => (
//           <Grid item xs={12} md={6} lg={4} key={post.id}>
//             <Card>
//               {post.imagem && (
//                 <CardMedia
//                   component="img"
//                   height="200"
//                   image={post.imagem}
//                   alt={post.titulo}
//                 />
//               )}
//               <CardHeader
//                 title={post.titulo}
//                 subheader={`${post.Usuario.nome} • ${new Date(post.data_criacao).toLocaleDateString("pt-BR")}`}
//               />
//               <CardContent>
//                 <Typography variant="body2" color="text.secondary">
//                   {post.conteudo}
//                 </Typography>
//               </CardContent>
//               <CardActions>
//                 <IconButton onClick={() => handleView(post)}>
//                   <VisibilityIcon />
//                 </IconButton>
//                 <IconButton onClick={() => handleEdit(post)}>
//                   <EditIcon />
//                 </IconButton>
//                 <IconButton onClick={() => handleDelete(post.id)}>
//                   <DeleteIcon color="error" />
//                 </IconButton>
//               </CardActions>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Modal Visualizar */}
//       <Dialog open={openView} onClose={() => setOpenView(false)}>
//         <DialogTitle>Visualizar Post</DialogTitle>
//         <DialogContent>
//           <Typography variant="h6">{selectedPost?.titulo}</Typography>
//           <Typography variant="body2" color="text.secondary">
//             {selectedPost?.Usuario.nome} • {selectedPost && new Date(selectedPost.data_criacao).toLocaleDateString("pt-BR")}
//           </Typography>
//           <Typography sx={{ mt: 2 }}>{selectedPost?.conteudo}</Typography>
//           {selectedPost?.imagem && <img src={selectedPost.imagem} alt={selectedPost.titulo} style={{ width: "100%", marginTop: 10 }} />}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenView(false)}>Fechar</Button>
//         </DialogActions>
//       </Dialog>

//       {/* Modal Editar */}
//       <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
//         <DialogTitle>Editar Post</DialogTitle>
//         <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
//           <TextField label="Título" value={formData.titulo} onChange={e => setFormData({ ...formData, titulo: e.target.value })} fullWidth />
//           <TextField label="Conteúdo" value={formData.conteudo} onChange={e => setFormData({ ...formData, conteudo: e.target.value })} multiline rows={4} fullWidth />
//           <TextField label="URL da Imagem" value={formData.imagem} onChange={e => setFormData({ ...formData, imagem: e.target.value })} fullWidth />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenEdit(false)}>Cancelar</Button>
//           <Button variant="contained" onClick={handleSaveEdit}>Salvar</Button>
//         </DialogActions>
//       </Dialog>

//       {/* Modal Criar */}
//       <Dialog open={openCreate} onClose={() => setOpenCreate(false)}>
//         <DialogTitle>Nova Postagem</DialogTitle>
//         <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
//           <TextField label="Título" value={formData.titulo} onChange={e => setFormData({ ...formData, titulo: e.target.value })} fullWidth />
//           <TextField label="Conteúdo" value={formData.conteudo} onChange={e => setFormData({ ...formData, conteudo: e.target.value })} multiline rows={4} fullWidth />
//           <TextField label="URL da Imagem" value={formData.imagem} onChange={e => setFormData({ ...formData, imagem: e.target.value })} fullWidth />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenCreate(false)}>Cancelar</Button>
//           <Button variant="contained" onClick={handleSaveCreate}>Criar</Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }
