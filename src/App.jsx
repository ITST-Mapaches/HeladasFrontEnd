import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MostrarProductos from "./components/MostrarProductos.jsx";
import Header from "./components/Header.jsx";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/paletas" element={<MostrarProductos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
