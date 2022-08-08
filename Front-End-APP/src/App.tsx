import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Common Components
import Header from './components/header';
import Footer from './components/footer';

// Content Components
import Home from './content/home';
import About from './content/about';
import Projects from './content/projects';
import Services from './content/services';
import Contact from './content/contact';
import PageNotFound from './content/PageNotFound';

// Authentication Components
import Login from './authentication/login';
import Logout from './authentication/logout';

// Style and Fonts
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';

function App() {  
  return (
    <div className="App">
      <BrowserRouter>
        <Header></Header>
        
        {/* Client-side Routing */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
