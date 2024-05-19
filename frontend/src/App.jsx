import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Explore from "./Explore";
import Login from "./Login";
import AddAnimal from "./AddAnimal"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-animal" element={<AddAnimal />} />
      </Routes>
    </Router>
  );
};

export default App
