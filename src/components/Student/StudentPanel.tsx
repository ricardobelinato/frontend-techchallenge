import { Box, Typography, Avatar, Card, CardHeader, CardContent, CardMedia } from "@mui/material";
import ButtonAppBar from "../Navbar";
import Banner from "../Banner/Banner";



// Dados fake dos posts
const posts = [
  {
    id: 1,
    titulo: "Aprendendo Algoritmos",
    conteudo: "Hoje vamos estudar os principais algoritmos de busca e ordenação em programação.",
    Usuario: { nome: "Professor Carlos" },
    data_criacao: "2025-09-01T12:00:00Z",
    imagem: "https://picsum.photos/600/300?random=1",
  },
  {
    id: 2,
    titulo: "Estruturas de Dados",
    conteudo: "Vamos entender listas, pilhas e filas e como elas ajudam a organizar informações.",
    Usuario: { nome: "Professor Ana" },
    data_criacao: "2025-09-03T14:30:00Z",
    imagem: "https://picsum.photos/600/300?random=2",
  },
  {
    id: 3,
    titulo: "Programação Funcional",
    conteudo: "Explorando conceitos como funções puras, imutabilidade e composição em JavaScript.",
    Usuario: { nome: "Professor Roberto" },
    data_criacao: "2025-09-05T09:15:00Z",
    imagem: "https://picsum.photos/600/300?random=3",
  },
];

export default function StudentPanel() {
  return (
    <>
      {/* Navbar */}
      <ButtonAppBar />

      {/* Banner */}
      <Banner />

      {/* Posts */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
          mb: 4,
        }}
      >
        {posts.map((post) => (
          <Card key={post.id} sx={{ maxWidth: 600, width: "90%", boxShadow: 3 }}>
            <CardHeader
              avatar={<Avatar>{post.Usuario.nome[0]}</Avatar>}
              title={post.Usuario.nome}
              subheader={new Date(post.data_criacao).toLocaleDateString("pt-BR")}
            />
            {post.imagem && (
              <CardMedia component="img" height="300" image={post.imagem} alt={post.titulo} />
            )}
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {post.titulo}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {post.conteudo}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </>
  );
}
