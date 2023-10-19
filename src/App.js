import './App.css';
import Home from './pages/Home.tsx'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Analista from './pages/Analista.tsx';
import Navbar from './components/Navbar.tsx';
import Cad_analista from './pages/Cad_analista.tsx';
import Clientes from './pages/Clientes.tsx';
import Cad_Clientes from './pages/Cad_Clientes.tsx';

function App() {
  return (
    <>
    
    <Router>
        <Routes> 
          <Route path="/" element={<Home />} />
          <Route path="/analista" element={<Analista />} />
          <Route path="/cad_analista" element={<Cad_analista />} />    
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/cad_clientes" element={<Cad_Clientes />} />
          
        </Routes>
    </Router>
    </>
  );
}

export default App;
