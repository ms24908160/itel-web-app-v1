import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/images/logo_500x499.png';
import '../styles/navbar.css';
import { useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
    const location = useLocation();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
            <a className="navbar-brand" href="/">
                <img src={logo} alt="Logo" style={{ height: '40px', width: 'auto' }} />
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav mx-auto">
                    {location.pathname !== '/' && (
                        <li className="nav-item">
                            <a className="nav-link" href="/">Home</a>
                        </li>
                    )}
                    {location.pathname !== '/test-case-generation' && (
                        <li className="nav-item">
                            <a className="nav-link" href="/test-case-generation">Test Case Generation</a>
                        </li>
                    )}
                    {location.pathname !== '/test-case-templates' && (
                        <li className="nav-item">
                            <a className="nav-link" href="/test-case-templates">Test Case Templates</a>
                        </li>
                    )}
                    {location.pathname !== '/quality-assurance-knowledge' && (
                        <li className="nav-item">
                            <a className="nav-link" href="/quality-assurance-knowledge">Quality Assurance Knowledge</a>
                        </li>
                    )}
                </ul>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/profile">Profile</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;