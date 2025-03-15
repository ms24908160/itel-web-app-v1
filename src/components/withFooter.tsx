import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import '../styles/global.css'; // Import the global CSS file

const withFooter = (WrappedComponent: React.FC) => {
    return () => (
        <div className="page-container">
            <Navbar />
            <div className="content-wrap">
                <WrappedComponent />
            </div>
            <Footer />
        </div>
    );
};

export default withFooter;