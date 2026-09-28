import { BrowserRouter as Router, Route, Routes } 
from "react-router-dom";

import Home from './pages/Home';
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inscription" element={<RegisterPage />} />
        <Route path="/connexion" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;