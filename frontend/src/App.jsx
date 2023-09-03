import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import CreateBook from "./pages/CreateBook";
import UpdateBook from "./pages/UpdateBook";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/books/create"
          element={
            <PrivateRoute>
              <CreateBook />
            </PrivateRoute>
          }
        />
        <Route
          path="/books/:id/edit"
          element={
            <PrivateRoute>
              <UpdateBook />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
