import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TestCaseGenerationPage from './pages/TestCaseGenerationPage';
import TestCaseTemplatesPage from './pages/TestCaseTemplatesPage';
import QualityAssuranceKnowledgePage from './pages/QualityAssuranceKnowledgePage';
import SignInSignUpPage from './pages/SignInSignUpPage';
import './styles/App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/test-case-generation" component={TestCaseGenerationPage} />
          <Route path="/test-case-templates" component={TestCaseTemplatesPage} />
          <Route path="/quality-assurance-knowledge" component={QualityAssuranceKnowledgePage} />
          <Route path="/signin" component={SignInSignUpPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;