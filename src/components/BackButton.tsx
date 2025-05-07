import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/backButton.css'; // Import the CSS file for the back button

const BackButton: React.FC = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/test-case-generation'); // Navigate to the test-case-generation page
    };

    return (
        <button className="back-button" onClick={handleClick}>
            Back
        </button>
    );
};

export default BackButton;