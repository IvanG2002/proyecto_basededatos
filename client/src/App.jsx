import Login from "../components/Login";
import Register from "../components/Register";
import Home from "../components/Home";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login></Login>}></Route>
      <Route path="/Home" element={<Home></Home>}></Route>
      <Route path="/Register" element={<Register></Register>}></Route>
    </Routes>
  );
}

export default App;
