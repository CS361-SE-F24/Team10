import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Home } from "./Page/home";

function App() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <p>sdasdserqwrf</p>
      <Routes>
        <Route path="/home" element={<Home />}/>
      </Routes>
    </div>
  );
}

export default App;
