import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Animals from "./Animals";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/animals" element={<Animals />} />
      </Routes>
    </Router>
  );
};