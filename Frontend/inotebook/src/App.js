import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Home from "./components/Home";
import NoteState from "./context/notes/NoteState";
import AlertState from "./context/alert/alertState";
import Alert from "./components/Alert";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

function App() {
  
  return (
    <>
      <AlertState>
        <NoteState>
          <Router>
            <Navbar />
            <Alert/>
            <Routes>
              <Route excat path="/" element={<Home />} />
              <Route excat path="/about" element={<About />} />
              <Route excat path="/login" element={<SignIn />} />
              <Route excat path="/signup" element={<SignUp />} />
            </Routes>
          </Router>
        </NoteState>
      </AlertState>
    </>
  );
}

export default App;
