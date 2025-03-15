import React from 'react';
import ExampleComponent from '../components/ExampleComponent';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage: React.FC = () => {
    return (
        <div className="home-page">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/">Test Case Tool</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/about">About</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/contact">Contact</a>
                        </li>
                    </ul>
                </div>
            </nav>
            <header className="text-center my-4">
                <h1>Welcome to the Test Case Generation Tool</h1>
                <p>This application helps you generate and manage test cases efficiently.</p>
            </header>
            <main className="container">
                <ExampleComponent title="Sample Title" description="Sample Description" />
            </main>
        </div>
    );
};

export default HomePage;