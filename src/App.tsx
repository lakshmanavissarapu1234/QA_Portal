import { useState } from "react";
import {
  FileText,
  Bot,
  Settings,
  User,
  Sun,
  Moon,
  Sparkles,
  Code2,
  ClipboardList,
  LayoutDashboard,
  PlugZap,
  MoreVertical,
} from "lucide-react";

import "./App.css";

type Page = "dashboard" | "generator" | "api" | "automation";

function App() {
  const [activePage, setActivePage] = useState<Page>("dashboard");
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={darkMode ? "app dark" : "app light"}>
      {/* =========================
          SIDEBAR
      ========================= */}
      <aside className="sidebar">

        {/* LOGO */}
        <div className="sidebar-top">
          <div className="brand">
            <div className="brand-icon">
              <Sparkles size={22} strokeWidth={2.2} />
            </div>

            <span>QA Portal</span>
          </div>

          {/* NAVIGATION */}            <nav className="navigation">

              <button
                className={`nav-button ${activePage === "dashboard" ? "active" : ""}`}
                onClick={() => setActivePage("dashboard")}
              >
                <LayoutDashboard size={21} />
                <span>Dashboard</span>
              </button>

              <button
                className={`nav-button ${activePage === "generator" ? "active" : ""}`}
                onClick={() => setActivePage("generator")}
              >
                <Sparkles size={21} />
                <span>Generator</span>
              </button>

              <button
                className={`nav-button ${activePage === "api" ? "active" : ""}`}
                onClick={() => setActivePage("api")}
              >
                <PlugZap size={21} />
                <span>API Testing</span>
              </button>

              <button
                className={`nav-button ${activePage === "automation" ? "active" : ""}`}
                onClick={() => setActivePage("automation")}
              >
                <Bot size={21} />
                <span>Automation</span>
              </button>

            </nav>
        </div>

        {/* =========================
            USER - BOTTOM LEFT
        ========================= */}
        <div className="sidebar-bottom">

          <div className="sidebar-user">

            <div className="user-avatar">
              <User size={22} />
            </div>

            <div className="user-info">
              <strong>QA User</strong>
              <span>QA Engineer</span>
            </div>

            <button
              className="theme-button"
              onClick={() => setDarkMode(!darkMode)}
              title={
                darkMode
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
            >
              {darkMode ? (
                <Sun size={19} />
              ) : (
                <Moon size={19} />
              )}
            </button>

          </div>

        </div>
      </aside>

      {/* =========================
          MAIN CONTENT
      ========================= */}
      <main className="main-content">

        {activePage === "dashboard" && <DashboardPage />}

        {activePage === "generator" && <ManualPage />}

        {activePage === "api" && <ApiTestingPage />}

        {activePage === "automation" && <AutomationPage />}

      </main>
    </div>
  );
}

/* =========================================================
   DASHBOARD PAGE
========================================================= */

type SessionStatus = "Pending Review" | "Approved" | "Rejected";

type Session = {
  id: number;
  session: string;
  createdBy: string;
  submitted: string;
  assignedTo: string;
  status: SessionStatus;
};

function DashboardPage() {
  const [dashboardTab, setDashboardTab] = useState<
    "my" | "assigned" | "all"
  >("my");

  const [openActionId, setOpenActionId] = useState<number | null>(null);

  // UI sample data for the Dashboard.
  // This will later be replaced by data returned from the backend/storage.
  const [sessions, setSessions] = useState<Session[]>([
    {
      id: 1,
      session: "User Login",
      createdBy: "QA User",
      submitted: "3 hours ago",
      assignedTo: "John",
      status: "Pending Review",
    },
    {
      id: 2,
      session: "Password Reset",
      createdBy: "QA User",
      submitted: "1 day ago",
      assignedTo: "Sarah",
      status: "Approved",
    },
    {
      id: 3,
      session: "User Registration",
      createdBy: "QA User",
      submitted: "1 week ago",
      assignedTo: "Mike",
      status: "Rejected",
    },
  ]);

  const getSessionsForTab = () => {
    if (dashboardTab === "my") {
      return sessions.filter((item) => item.createdBy === "QA User");
    }

    if (dashboardTab === "assigned") {
      return sessions.filter((item) => item.assignedTo === "QA User");
    }

    return sessions;
  };

  const visibleSessions = getSessionsForTab();

  const handleAction = (action: string, item: Session) => {
    setOpenActionId(null);

    if (action === "Delete") {
      setSessions((current) =>
        current.filter((session) => session.id !== item.id)
      );
      return;
    }

    // Temporary UI actions. Backend behavior will be connected later.
    console.log(`${action} selected for ${item.session}`);
  };

  return (
    <section className="page">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Manage test case sessions and review workflow.</p>
      </div>

      {/* DASHBOARD SUB TABS - SINGLE ROW */}
      <div className="dashboard-tabs">
        <button
          className={`dashboard-tab ${dashboardTab === "my" ? "active" : ""}`}
          onClick={() => {
            setDashboardTab("my");
            setOpenActionId(null);
          }}
        >
          My Sessions
        </button>

        <button
          className={`dashboard-tab ${
            dashboardTab === "assigned" ? "active" : ""
          }`}
          onClick={() => {
            setDashboardTab("assigned");
            setOpenActionId(null);
          }}
        >
          Assigned for Review
        </button>

        <button
          className={`dashboard-tab ${
            dashboardTab === "all" ? "active" : ""
          }`}
          onClick={() => {
            setDashboardTab("all");
            setOpenActionId(null);
          }}
        >
          All Sessions
        </button>
      </div>

      {/* SESSION TABLE */}
      <div className="sessions-panel">
        <div className="sessions-panel-header">
          <div>
            <h2>
              {dashboardTab === "my"
                ? "My Sessions"
                : dashboardTab === "assigned"
                  ? "Assigned for Review"
                  : "All Sessions"}
            </h2>
            <span>
              {visibleSessions.length}{" "}
              {visibleSessions.length === 1 ? "session" : "sessions"}
            </span>
          </div>
        </div>

        {visibleSessions.length === 0 ? (
          <div className="sessions-empty">
            <FileText size={34} />
            <h3>No sessions found</h3>
            <p>
              {dashboardTab === "assigned"
                ? "Sessions assigned to you for review will appear here."
                : "Submitted test case sessions will appear here."}
            </p>
          </div>
        ) : (
          <div className="sessions-table-wrapper">
            <table className="sessions-table">
              <thead>
                <tr>
                  <th>Session</th>
                  <th>Created By</th>
                  <th>Submitted</th>
                  <th>Assigned To</th>
                  <th>Status</th>
                  <th className="actions-column">Actions</th>
                </tr>
              </thead>

              <tbody>
                {visibleSessions.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <button
                        className="session-name"
                        onClick={() => handleAction("View", item)}
                      >
                        {item.session}
                      </button>
                    </td>

                    <td>{item.createdBy}</td>

                    <td className="submitted-time">{item.submitted}</td>

                    <td>{item.assignedTo}</td>

                    <td>
                      <span
                        className={`status-badge ${
                          item.status === "Pending Review"
                            ? "pending"
                            : item.status === "Approved"
                              ? "approved"
                              : "rejected"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="actions-cell">
                      <button
                        className="action-menu-button"
                        aria-label={`Actions for ${item.session}`}
                        onClick={() =>
                          setOpenActionId(
                            openActionId === item.id ? null : item.id
                          )
                        }
                      >
                        <MoreVertical size={18} />
                      </button>

                      {openActionId === item.id && (
                        <div className="action-menu">
                          <button onClick={() => handleAction("View", item)}>
                            View
                          </button>

                          {item.status !== "Approved" && (
                            <button onClick={() => handleAction("Assign", item)}>
                              Assign
                            </button>
                          )}

                          {item.status === "Approved" && (
                            <>
                              <button
                                onClick={() =>
                                  handleAction("Push to Storage", item)
                                }
                              >
                                Push to Storage
                              </button>
                              <button
                                onClick={() => handleAction("Automate", item)}
                              >
                                Automate
                              </button>
                            </>
                          )}

                          <button
                            className="danger-action"
                            onClick={() => handleAction("Delete", item)}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

/* =========================================================
   API TESTING PAGE
========================================================= */

function ApiTestingPage() {
  return (
    <section className="page">
      <div className="page-header">
        <h1>API Testing</h1>
        <p>Generate and manage API test cases.</p>
      </div>

      <div className="source-panel api-placeholder">
        <div className="source-panel-title">API Testing</div>
        <div className="api-coming-soon">
          <PlugZap size={42} />
          <h3>API Testing</h3>
          <p>
            This tab is ready for the API testing workflow.
            We will design it separately without changing the existing
            Generator or Automation functionality.
          </p>
        </div>
      </div>
    </section>
  );
}


/* =========================================================
   MANUAL PAGE
========================================================= */

function ManualPage() {
  const [source, setSource] = useState("Jira");
  const [outputFormat, setOutputFormat] = useState("Normal");

  const [positive, setPositive] = useState(true);
  const [negative, setNegative] = useState(false);
  const [edge, setEdge] = useState(false);

  const [jiraId, setJiraId] = useState("");
  const [jiraFetched, setJiraFetched] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [acceptanceCriteria, setAcceptanceCriteria] = useState("");

  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [generated, setGenerated] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generationError, setGenerationError] = useState("");

  const fetchJiraStory = () => {
    if (!jiraId.trim()) {
      alert("Please enter a Jira Issue ID.");
      return;
    }

    // UI-only mock data for now.
    // Real Jira API integration will be added later.
    setTitle(`Sample user story for ${jiraId.trim()}`);
    setDescription(
      "The user should be able to complete the requested functionality successfully."
    );
    setAcceptanceCriteria(
      "1. The user can complete the required action.\n2. Valid input is accepted.\n3. Appropriate validation is displayed for invalid input."
    );
    setJiraFetched(true);
    setGenerated(false);
  };

  const handleSourceChange = (nextSource: string) => {
    setSource(nextSource);
    setGenerated(false);
    setGenerationError("");
    setGenerating(false);

    if (nextSource === "Jira") {
      setJiraFetched(false);
    }
  };

  const generateTestCases = async () => {
    if (generating) return;

    if (source === "Jira" && !jiraFetched) {
      alert("Please fetch the Jira user story first.");
      return;
    }

    if (source === "Manual") {
      if (!title.trim() || !description.trim() || !acceptanceCriteria.trim()) {
        alert("Please enter Title, Description and Acceptance Criteria.");
        return;
      }
    }

    if (source === "Document" && !documentFile) {
      alert("Please upload a requirement document.");
      return;
    }

    setGenerating(true);
    setGenerated(false);
    setGenerationError("");

    try {
      /*
       * Temporary generation simulation.
       * Replace this block with the real backend fetch() when
       * the manual test-case API is connected.
       */
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setGenerated(true);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while generating test cases.";

      setGenerated(false);
      setGenerationError(message);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <section className="page">
      <div className="page-header">
        <h1>Generator</h1>
        <p>Generate test cases from your requirements.</p>
      </div>

      {/* OPTIONS */}
      <div className="options-card">
        {/* SOURCE */}
        <div className="option-section">
          <label>Source</label>

          <div className="segment-group">
            <button
              className={`segment-button ${source === "Jira" ? "active" : ""}`}
              onClick={() => handleSourceChange("Jira")}
            >
              <ClipboardList size={17} />
              Jira
            </button>

            <button
              className={`segment-button ${source === "Manual" ? "active" : ""}`}
              onClick={() => handleSourceChange("Manual")}
            >
              <FileText size={17} />
              Manual
            </button>

            <button
              className={`segment-button ${source === "Document" ? "active" : ""}`}
              onClick={() => handleSourceChange("Document")}
            >
              <FileText size={17} />
              Document
            </button>
          </div>
        </div>

        {/* OUTPUT FORMAT */}
        <div className="option-section output-section">
          <label>Output Format</label>

          <div className="segment-group">
            <button
              className={`segment-button ${outputFormat === "Normal" ? "active" : ""}`}
              onClick={() => setOutputFormat("Normal")}
            >
              <FileText size={17} />
              Normal
            </button>

            <button
              className={`segment-button ${outputFormat === "Gherkin" ? "active" : ""}`}
              onClick={() => setOutputFormat("Gherkin")}
            >
              <Code2 size={17} />
              Gherkin
            </button>

            <button
              className={`segment-button ${outputFormat === "Excel" ? "active" : ""}`}
              onClick={() => setOutputFormat("Excel")}
            >
              <FileText size={17} />
              Excel
            </button>
          </div>
        </div>

        {/* TEST TYPE */}
        <div className="option-section test-type-section">
          <label>Test Type</label>

          <div className="checkbox-group">
            <label className="checkbox-option">
              <input
                type="checkbox"
                checked={positive}
                onChange={(e) => setPositive(e.target.checked)}
              />
              <span>Positive</span>
            </label>

            <label className="checkbox-option">
              <input
                type="checkbox"
                checked={negative}
                onChange={(e) => setNegative(e.target.checked)}
              />
              <span>Negative</span>
            </label>

            <label className="checkbox-option">
              <input
                type="checkbox"
                checked={edge}
                onChange={(e) => setEdge(e.target.checked)}
              />
              <span>Edge</span>
            </label>
          </div>
        </div>
      </div>

      {/* SOURCE-SPECIFIC INPUT */}
      <div className="source-input-area">

        {source === "Jira" && (
          <div className="source-panel">
            <div className="source-panel-title">Jira User Story</div>

            <div className="jira-fetch-row">
              <div className="source-field jira-id-field">
                <label>Jira Issue ID</label>
                <input
                  type="text"
                  value={jiraId}
                  onChange={(e) => setJiraId(e.target.value)}
                  placeholder="e.g. PROJ-123"
                />
              </div>

              <button className="fetch-button" onClick={fetchJiraStory}>
                Fetch
              </button>
            </div>

            {jiraFetched && (
              <div className="story-details">
                <div className="source-field">
                  <label>Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="source-field">
                  <label>Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="source-field">
                  <label>Acceptance Criteria</label>
                  <textarea
                    value={acceptanceCriteria}
                    onChange={(e) => setAcceptanceCriteria(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {source === "Manual" && (
          <div className="source-panel">
            <div className="source-panel-title">User Story</div>

            <div className="story-details">
              <div className="source-field">
                <label>Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter the user story title..."
                />
              </div>

              <div className="source-field">
                <label>Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter the user story description..."
                />
              </div>

              <div className="source-field">
                <label>Acceptance Criteria</label>
                <textarea
                  value={acceptanceCriteria}
                  onChange={(e) => setAcceptanceCriteria(e.target.value)}
                  placeholder="Enter the acceptance criteria..."
                />
              </div>
            </div>
          </div>
        )}

        {source === "Document" && (
          <div className="source-panel">
            <div className="source-panel-title">User Story Document</div>

            <label className="document-upload-box">
              <input
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                onChange={(e) => {
                  setDocumentFile(e.target.files?.[0] ?? null);
                  setGenerated(false);
                }}
              />

              <FileText size={34} className="upload-icon" />

              <strong>
                {documentFile
                  ? documentFile.name
                  : "Upload Requirement Document"}
              </strong>

              <span>
                {documentFile
                  ? "File selected successfully"
                  : "Drag & drop your document here or click to browse"}
              </span>

              <small>PDF, DOC, DOCX or TXT</small>
            </label>
          </div>
        )}
      </div>

      {/* GENERATE */}
      <button
        className={`generate-button ${generating ? "generating" : ""}`}
        onClick={generateTestCases}
        disabled={generating}
      >
        <Sparkles size={20} className={generating ? "generating-icon" : ""} />
        {generating ? "Generating test cases..." : "Generate Test Cases"}
      </button>

      {/* GENERATED - ALWAYS BELOW GENERATE BUTTON */}
      <div className="generated-section">
        <label>Generated Test Cases</label>

        <div className="output-box">
          <FileText className="document-icon" size={40} />

          {generationError ? (
            <>
              <h3 className="generation-error-title">Unable to generate test cases</h3>
              <p className="generation-error-message">{generationError}</p>
            </>
          ) : !generated ? (
            <>
              <h3>No test cases generated yet</h3>
              <p>
                Complete the selected source details and click Generate Test Cases.
              </p>
            </>
          ) : (
            <>
              <h3>Test cases generated successfully</h3>
              <p>
                {outputFormat} test cases will appear here.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   AUTOMATION PAGE
========================================================= */

function AutomationPage() {
  const [source, setSource] = useState("Jira");

  const [framework, setFramework] = useState("Playwright");
  const [language, setLanguage] = useState("TypeScript");

  const [pom, setPom] = useState(true);
  const [spec, setSpec] = useState(true);
  const [json, setJson] = useState(true);

  // Jira
  const [jiraId, setJiraId] = useState("");
  const [jiraFetched, setJiraFetched] = useState(false);

  // Automation Test Case details
  const [testCaseTitle, setTestCaseTitle] = useState("");
  const [testSteps, setTestSteps] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  // Document
  const [documentFile, setDocumentFile] = useState<File | null>(null);

  const [generated, setGenerated] = useState(false);

  const frameworks = [
    "Playwright",
    "Selenium",
    "Cypress",
  ];

  const languages = [
    "TypeScript",
    "JavaScript",
    "Python",
    "Java",
  ];

  // ---------------------------------------------
  // FETCH JIRA TEST CASE
  // ---------------------------------------------
  const fetchJiraTestCase = () => {
    if (!jiraId.trim()) {
      alert("Please enter a Jira Issue ID.");
      return;
    }

    // Temporary UI mock.
    // Real Jira API will be connected through backend later.
    setTestCaseTitle(`Sample test case for ${jiraId.trim()}`);

    setTestSteps(
      "1. Open the application.\n" +
      "2. Enter the required information.\n" +
      "3. Click Submit."
    );

    setAdditionalInfo(
      "Verify that the expected result is displayed successfully."
    );

    setJiraFetched(true);
    setGenerated(false);
  };

  // ---------------------------------------------
  // CHANGE SOURCE
  // ---------------------------------------------
  const handleSourceChange = (nextSource: string) => {
    setSource(nextSource);
    setGenerated(false);

    // Clear source-specific data
    setJiraFetched(false);
    setJiraId("");
    setTestCaseTitle("");
    setTestSteps("");
    setAdditionalInfo("");
    setDocumentFile(null);
  };

  // ---------------------------------------------
  // GENERATE AUTOMATION CODE
  // ---------------------------------------------
  const generateAutomation = () => {
    if (source === "Jira" && !jiraFetched) {
      alert("Please fetch the Jira test case first.");
      return;
    }

    if (
      source === "Manual" &&
      (!testCaseTitle.trim() ||
        !testSteps.trim() ||
        !additionalInfo.trim())
    ) {
      alert(
        "Please enter Test Case Title, Test Steps and Additional Info."
      );
      return;
    }

    if (source === "Document" && !documentFile) {
      alert("Please upload a test case document.");
      return;
    }

    if (!pom && !spec && !json) {
      alert("Please select at least one output file.");
      return;
    }

    setGenerated(true);
  };

  return (
    <section className="page">

      <div className="page-header">
        <h1>Automation</h1>
        <p>
          Generate automation test scripts from your test cases.
        </p>
      </div>

      {/* AUTOMATION OPTIONS */}
      <div className="automation-options-card">

        {/* SOURCE */}
        <div className="automation-option">
          <label>Source</label>

          <div className="segment-group">
            <button
              className={`segment-button ${
                source === "Jira" ? "active" : ""
              }`}
              onClick={() => handleSourceChange("Jira")}
            >
              <ClipboardList size={17} />
              Jira
            </button>

            <button
              className={`segment-button ${
                source === "Manual" ? "active" : ""
              }`}
              onClick={() => handleSourceChange("Manual")}
            >
              <FileText size={17} />
              Manual
            </button>

            <button
              className={`segment-button ${
                source === "Document" ? "active" : ""
              }`}
              onClick={() => handleSourceChange("Document")}
            >
              <FileText size={17} />
              Document
            </button>
          </div>
        </div>

        {/* FRAMEWORK */}
        <div className="automation-option">
          <label>Framework</label>

          <div className="select-wrapper">
            <select
              value={framework}
              onChange={(e) => setFramework(e.target.value)}
            >
              {frameworks.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* LANGUAGE */}
        <div className="automation-option">
          <label>Language</label>

          <div className="select-wrapper">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              {languages.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* OUTPUT */}
        <div className="automation-option">
          <label>Output File</label>

          <div className="automation-checkboxes">
            <label className="checkbox-option">
              <input
                type="checkbox"
                checked={pom}
                onChange={(e) => setPom(e.target.checked)}
              />
              <span>POM File</span>
            </label>

            <label className="checkbox-option">
              <input
                type="checkbox"
                checked={spec}
                onChange={(e) => setSpec(e.target.checked)}
              />
              <span>Spec File</span>
            </label>

            <label className="checkbox-option">
              <input
                type="checkbox"
                checked={json}
                onChange={(e) => setJson(e.target.checked)}
              />
              <span>JSON File</span>
            </label>
          </div>
        </div>
      </div>

      {/* SOURCE-SPECIFIC CONTENT */}
      <div className="source-input-area">

        {/* JIRA */}
        {source === "Jira" && (
          <div className="source-panel">
            <div className="source-panel-title">
              Jira Test Case
            </div>

            <div className="jira-fetch-row">
              <div className="source-field jira-id-field">
                <label>Jira Issue ID</label>

                <input
                  type="text"
                  value={jiraId}
                  onChange={(e) => setJiraId(e.target.value)}
                  placeholder="e.g. PROJ-123"
                />
              </div>

              <button
                className="fetch-button"
                onClick={fetchJiraTestCase}
              >
                Fetch
              </button>
            </div>

            {jiraFetched && (
              <div className="story-details">

                <div className="source-field">
                  <label>Test Case Title</label>

                  <input
                    type="text"
                    value={testCaseTitle}
                    onChange={(e) =>
                      setTestCaseTitle(e.target.value)
                    }
                  />
                </div>

                <div className="source-field">
                  <label>Test Steps</label>

                  <textarea
                    value={testSteps}
                    onChange={(e) =>
                      setTestSteps(e.target.value)
                    }
                  />
                </div>

                <div className="source-field">
                  <label>Additional Info</label>

                  <textarea
                    value={additionalInfo}
                    onChange={(e) =>
                      setAdditionalInfo(e.target.value)
                    }
                  />
                </div>

              </div>
            )}
          </div>
        )}

        {/* MANUAL */}
        {source === "Manual" && (
          <div className="source-panel">

            <div className="source-panel-title">
              Test Case
            </div>

            <div className="story-details">

              <div className="source-field">
                <label>Test Case Title</label>

                <input
                  type="text"
                  value={testCaseTitle}
                  onChange={(e) =>
                    setTestCaseTitle(e.target.value)
                  }
                  placeholder="Enter the test case title..."
                />
              </div>

              <div className="source-field">
                <label>Test Steps</label>

                <textarea
                  value={testSteps}
                  onChange={(e) =>
                    setTestSteps(e.target.value)
                  }
                  placeholder="Enter the test steps..."
                />
              </div>

              <div className="source-field">
                <label>Additional Info</label>

                <textarea
                  value={additionalInfo}
                  onChange={(e) =>
                    setAdditionalInfo(e.target.value)
                  }
                  placeholder="Enter any additional information..."
                />
              </div>

            </div>
          </div>
        )}

        {/* DOCUMENT */}
        {source === "Document" && (
          <div className="source-panel">

            <div className="source-panel-title">
              Test Case Document
            </div>

            <label className="document-upload-box">

              <input
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                onChange={(e) => {
                  setDocumentFile(
                    e.target.files?.[0] ?? null
                  );
                  setGenerated(false);
                }}
              />

              <FileText
                size={34}
                className="upload-icon"
              />

              <strong>
                {documentFile
                  ? documentFile.name
                  : "Upload Test Case Document"}
              </strong>

              <span>
                {documentFile
                  ? "File selected successfully"
                  : "Drag & drop your document here or click to browse"}
              </span>

              <small>
                PDF, DOC, DOCX or TXT
              </small>

            </label>
          </div>
        )}

      </div>

      {/* GENERATE AUTOMATION CODE */}
      <button
        className="generate-button"
        onClick={generateAutomation}
      >
        <Code2 size={21} />
        Generate Automation Code
      </button>

      {/* GENERATED AUTOMATION CODE */}
      <div className="generated-section">

        <label>Generated Automation Code</label>

        <div className="output-box automation-output-box">

          <Code2
            className="document-icon"
            size={42}
          />

          {!generated ? (
            <>
              <h3>
                No automation code generated yet
              </h3>

              <p>
                Complete the selected test case details and
                click Generate Automation Code.
              </p>
            </>
          ) : (
            <>
              <h3>
                Automation code generated successfully
              </h3>

              <p>
                {framework} · {language}
              </p>

              <p className="generated-details">
                {pom ? "POM " : ""}
                {spec ? "Spec " : ""}
                {json ? "JSON" : ""}
              </p>
            </>
          )}

        </div>
      </div>

    </section>
  );
}


export default App;