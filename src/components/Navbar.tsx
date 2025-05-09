import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/navbar.css';
import '../styles/fonts.css'; // Import the fonts.css file
import { useLocation, Link, useNavigate } from 'react-router-dom';
import accountIcon from '../assets/images/account.png'; // Default account icon
import accountGreenIcon from '../assets/images/accountgreen.png'; // Green account icon for logged-in users
import homeIcon from '../assets/images/home.png'; // Import the home icon
import generateIcon from '../assets/images/generate.png'; // Import the generate icon
import templateIcon from '../assets/images/template.png'; // Import the template icon
import knowledgeIcon from '../assets/images/knowledge.png'; // Import the knowledge icon
import managementIcon from '../assets/images/management.png'; // Import the management icon

const Navbar: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate(); // React Router's navigation hook
    const [isScrolled, setIsScrolled] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

    useEffect(() => {
        // Check if the user is logged in by verifying the presence of a token
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token); // Set to true if token exists, false otherwise
    }, []);

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

    // Handle Logout
    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear the JWT token from localStorage
        setIsLoggedIn(false); // Update login status
        navigate('/signin-signup'); // Redirect to the SignInSignUpPage
    };

    return (
        <>
            <nav className={`navbar navbar-expand-lg navbar-dark custom-navbar ${isScrolled ? 'hidden' : ''}`}>
                <Link className="navbar-brand" to="/" style={{ fontFamily: 'ShackleItalic', fontSize: '36px', marginRight: '10px', marginLeft: '10px' }}>
                    iTEL
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mx-auto">
                        <li className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className={`nav-item ${location.pathname === '/test-case-generation' ? 'active' : ''}`}>
                            <Link className="nav-link" to="/test-case-generation">Test Case Generation</Link>
                        </li>
                        <li className={`nav-item ${location.pathname === '/test-case-templates' ? 'active' : ''}`}>
                            <Link className="nav-link" to="/test-case-templates">Test Case Templates</Link>
                        </li>
                        <li className={`nav-item ${location.pathname === '/quality-assurance-knowledge' ? 'active' : ''}`}>
                            <Link className="nav-link" to="/quality-assurance-knowledge">Quality Assurance Knowledge</Link>
                        </li>
                        {/* Management option visible to all users */}
                        <li className={`nav-item ${location.pathname === '/management' ? 'active' : ''}`}>
                            <Link className="nav-link" to="/management">Management</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        {isLoggedIn ? (
                            <>
                                <li className="nav-item">
                                    <button onClick={handleLogout} className="btn btn-danger navbar-logout-button">
                                        Logout
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/signin-signup">
                                        <img
                                            src={accountGreenIcon} // Use green icon if logged in
                                            alt="Account"
                                            style={{ height: '36px', width: '36px' }}
                                        />
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item">
                                <button
                                    onClick={() => navigate('/signin-signup')} // Redirect to SignInSignUpPage
                                    className="btn btn-primary navbar-login-button"
                                >
                                    Login/Signup
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </nav>
            <div className={`side-panel ${isScrolled ? 'visible' : ''}`}>
                <Link className="navbar-brand" to="/" style={{ fontFamily: 'ShackleItalic', fontSize: '36px', marginBottom: '20px' }}>
                    iTEL
                </Link>
                <ul className="side-nav">
                    <li className={`side-nav-item ${location.pathname === '/' ? 'active' : ''}`}>
                        <Link className="side-nav-link" to="/">
                            <img src={homeIcon} alt="Home" />
                        </Link>
                    </li>
                    <li className={`side-nav-item ${location.pathname === '/test-case-generation' ? 'active' : ''}`}>
                        <Link className="side-nav-link" to="/test-case-generation">
                            <img src={generateIcon} alt="Test Case Generation" />
                        </Link>
                    </li>
                    <li className={`side-nav-item ${location.pathname === '/test-case-templates' ? 'active' : ''}`}>
                        <Link className="side-nav-link" to="/test-case-templates">
                            <img src={templateIcon} alt="Test Case Templates" />
                        </Link>
                    </li>
                    <li className={`side-nav-item ${location.pathname === '/quality-assurance-knowledge' ? 'active' : ''}`}>
                        <Link className="side-nav-link" to="/quality-assurance-knowledge">
                            <img src={knowledgeIcon} alt="Quality Assurance Knowledge" />
                        </Link>
                    </li>
                    {/* Management option visible to all users */}
                    <li className={`side-nav-item ${location.pathname === '/management' ? 'active' : ''}`}>
                        <Link className="side-nav-link" to="/management">
                            <img src={managementIcon} alt="Management" />
                        </Link>
                    </li>
                </ul>
                <div className="side-nav-account">
                    <Link className="side-nav-link" to="/signin-signup">
                        <img
                            src={isLoggedIn ? accountGreenIcon : accountIcon} // Use green icon if logged in
                            alt="Account"
                            style={{ height: '36px', width: '36px' }}
                        />
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Navbar;