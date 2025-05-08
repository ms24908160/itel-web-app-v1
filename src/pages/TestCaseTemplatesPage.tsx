import React from 'react';
import withFooter from '../components/withFooter';

import '../styles/global.css'; // Import the global CSS file

const testCases: Record<number, string[]> = {
    1: ["TC001", "Login with Valid Credentials", "Verify user can log in with valid username and password.", "1. Open login page\n2. Enter valid username\n3. Enter valid password\n4. Click Login", "User is redirected to dashboard with welcome message and user-specific data."],
    2: ["TC002", "Login with Invalid Credentials", "Ensure the system rejects invalid credentials.", "1. Open login page\n2. Enter incorrect username/password\n3. Click Login", "Error message 'Invalid username or password' appears, login fails."],
    3: ["TC003", "Password Complexity Rules", "Validate password field requires uppercase, lowercase, special character, and minimum 8 characters.", "1. Go to signup page\n2. Enter simple password (e.g., 'test')\n3. Try to submit", "Error message 'Password must meet complexity rules' is shown."],
    4: ["TC004", "Forgot Password Functionality", "Verify email reset link is sent upon request.", "1. Click 'Forgot Password' on login page\n2. Enter registered email\n3. Click Submit", "Message 'Password reset link sent to your email' appears."],
    5: ["TC005", "Session Timeout", "Ensure system logs out user after inactivity.", "1. Login and remain idle for 30+ mins\n2. Try to navigate or click after timeout", "Redirected to login page with message 'Session expired'."],
    6: ["TC006", "Signup with Existing Username", "System should reject duplicate usernames during signup.", "1. Go to signup page\n2. Enter existing username\n3. Fill other details\n4. Submit", "Error 'Username already exists' shown, signup blocked."],
    7: ["TC007", "Email Format Validation", "Ensure system validates correct email structure.", "1. Go to signup page\n2. Enter 'user@domain' or 'user@'\n3. Submit", "Error 'Invalid email format' shown."],
    8: ["TC008", "Logout Functionality", "Check if logout correctly redirects and ends session.", "1. Login\n2. Click logout icon or button", "User is redirected to login page, session terminated."],
    9: ["TC009", "Empty Form Submission", "System should not allow empty fields on login.", "1. Leave username and password blank\n2. Click Login", "Error messages shown for both fields: 'Username is required' and 'Password is required'."],
    10: ["TC010", "Password Mismatch on Signup", "Ensure both password fields must match.", "1. Enter different passwords in 'Password' and 'Confirm Password'\n2. Submit form", "Error message 'Passwords do not match' appears, form not submitted."]
};

const seleniumTemplates: string[] = [
    `@SmokeTest
Feature: Login
  Scenario: Login with valid credentials
    Given User opens the browser
    And navigates to the login page
    When User enters valid credentials
    And clicks login
    Then User is redirected to the dashboard`,

    `@SanityTest
Feature: Logout
  Scenario: User logs out successfully
    Given User is logged in
    When User clicks the logout button
    Then User is redirected to the login screen
    And session is terminated`,

    `@RegressionTest
Feature: Delete Entry
  Scenario: User deletes an entry
    Given User is on the entries page
    When User selects an entry and clicks delete
    And confirms the deletion
    Then Entry should no longer appear in the list`,

    `@SmokeTest
Feature: File Upload
  Scenario: Upload a file
    Given User is on the upload form
    When User selects a valid file
    And clicks submit
    Then Success message is shown
    And file appears in the list`,

    `@SanityTest
Feature: Search
  Scenario: Perform keyword search
    Given User is on the search page
    When User enters a search term
    And clicks search
    Then Relevant results are displayed`,

    `@RegressionTest
Feature: Add to Cart
  Scenario: Add product to cart
    Given User views a product
    When User clicks 'Add to Cart'
    Then Product appears in cart with correct details`,

    `@RegressionTest
Feature: Pagination
  Scenario: Navigate between pages
    Given User is on paginated results
    When User clicks next
    Then Next set of results is shown`,

    `@SanityTest
Feature: Form Submission
  Scenario: Submit filled form
    Given User fills all required fields
    When User submits the form
    Then Confirmation appears and data is saved`,

    `@SmokeTest
Feature: Profile Update
  Scenario: Edit profile successfully
    Given User is on profile page
    When User updates details and saves
    Then Updated info is reflected immediately`,

    `@RegressionTest
Feature: Password Reset
  Scenario: Reset password via email
    Given User is on forgot password page
    When User submits a registered email
    Then Reset link is sent
    And User can log in with new password`
];

const TestCaseTemplatesPage: React.FC = () => {
    const downloadTC = (id: number) => {
        const data = testCases[id];
        const csv = ["Test Case ID,Title,Description,Steps,Expected Result", data.join(',')].join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `${data[0]}_Test_Case.csv`);
        link.click();
    };

    return (
        <div className="test-case-templates-page">
            <header className="text-center my-4">
                <h1>Test Case Templates</h1>
                <p>Manage and use test case templates for both manual and automated (Selenium-based) testing.</p>
            </header>
            <main className="container">
                <section className="mb-5">
  <h2 className="mb-4">📘 What You'll Find Here</h2>
  <p className="mb-4">
    This page offers ready-to-use test case templates to help QA testers — especially beginners — get started with writing clear,
    effective manual and automation test cases.
  </p>
  <ul className="mb-4">
    <li className="mb-3">
      🗂️ <strong>Manual Test Case Downloads:</strong> 10 beginner-friendly test cases in CSV format
    </li>
    <li className="mb-3">
      🧪 <strong>Selenium Scenarios:</strong> Ready-to-copy Gherkin-style scenarios for login, logout, and more
    </li>
    <li className="mb-3">
      📋 <strong>Realistic Examples:</strong> Scenarios include login, form submission, pagination, and uploads
      <ul className="mt-2 ms-3">
        <li className="mb-1"><strong>Login:</strong> Automate end-to-end login with valid and invalid credentials, including validations and redirects.</li>
        <li className="mb-1"><strong>Form Submission:</strong> Test mandatory field checks, data validation, and confirmation messages.</li>
        <li className="mb-1"><strong>Pagination:</strong> Verify navigation across multiple pages with accurate data rendering.</li>
        <li className="mb-1"><strong>File Upload:</strong> Validate file formats, upload size, and proper file listing after submission.</li>
      </ul>
    </li>
    <li className="mb-3">
      🔁 <strong>Reusable Snippets:</strong> Use directly in frameworks like Cucumber, JUnit, or PyTest
      <p className="mt-2 mb-2">
        Each test scenario is written with generic Given/When/Then steps or step-driven actions, making them easy to port into:
      </p>
      <ul className="ms-3">
        <li><strong>Cucumber:</strong> Use the Gherkin format directly in your .feature files.</li>
        <li><strong>JUnit:</strong> Adapt scenarios into Java methods annotated with @Test and assertions.</li>
        <li><strong>PyTest:</strong> Convert step logic into test functions using Python with assertions.</li>
      </ul>
    </li>
  </ul>
</section>
                <section className="mb-5">
                    <h2>🧪 Beginner-Friendly Manual Test Case Downloads</h2>
                    <p>Click a button below to download a test case in CSV format with detailed steps and expected results.</p>
                    <div className="row">
                        {Object.entries(testCases).map(([id, tc]) => (
                            <div className="col-md-6 mb-2" key={id}>
                                <button className="btn btn-outline-primary w-100" onClick={() => downloadTC(Number(id))}>
                                    {tc[1]}
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-5">
                    <h2>🧰 Selenium Feature Template Scenarios</h2>
                    <p>Use these as a guide to implement Selenium automation scripts for common web application flows.</p>
                    <div>
                    {seleniumTemplates.map((item, index) => (
                        <div className="position-relative mb-3">
  <pre className="bg-light p-3 rounded border">
    <code>{item}</code>
  </pre>
  <button
    onClick={() => navigator.clipboard.writeText(item)}
    className="btn btn-sm btn-outline-secondary position-absolute"
    style={{ top: '10px', right: '10px' }}
  >
    Copy
  </button>
</div>
                    ))}
                </div>
                </section>
            </main>
        </div>
    );
};

export default withFooter(TestCaseTemplatesPage);
