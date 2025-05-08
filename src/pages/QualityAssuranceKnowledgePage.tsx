import React from 'react';
import withFooter from '../components/withFooter';
import 'bootstrap/dist/css/bootstrap.min.css';

const QualityAssuranceKnowledgePage: React.FC = () => {
    // const testCases: Record<number, string[]> = {
    //     1: ["TC001", "Login with Valid Credentials", "Verify user can log in with valid username and password.", "1. Open login page\n2. Enter valid username\n3. Enter valid password\n4. Click Login", "User is redirected to dashboard with welcome message and user-specific data."],
    //     2: ["TC002", "Login with Invalid Credentials", "Ensure the system rejects invalid credentials.", "1. Open login page\n2. Enter incorrect username/password\n3. Click Login", "Error message 'Invalid username or password' appears, login fails."],
    //     3: ["TC003", "Password Complexity Rules", "Validate password field requires uppercase, lowercase, special character, and minimum 8 characters.", "1. Go to signup page\n2. Enter simple password (e.g., 'test')\n3. Try to submit", "Error message 'Password must meet complexity rules' is shown."],
    //     4: ["TC004", "Forgot Password Functionality", "Verify email reset link is sent upon request.", "1. Click 'Forgot Password' on login page\n2. Enter registered email\n3. Click Submit", "Message 'Password reset link sent to your email' appears."],
    //     5: ["TC005", "Session Timeout", "Ensure system logs out user after inactivity.", "1. Login and remain idle for 30+ mins\n2. Try to navigate or click after timeout", "Redirected to login page with message 'Session expired'."],
    //     6: ["TC006", "Signup with Existing Username", "System should reject duplicate usernames during signup.", "1. Go to signup page\n2. Enter existing username\n3. Fill other details\n4. Submit", "Error 'Username already exists' shown, signup blocked."],
    //     7: ["TC007", "Email Format Validation", "Ensure system validates correct email structure.", "1. Go to signup page\n2. Enter 'user@domain' or 'user@'\n3. Submit", "Error 'Invalid email format' shown."],
    //     8: ["TC008", "Logout Functionality", "Check if logout correctly redirects and ends session.", "1. Login\n2. Click logout icon or button", "User is redirected to login page, session terminated."],
    //     9: ["TC009", "Empty Form Submission", "System should not allow empty fields on login.", "1. Leave username and password blank\n2. Click Login", "Error messages shown for both fields: 'Username is required' and 'Password is required'."],
    //     10: ["TC010", "Password Mismatch on Signup", "Ensure both password fields must match.", "1. Enter different passwords in 'Password' and 'Confirm Password'\n2. Submit form", "Error message 'Passwords do not match' appears, form not submitted."]
    // };
    // const downloadTC = (id: number) => {
       
    //     const data = testCases[id];
    //     const csv = ["Test Case ID,Title,Description,Steps,Expected Result", data.join(',')].join('\n');
    //     const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    //     const url = URL.createObjectURL(blob);
    //     const link = document.createElement('a');
    //     link.setAttribute('href', url);
    //     link.setAttribute('download', `${data[0]}_Test_Case.csv`);
    //     link.click();
    // };

    return (
        <div className="quality-assurance-knowledge-page">
            <header className="text-center my-5">
                <h1>Quality Assurance Knowledge Hub</h1>
                <p className="lead">Explore comprehensive QA concepts, methodologies, tools, and downloadable beginner-friendly test cases.</p>
            </header>
            <main className="container">
                <nav className="mb-5">
                    <h4>📌 Page Overview</h4>
                    <ul>
                        <li><a href="#manual-testing">🔍 Manual Testing</a></li>
                        <li><a href="#automation-testing">🤖 Automation Testing</a></li>
                        <li><a href="#performance-testing">🚀 Performance Testing</a></li>
                        <li><a href="#resources">📚 Helpful Resources</a></li>
                    </ul>
                </nav>
                <section className="mb-5">
                    <h2 id="manual-testing" className="mt-5">🔍 Manual Testing</h2>
<p><strong>✅ What is Manual Testing?</strong> Manual testing is the process of manually executing test cases—without the use of automation tools—to identify bugs or issues in a software application. Testers act as end-users and verify that all features work as expected.</p>

<p><strong>🔍 Purpose of Manual Testing</strong></p>
<ul>
  <li>Ensure the application behaves correctly</li>
  <li>Validate business logic and user experience</li>
  <li>Catch bugs before the product reaches users</li>
  <li>Verify that fixes or updates don’t break other parts (regression testing)</li>
</ul>

<p><strong>🧪 Key Activities in Manual Testing</strong></p>
<ul>
  <li><strong>Understand Requirements:</strong> Read functional and business requirements; clarify doubts with stakeholders or developers.</li>
  <li><strong>Create Test Cases:</strong> Write step-by-step instructions for what to test and include expected results for each step.</li>
  <li><strong>Prepare Test Data:</strong> Set up sample user accounts, inputs, or files needed for testing.</li>
  <li><strong>Execute Tests:</strong> Manually follow test steps and document the results.</li>
  <li><strong>Report Bugs:</strong> Log defects with clear steps, screenshots, or logs.</li>
  <li><strong>Re-test & Regression Test:</strong> Re-test fixed issues and ensure no new bugs were introduced.</li>
</ul>

<p><strong>🧰 Types of Manual Testing</strong></p>
<table className="table table-bordered">
  <thead>
    <tr>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>Smoke Testing</td><td>Basic check to ensure the app launches or runs basic functions</td></tr>
    <tr><td>Sanity Testing</td><td>Quick check after minor changes to verify specific functionality</td></tr>
    <tr><td>Functional Testing</td><td>Validates each function of the app as per the requirement</td></tr>
    <tr><td>Regression Testing</td><td>Ensures old features work after updates/fixes</td></tr>
    <tr><td>Exploratory Testing</td><td>Testing without scripts to discover unexpected issues</td></tr>
    <tr><td>Usability Testing</td><td>Evaluates the user interface and experience</td></tr>
    <tr><td>Compatibility Testing</td><td>Tests how the app works across devices, OS, and browsers</td></tr>
    <tr><td>Acceptance Testing</td><td>Confirms whether the app meets user needs and is ready for release</td></tr>
  </tbody>
</table>

<p><strong>📘 Advantages of Manual Testing</strong></p>
<ul>
  <li>Best suited for exploratory, usability, and ad hoc testing</li>
  <li>Detects real user issues</li>
  <li>Doesn’t require scripting or tools knowledge</li>
  <li>Lower upfront cost</li>
</ul>

<p><strong>⚠️ Disadvantages of Manual Testing</strong></p>
<ul>
  <li>Time-consuming and repetitive</li>
  <li>Not ideal for large-scale or repeated test cases</li>
  <li>Human error is possible</li>
  <li>Hard to scale for frequent releases</li>
</ul>

<p><strong>📝 Best Practices in Manual Testing</strong></p>
<ul>
  <li>Write clear and concise test cases</li>
  <li>Always refer to the latest requirements</li>
  <li>Use version control for test documentation</li>
  <li>Prioritise test cases based on risk</li>
  <li>Keep bug reports detailed and objective</li>
  <li>Communicate frequently with developers and stakeholders</li>
</ul>

<p><strong>📄 Manual Testing Lifecycle (STLC)</strong></p>
<ul>
  <li>Requirement Analysis</li>
  <li>Test Planning</li>
  <li>Test Case Design</li>
  <li>Environment Setup</li>
  <li>Test Execution</li>
  <li>Defect Reporting</li>
  <li>Test Closure</li>
</ul>
</section>

                <section className="mb-5">
                    <h2 id="automation-testing" className="mt-5">🤖 Automation Testing</h2>
<p><strong>What is Automation Testing?</strong> Automation testing is the process of using software tools and scripts to run tests automatically. Unlike manual testing, it doesn't require human intervention once the tests are written and configured. It’s ideal for repetitive, time-consuming, or regression tests—and critical for agile or CI/CD environments.</p>

<p><strong>🎯 Purpose of Automation Testing</strong></p>
<ul>
  <li>Increase test efficiency and speed</li>
  <li>Minimise human error</li>
  <li>Enable frequent testing (e.g., during every build)</li>
  <li>Improve test coverage</li>
  <li>Reduce cost over time</li>
</ul>

<p><strong>⚙️ How Automation Testing Works</strong></p>
<ul>
  <li><strong>Select the Right Test Cases:</strong> Choose test cases that are stable, repetitive, and time-intensive to automate.</li>
  <li><strong>Choose an Automation Tool:</strong> Examples include Selenium, Cypress, Playwright, Appium, JUnit, TestNG, etc.</li>
  <li><strong>Write Test Scripts:</strong> Scripts are written using programming languages (e.g., Java, JavaScript, Python).</li>
  <li><strong>Execute Tests:</strong> Tests run automatically on demand or on schedule.</li>
  <li><strong>Review Reports:</strong> Logs and test results help you identify bugs quickly.</li>
</ul>

<p><strong>🧪 Types of Automation Testing</strong></p>
<table className="table table-bordered">
  <thead>
    <tr>
      <th>Type</th>
      <th>Purpose</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>Unit Testing</td><td>Tests individual units of code (methods/functions)</td></tr>
    <tr><td>Integration Testing</td><td>Tests interaction between modules/components</td></tr>
    <tr><td>Functional Testing</td><td>Verifies each feature functions according to requirements</td></tr>
    <tr><td>Regression Testing</td><td>Ensures new code hasn’t broken existing features</td></tr>
    <tr><td>Smoke Testing</td><td>Basic tests to ensure the system is stable enough for deeper testing</td></tr>
    <tr><td>UI Testing</td><td>Validates user interface behavior</td></tr>
    <tr><td>API Testing</td><td>Tests backend APIs directly using tools like Postman or REST Assured</td></tr>
    <tr><td>Performance Testing</td><td>Checks how the system performs under load (can be semi-automated)</td></tr>
  </tbody>
</table>

<p><strong>🧰 Popular Automation Testing Tools</strong></p>
<table className="table table-bordered">
  <thead>
    <tr>
      <th>Tool</th>
      <th>Used For</th>
      <th>Language Support</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>Selenium</td><td>Web automation</td><td>Java, C#, Python, JS</td></tr>
    <tr><td>Cypress</td><td>Modern web testing</td><td>JavaScript</td></tr>
    <tr><td>Playwright</td><td>Cross-browser web testing</td><td>JavaScript, Python, .NET</td></tr>
    <tr><td>Appium</td><td>Mobile app automation</td><td>Multiple</td></tr>
    <tr><td>JUnit/TestNG</td><td>Unit testing (Java)</td><td>Java</td></tr>
    <tr><td>PyTest</td><td>Unit testing (Python)</td><td>Python</td></tr>
    <tr><td>Postman</td><td>API testing</td><td>JavaScript (Tests)</td></tr>
    <tr><td>Cucumber</td><td>BDD testing (Gherkin)</td><td>Java, JS, etc.</td></tr>
  </tbody>
</table>

<p><strong>💡 Best Practices for Automation Testing</strong></p>
<ul>
  <li>Prioritise test cases that run frequently and are stable</li>
  <li>Use version control (e.g., Git) for scripts</li>
  <li>Maintain test scripts regularly</li>
  <li>Modularise test code for reusability</li>
  <li>Use data-driven testing for better coverage</li>
  <li>Integrate tests into CI/CD pipelines (Jenkins, GitHub Actions, etc.)</li>
</ul>

<p><strong>📈 When to Use Automation (vs Manual)</strong></p>
<table className="table table-bordered">
  <thead>
    <tr>
      <th>Manual Testing</th>
      <th>Automation Testing</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>Exploratory, UI/UX, one-time test cases</td><td>Repetitive, stable, data-heavy test cases</td></tr>
    <tr><td>New feature testing with many UI variations</td><td>Regression, load, or cross-browser testing</td></tr>
    <tr><td>Unpredictable scenarios</td><td>Scenarios with expected outcomes</td></tr>
  </tbody>
</table>

<pre>
<code>
{`@Test
public void loginTest() {
    WebDriver driver = new ChromeDriver();
    driver.get("https://example.com/login");
    driver.findElement(By.id("email")).sendKeys("test@example.com");
    driver.findElement(By.id("password")).sendKeys("Password123");
    driver.findElement(By.id("loginBtn")).click();

    String actualTitle = driver.getTitle();
    Assert.assertEquals(actualTitle, "Dashboard - Example");
    driver.quit();
}`}
</code>
</pre>


<p><strong>🚀 Advantages of Automation Testing</strong></p>
<ul>
  <li>Fast execution</li>
  <li>Early detection of defects</li>
  <li>Enables continuous testing</li>
  <li>Better ROI in long-term projects</li>
</ul>

<p><strong>⚠️ Disadvantages</strong></p>
<ul>
  <li>High initial investment</li>
  <li>Not suitable for all test scenarios (e.g., UI/UX)</li>
  <li>Requires skilled resources</li>
  <li>Ongoing maintenance needed</li>
</ul>
</section>

                <section className="mb-5">
                    <h2 id="performance-testing" className="mt-5">🚀 Performance Testing</h2>
<p><strong>What is Performance Testing?</strong> Performance testing evaluates how a software application behaves under a specific workload. It ensures the system is fast, stable, scalable, and responsive under expected (and peak) user traffic. It’s not about finding functional bugs, but about identifying bottlenecks and performance issues.</p>

<p><strong>🎯 Objectives of Performance Testing</strong></p>
<ul>
  <li>Measure system speed (response time, latency)</li>
  <li>Validate scalability (can it handle more users?)</li>
  <li>Ensure stability (under high load or stress)</li>
  <li>Identify performance bottlenecks</li>
  <li>Ensure compliance with SLAs (Service Level Agreements)</li>
</ul>

<p><strong>📊 Types of Performance Testing</strong></p>
<table className="table table-bordered">
  <thead>
    <tr><th>Type</th><th>Purpose</th></tr>
  </thead>
  <tbody>
    <tr><td>Load Testing</td><td>Check how the system performs under expected user load</td></tr>
    <tr><td>Stress Testing</td><td>Test system under extreme load to find its breaking point</td></tr>
    <tr><td>Spike Testing</td><td>Evaluate system reaction to sudden spikes in traffic</td></tr>
    <tr><td>Endurance Testing</td><td>Check stability and performance over a prolonged period (soak test)</td></tr>
    <tr><td>Scalability Testing</td><td>Measure system’s ability to scale up or down efficiently</td></tr>
    <tr><td>Volume Testing</td><td>Assess performance with a large volume of data (e.g., millions of records)</td></tr>
  </tbody>
</table>

<p><strong>📈 Key Performance Metrics</strong></p>
<table className="table table-bordered">
  <thead>
    <tr><th>Metric</th><th>What It Measures</th></tr>
  </thead>
  <tbody>
    <tr><td>Response Time</td><td>Time taken to respond to a request</td></tr>
    <tr><td>Throughput</td><td>Number of transactions handled per second/minute</td></tr>
    <tr><td>Concurrent Users</td><td>Number of users accessing the app at once</td></tr>
    <tr><td>Latency</td><td>Delay between request and response</td></tr>
    <tr><td>Error Rate</td><td>Percentage of failed requests</td></tr>
    <tr><td>CPU/Memory Utilisation</td><td>System resource consumption under load</td></tr>
  </tbody>
</table>

<p><strong>🧰 Popular Performance Testing Tools</strong></p>
<table className="table table-bordered">
  <thead>
    <tr><th>Tool</th><th>Use Case</th><th>Protocol Support</th></tr>
  </thead>
  <tbody>
    <tr><td>JMeter</td><td>Open-source load testing tool</td><td>Web, FTP, SOAP, REST, JDBC</td></tr>
    <tr><td>LoadRunner</td><td>Enterprise-grade performance testing</td><td>Web, mobile, Citrix, SAP, etc.</td></tr>
    <tr><td>Gatling</td><td>Developer-friendly load testing</td><td>HTTP, WebSockets</td></tr>
    <tr><td>Locust</td><td>Python-based performance testing</td><td>HTTP</td></tr>
    <tr><td>k6</td><td>Modern, scriptable load testing tool</td><td>HTTP, WebSockets</td></tr>
    <tr><td>BlazeMeter</td><td>Cloud-based performance testing</td><td>Compatible with JMeter, Gatling</td></tr>
    <tr><td>Artillery</td><td>Lightweight CLI tool for Node.js apps</td><td>HTTP, WebSocket, socket.io</td></tr>
  </tbody>
</table>

<p><strong>📝 Sample JMeter Scenario: Login Load Test</strong></p>
<ul>
  <li>Simulate 500 users logging in within 5 minutes.</li>
  <li>Use CSV data for user credentials.</li>
  <li>Measure response time, failure rate, and server CPU usage.</li>
</ul>

<p><strong>🧠 Common Bottlenecks Identified</strong></p>
<ul>
  <li>Slow database queries</li>
  <li>Memory leaks</li>
  <li>Improper caching</li>
  <li>Backend service latency</li>
  <li>Thread/contention issues</li>
  <li>Misconfigured load balancers</li>
</ul>

<p><strong>✅ When to Perform Performance Testing</strong></p>
<ul>
  <li>Before major product releases</li>
  <li>After infrastructure changes (e.g., server migration)</li>
  <li>When introducing new features with high traffic potential</li>
  <li>Periodically, as part of CI/CD pipelines</li>
</ul>

<p><strong>📋 Best Practices</strong></p>
<ul>
  <li>Start with realistic test scenarios</li>
  <li>Incrementally increase load</li>
  <li>Monitor end-to-end (app, server, DB, network)</li>
  <li>Automate performance tests in CI/CD</li>
  <li>Document baseline performance and goals</li>
</ul>
</section>

<section className="mb-5">
  <h2 id="resources" className="mt-5">📚 Helpful Resources</h2>
  <ul>
    <li><a href="https://www.guru99.com/manual-testing.html" target="_blank" rel="noopener noreferrer">Manual Testing Guide – Guru99</a></li>
    <li><a href="https://www.selenium.dev/documentation/" target="_blank" rel="noopener noreferrer">Selenium Documentation</a></li>
    <li><a href="https://www.postman.com/" target="_blank" rel="noopener noreferrer">Postman API Testing Tool</a></li>
    <li><a href="https://junit.org/junit5/" target="_blank" rel="noopener noreferrer">JUnit Testing Framework</a></li>
    <li><a href="https://www.cypress.io/" target="_blank" rel="noopener noreferrer">Cypress – End-to-End Testing</a></li>
    <li><a href="https://owasp.org/www-project-top-ten/" target="_blank" rel="noopener noreferrer">OWASP Top 10 Security Risks</a></li>
    <li><a href="https://testautomationu.applitools.com/" target="_blank" rel="noopener noreferrer">Test Automation University – Free Courses</a></li>
  </ul>
</section>

                {/* <section className="mb-5">
                    <h2 id="test-cases" className="mt-5">📝 Download Beginner-Friendly Test Cases</h2>
                    <p>Click each button to download a detailed, beginner-friendly test case for a specific functionality.</p>
                    <div className="row">
                        {[...Array(10)].map((_, i) => (
                            <div className="col-md-6 mb-2" key={i}>
                                <button className="btn btn-outline-primary w-100" onClick={() => downloadTC(i + 1)}>
                                    ${testCases[i + 1][1]}
                                </button>
                            </div>
                        ))}
                    </div>
                </section> */}
            </main>
        </div>
    );
};

export default withFooter(QualityAssuranceKnowledgePage);
