import { Container, Typography } from "@mui/material";
import CustomTable from "./components/Table/TablePostAdmin";

export default function adminPanel() {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Postagens
      </Typography>
      <CustomTable />
    </Container>
  );
}
