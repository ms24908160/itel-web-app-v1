import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TestCaseGenerationPage from './pages/TestCaseGenerationPage';
import TestCaseTemplatesPage from './pages/TestCaseTemplatesPage';
import QualityAssuranceKnowledgePage from './pages/QualityAssuranceKnowledgePage';
import SignInSignUpPage from './pages/SignInSignUpPage';
import URLBasedGenerationPage from './pages/URLBasedGenerationPage';
import ScreenshotBasedGenerationPage from './pages/ScreenshotBasedGenerationPage';
import TestCaseClassificationPage from './pages/TestCaseClassificationPage';
import ManagementPage from './pages/ManagementPage' // Ensure the file exists at this path or correct the path if necessary
import './styles/App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/test-case-generation" element={<TestCaseGenerationPage />} />
          <Route path="/test-case-templates" element={<TestCaseTemplatesPage />} />
          <Route path="/quality-assurance-knowledge" element={<QualityAssuranceKnowledgePage />} />
          <Route path="/signin-signup" element={<SignInSignUpPage />} />
          <Route path="/url-based-generation" element={<URLBasedGenerationPage />} />
          <Route path="/screenshot-based-generation" element={<ScreenshotBasedGenerationPage />} />
          <Route path="/test-case-classification" element={<TestCaseClassificationPage />} />
          <Route path="/management" element={<ManagementPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;