import "./App.css";
import Login from "./component/Login";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from "./component/Signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
