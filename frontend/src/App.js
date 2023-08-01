import {BrowserRouter, Route, Routes} from 'react-router-dom'

import Home from './components/Home.jsx';
import Login from "./components/Login.jsx";
import Registro from './components/Registro.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/registro' element={<Registro/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
