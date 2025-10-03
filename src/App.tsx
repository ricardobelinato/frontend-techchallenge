import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import AdminPanel from "./components/Admin/AdminPanel";
import AlunoPanel from "./components/Student/StudentPanel";
import PostDetail from "./components/Student/PostDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/aluno" element={<AlunoPanel />} />
        <Route path="/aluno/posts/:id" element={<PostDetail />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
