import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./screens/Login";
import AdminLogin from "./screens/AdminLogin";
import Home from "./screens/Home";
import Dashboard from "./screens/Dashboard";
import SignInForm from "./components/Form/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<SignInForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        {/* Uncomment and add these routes if you have these components */}
        {/* <Route path="/addBook" element={<AddBook />} />
        <Route path="/allBook" element={<AllBook />} />
        <Route path="/manageStudent" element={<AllStudent />} />
        <Route path="/stuReqIssue" element={<Messages />} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
