import Navbar from "./components/navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Favorite from "./pages/favorite/Favorite";
import Footer from "./components/footer";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorite />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
