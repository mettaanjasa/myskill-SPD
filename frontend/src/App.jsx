import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Liked from "./pages/Liked";
import Article from "./pages/Article";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home"
          element={
            <ProtectedRoute> <Home /> </ProtectedRoute>
          }/>

        <Route path="/liked"
          element={
            <ProtectedRoute> <Liked /> </ProtectedRoute>
          }/>

        <Route path="/article/:id"
          element={
            <ProtectedRoute> <Article /> </ProtectedRoute>
          }/>
          
      </Routes>
    </BrowserRouter>
  );
}

export default App;