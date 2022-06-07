import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LandingPage from './components/Landing/Landing.jsx';
import Home from './components/Home/Home';
import New from './components/New/New';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/new_dog" element={<New />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
