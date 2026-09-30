import { BrowserRouter as Router, Route, Routes } 
from "react-router-dom";

import Home from './pages/Home';
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Publish from "./pages/Publish";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/publish" element={<Publish />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;