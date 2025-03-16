import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/navbar.css';
import '../styles/fonts.css'; // Import the fonts.css file
import { useLocation } from 'react-router-dom';
import accountIcon from '../assets/images/account.png'; // Import the account icon
import homeIcon from '../assets/images/home.png'; // Import the home icon
import generateIcon from '../assets/images/generate.png'; // Import the generate icon
import templateIcon from '../assets/images/template.png'; // Import the template icon
import knowledgeIcon from '../assets/images/knowledge.png'; // Import the knowledge icon

const Navbar: React.FC = () => {
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <nav className={`navbar navbar-expand-lg navbar-dark custom-navbar ${isScrolled ? 'hidden' : ''}`}>
                <a className="navbar-brand" href="/" style={{ fontFamily: 'ShackleItalic', fontSize: '36px', marginRight: '10px', marginLeft: '10px' }}>
                    iTEL
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mx-auto">
                        <li className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
                            <a className="nav-link" href="/">Home</a>
                        </li>
                        <li className={`nav-item ${location.pathname === '/test-case-generation' ? 'active' : ''}`}>
                            <a className="nav-link" href="/test-case-generation">Test Case Generation</a>
                        </li>
                        <li className={`nav-item ${location.pathname === '/test-case-templates' ? 'active' : ''}`}>
                            <a className="nav-link" href="/test-case-templates">Test Case Templates</a>
                        </li>
                        <li className={`nav-item ${location.pathname === '/quality-assurance-knowledge' ? 'active' : ''}`}>
                            <a className="nav-link" href="/quality-assurance-knowledge">Quality Assurance Knowledge</a>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/signin">
                                <img src={accountIcon} alt="Account" style={{ height: '36px', width: '36px' }} />
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className={`side-panel ${isScrolled ? 'visible' : ''}`}>
                <a className="navbar-brand" href="/" style={{ fontFamily: 'ShackleItalic', fontSize: '36px', marginBottom: '20px' }}>
                    iTEL
                </a>
                <ul className="side-nav">
                    <li className={`side-nav-item ${location.pathname === '/' ? 'active' : ''}`}>
                        <a className="side-nav-link" href="/">
                            <img src={homeIcon} alt="Home" />
                        </a>
                    </li>
                    <li className={`side-nav-item ${location.pathname === '/test-case-generation' ? 'active' : ''}`}>
                        <a className="side-nav-link" href="/test-case-generation">
                            <img src={generateIcon} alt="Test Case Generation" />
                        </a>
                    </li>
                    <li className={`side-nav-item ${location.pathname === '/test-case-templates' ? 'active' : ''}`}>
                        <a className="side-nav-link" href="/test-case-templates">
                            <img src={templateIcon} alt="Test Case Templates" />
                        </a>
                    </li>
                    <li className={`side-nav-item ${location.pathname === '/quality-assurance-knowledge' ? 'active' : ''}`}>
                        <a className="side-nav-link" href="/quality-assurance-knowledge">
                            <img src={knowledgeIcon} alt="Quality Assurance Knowledge" />
                        </a>
                    </li>
                </ul>
                <div className="side-nav-account">
                    <a className="side-nav-link" href="/signin">
                        <img src={accountIcon} alt="Account" style={{ height: '36px', width: '36px' }} />
                    </a>
                </div>
            </div>
        </>
    );
};

export default Navbar;