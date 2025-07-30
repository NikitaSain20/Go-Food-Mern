import "./App.css";
import Home from "./screen/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./screen/Login";
import SignUp from "./screen/SignUp";
import { CardProvider } from "./components/CardReducer";
import MyOrder from "./screen/MyOrder";
// import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
// import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
function App() {
  return (
    <div className="App">
      <CardProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/myorder" element={<MyOrder />} />
          </Routes>
        </Router>
      </CardProvider>
    </div>
  );
}

export default App;
