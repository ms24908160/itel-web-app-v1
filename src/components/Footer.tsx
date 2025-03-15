import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/footer.css'; // Import the CSS file for custom styles

const Footer: React.FC = () => {
    return (
        <footer className="footer mt-auto py-3 bg-dark text-white">
            <div className="container text-center">
                <ul className="list-inline">
                    <li className="list-inline-item">
                        <a href="/about-us" className="text-white">About Us</a>
                    </li>
                    <li className="list-inline-item">
                        <a href="/privacy-policy" className="text-white">Privacy Policy</a>
                    </li>
                    <li className="list-inline-item">
                        <a href="/faq" className="text-white">FAQ</a>
                    </li>
                    <li className="list-inline-item">
                        <a href="/terms-and-conditions" className="text-white">Terms and Conditions</a>
                    </li>
                </ul>
                <p className="mt-3 mb-0">&copy; 2025 iTEL. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;