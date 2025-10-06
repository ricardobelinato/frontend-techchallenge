// import { Container, Typography, Box } from "@mui/material";
import { Container } from "@mui/material";
import CustomTable from "../Table/TablePostAdmin";
import ButtonAppBar from "../Navbar";
import Banner from "../Banner/Banner";

export default function AdminPanel() {
  return (
    <>
      {/* Navbar */}
      <ButtonAppBar />

      {/* Banner */}
      <Banner />

      {/* Conteúdo */}
      <Container sx={{ mt: 4 }}>
        {/* <Box sx={{ mb: 3 }}>
          <Typography variant="h5" gutterBottom>
            Painel de Postagens
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Aqui você pode criar, editar e excluir posts.
          </Typography>
        </Box> */}

        {/* Tabela de posts */}
        <CustomTable />
      </Container>
    </>
  );
}
