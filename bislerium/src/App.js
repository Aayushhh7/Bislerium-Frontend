import "./App.css";
import Login from "./component/Login";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from "./component/Signup";
import Home from "./component/Home";
import Surfer from "./component/Surfer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/' element={<Home />}></Route>
        <Route path='/surfers' element={<Surfer />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
