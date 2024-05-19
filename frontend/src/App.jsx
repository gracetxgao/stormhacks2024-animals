import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Explore from "./Explore";
import Login from "./Login";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App
