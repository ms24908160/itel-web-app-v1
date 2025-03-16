import React from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/backButton.css'; // Import the CSS file for the back button

const BackButton: React.FC = () => {
    const history = useHistory();

    const handleClick = () => {
        history.push('/test-case-generation');
    };

    return (
        <button className="back-button" onClick={handleClick}>
            Back
        </button>
    );
};

export default BackButton;