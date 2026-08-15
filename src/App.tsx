import { Fragment, useState } from "react";
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
  ChevronRight,
  ChevronDown,
  X,
  ExternalLink,
} from "lucide-react";

import "./App.css";

type Page = "dashboard" | "generator" | "api" | "automation" | "settings";

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

              <button
                className={`nav-button ${activePage === "settings" ? "active" : ""}`}
                onClick={() => setActivePage("settings")}
              >
                <Settings size={21} />
                <span>Settings</span>
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

        {activePage === "settings" && <SettingsPage />}

      </main>
    </div>
  );
}

/* =========================================================
   SETTINGS PAGE
========================================================= */

function SettingsPage() {
  return (
    <section className="page">
      <div className="page-header">
        <h1>Settings</h1>
        <p>Manage your QA Portal configuration and integrations.</p>
      </div>

      <div className="settings-card">
        <div className="settings-card-icon">
          <Settings size={21} />
        </div>

        <div className="settings-card-content">
          <h2>Extension Integration</h2>
          <p>
            Connect the AI Code Assist extension to the QA Portal.
            Extension integration details will be configured here.
          </p>

          <div className="settings-coming-soon">
            Extension Integration
            <span>Coming next</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   DASHBOARD PAGE
========================================================= */

type SessionStatus = "Pending Review" | "Approved" | "Rejected";

type DashboardTestCase = {
  id: string;
  title: string;
};

type Session = {
  id: number;
  session: string;
  createdBy: string;
  submitted: string;
  assignedTo: string;
  status: SessionStatus;
  testCases: DashboardTestCase[];
};

function DashboardPage() {
  const [dashboardTab, setDashboardTab] = useState<
    "my" | "assigned" | "all"
  >("my");

  const [openActionId, setOpenActionId] = useState<number | null>(null);
  const [expandedSessionIds, setExpandedSessionIds] = useState<number[]>([]);

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
      testCases: [
        { id: "TC001", title: "Verify valid user login" },
        { id: "TC002", title: "Verify login with invalid credentials" },
        { id: "TC003", title: "Verify login with empty credentials" },
      ],
    },
    {
      id: 2,
      session: "Password Reset",
      createdBy: "QA User",
      submitted: "1 day ago",
      assignedTo: "Sarah",
      status: "Approved",
      testCases: [
        { id: "TC004", title: "Reset password with valid email" },
        { id: "TC005", title: "Reset password with invalid email" },
      ],
    },
    {
      id: 3,
      session: "User Registration",
      createdBy: "QA User",
      submitted: "1 week ago",
      assignedTo: "Mike",
      status: "Rejected",
      testCases: [
        { id: "TC006", title: "Register with valid details" },
        { id: "TC007", title: "Register with existing email" },
        { id: "TC008", title: "Register with missing required fields" },
      ],
    },
  ]);

  const toggleSessionExpansion = (sessionId: number) => {
    setExpandedSessionIds((current) =>
      current.includes(sessionId)
        ? current.filter((id) => id !== sessionId)
        : [...current, sessionId]
    );
  };

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
            setExpandedSessionIds([]);
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
            setExpandedSessionIds([]);
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
            setExpandedSessionIds([]);
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
                {visibleSessions.map((item) => {
                  const expanded = expandedSessionIds.includes(item.id);

                  return (
                    <Fragment key={item.id}>
                      <tr
                        className={`session-main-row ${
                          expanded ? "expanded" : ""
                        }`}
                      >
                        <td>
                          <div className="session-name-cell">
                            <button
                              className="session-expand-button dashboard-expand-button"
                              onClick={() => toggleSessionExpansion(item.id)}
                              aria-label={`${
                                expanded ? "Collapse" : "Expand"
                              } ${item.session}`}
                              title={expanded ? "Collapse test cases" : "Show test cases"}
                            >
                              {expanded ? (
                                <ChevronDown size={16} />
                              ) : (
                                <ChevronRight size={16} />
                              )}
                            </button>

                            <button
                              className="session-name"
                              onClick={() => toggleSessionExpansion(item.id)}
                            >
                              {item.session}
                            </button>
                          </div>
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
                                <button
                                  onClick={() => handleAction("Assign", item)}
                                >
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
                                    onClick={() =>
                                      handleAction("Automate", item)
                                    }
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

                      {expanded && (
                        <tr
                          className="session-testcases-row"
                          key={`${item.id}-details`}
                        >
                          <td colSpan={6}>
                            <div className="session-testcases-container">
                              <div className="session-testcases-header">
                                <div>
                                  <strong>Test Cases</strong>
                                  <span>
                                    {item.testCases.length}{" "}
                                    {item.testCases.length === 1
                                      ? "test case"
                                      : "test cases"}
                                  </span>
                                </div>
                              </div>

                              <div className="session-testcases-list">
                                {item.testCases.map((testCase, index) => (
                                  <div
                                    className="session-testcase-item"
                                    key={testCase.id}
                                  >
                                    <span className="session-testcase-number">
                                      {String(index + 1).padStart(2, "0")}
                                    </span>

                                    <span className="session-testcase-id">
                                      {testCase.id}
                                    </span>

                                    <span className="session-testcase-title">
                                      {testCase.title}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })}
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

type ApiSource = "Jira" | "Manual" | "Document" | "Swagger/OpenAPI";
type ApiOutputFormat = "Normal" | "Gherkin" | "JSON";

function ApiTestingPage() {
  const [source, setSource] = useState<ApiSource>("Jira");
  const [outputFormat, setOutputFormat] =
    useState<ApiOutputFormat>("Normal");

  const [positive, setPositive] = useState(true);
  const [negative, setNegative] = useState(false);
  const [boundary, setBoundary] = useState(false);

  // Manual API user story
  const [apiTitle, setApiTitle] = useState("");
  const [apiDescription, setApiDescription] = useState("");
  const [apiAcceptanceCriteria, setApiAcceptanceCriteria] = useState("");

  // Jira
  const [jiraId, setJiraId] = useState("");
  const [jiraFetched, setJiraFetched] = useState(false);

  // Manual API
  const [method, setMethod] = useState("POST");
  const [endpoint, setEndpoint] = useState("");
  const [requestHeaders, setRequestHeaders] = useState("");
  const [queryParameters, setQueryParameters] = useState("");
  const [requestBody, setRequestBody] = useState("");
  const [apiRequirement, setApiRequirement] = useState("");

  // Document / Swagger
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [swaggerFile, setSwaggerFile] = useState<File | null>(null);
  const [swaggerUrl, setSwaggerUrl] = useState("");

  const [generated, setGenerated] = useState(false);

  const resetSourceData = () => {
    setGenerated(false);
    setJiraFetched(false);
    setJiraId("");
    setRequestHeaders("");
    setQueryParameters("");
    setRequestBody("");
    setApiRequirement("");
    setApiTitle("");
    setApiDescription("");
    setApiAcceptanceCriteria("");
    setDocumentFile(null);
    setSwaggerFile(null);
    setSwaggerUrl("");
  };

  const handleApiSourceChange = (nextSource: ApiSource) => {
    setSource(nextSource);
    resetSourceData();
  };

  const fetchJiraApiRequirement = () => {
    if (!jiraId.trim()) {
      alert("Please enter a Jira Issue ID.");
      return;
    }

    // UI-only mock. Replace with the real Jira API/backend integration.
    setJiraFetched(true);
    setGenerated(false);
  };

  const loadSwagger = () => {
    if (!swaggerFile && !swaggerUrl.trim()) {
      alert("Upload an OpenAPI JSON/YAML file or enter a Swagger/OpenAPI URL.");
      return;
    }

    // UI-only mock. Replace with the real OpenAPI parser/backend integration.
    setGenerated(false);
    alert("API specification loaded successfully (UI preview).");
  };

  const generateApiTestCases = () => {
    if (source === "Jira" && !jiraFetched) {
      alert("Please fetch the Jira API requirement first.");
      return;
    }

    if (
      source === "Manual" &&
      (!apiTitle.trim() ||
        !apiDescription.trim() ||
        !apiAcceptanceCriteria.trim())
    ) {
      alert("Please enter Title, Description and Acceptance Criteria.");
      return;
    }

    if (source === "Document" && !documentFile) {
      alert("Please upload an API requirement document.");
      return;
    }

    if (source === "Swagger/OpenAPI" && !swaggerFile && !swaggerUrl.trim()) {
      alert("Please upload an OpenAPI file or enter a Swagger/OpenAPI URL.");
      return;
    }

    if (!positive && !negative && !boundary) {
      alert("Please select at least one API Test Type.");
      return;
    }

    setGenerated(true);
  };

  return (
    <section className="page">
      <div className="page-header">
        <h1>API Testing</h1>
        <p>Generate API test cases from requirements and API specifications.</p>
      </div>

      {/* API OPTIONS */}
      <div className="api-options-card">
        <div className="api-option-row">
          {/* SOURCE */}
          <div className="api-option-section api-source-option">
            <label>Source</label>

            <div className="segment-group">
              {(["Jira", "Manual", "Document", "Swagger/OpenAPI"] as ApiSource[]).map(
                (item) => (
                  <button
                    key={item}
                    className={`segment-button ${
                      source === item ? "active" : ""
                    }`}
                    onClick={() => handleApiSourceChange(item)}
                  >
                    {item === "Jira" ? (
                      <ClipboardList size={14} />
                    ) : (
                      <FileText size={14} />
                    )}
                    {item}
                  </button>
                )
              )}
            </div>
          </div>

          {/* OUTPUT FORMAT */}
          <div className="api-option-section">
            <label>Output Format</label>

            <div className="segment-group compact-segment-group">
              {(["Normal", "Gherkin", "JSON"] as ApiOutputFormat[]).map(
                (item) => (
                  <button
                    key={item}
                    className={`segment-button ${
                      outputFormat === item ? "active" : ""
                    }`}
                    onClick={() => setOutputFormat(item)}
                  >
                    {item === "JSON" ? <Code2 size={14} /> : <FileText size={14} />}
                    {item}
                  </button>
                )
              )}
            </div>
          </div>

          {/* TEST TYPE */}
          <div className="api-option-section api-test-type-section">
            <label>API Test Type</label>

            <div className="api-checkbox-group">
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
                  checked={boundary}
                  onChange={(e) => setBoundary(e.target.checked)}
                />
                <span>Boundary</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* SOURCE-SPECIFIC INPUT */}
      <div className="api-source-area">

        {/* JIRA */}
        {source === "Jira" && (
          <div className="source-panel">
            <div className="source-panel-title">Jira API Requirement</div>

            <div className="jira-fetch-row">
              <div className="source-field api-jira-id-field">
                <label>Jira Issue ID</label>
                <input
                  type="text"
                  value={jiraId}
                  onChange={(e) => setJiraId(e.target.value)}
                  placeholder="e.g. API-123"
                />
              </div>

              <button
                className="fetch-button"
                onClick={fetchJiraApiRequirement}
              >
                Fetch
              </button>
            </div>

            {jiraFetched && (
              <div className="api-requirement-preview">
                <div className="api-preview-status">✓ Requirement fetched successfully</div>
                <p>
                  The backend will extract the API method, endpoint, request
                  details, response expectations and acceptance criteria from
                  the Jira issue.
                </p>
              </div>
            )}
          </div>
        )}

        {/* MANUAL */}
        {source === "Manual" && (
          <div className="source-panel">
            <div className="source-panel-title">API User Story</div>

            <div className="api-user-story-grid">
              <div className="source-field api-full-field">
                <label>Title</label>
                <input
                  type="text"
                  value={apiTitle}
                  onChange={(e) => setApiTitle(e.target.value)}
                  placeholder="Enter the API user story title..."
                />
              </div>

              <div className="source-field">
                <label>Description</label>
                <textarea
                  value={apiDescription}
                  onChange={(e) => setApiDescription(e.target.value)}
                  placeholder="Describe the API requirement and expected behavior..."
                />
              </div>

              <div className="source-field">
                <label>Acceptance Criteria</label>
                <textarea
                  value={apiAcceptanceCriteria}
                  onChange={(e) => setApiAcceptanceCriteria(e.target.value)}
                  placeholder="Enter the acceptance criteria for the API..."
                />
              </div>
            </div>
          </div>
        )}

        {/* DOCUMENT */}
        {source === "Document" && (
          <div className="source-panel">
            <div className="source-panel-title">API Requirement Document</div>

            <label className="document-upload-box api-upload-box">
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
                  : "Upload API Requirement Document"}
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

        {/* SWAGGER / OPENAPI */}
        {source === "Swagger/OpenAPI" && (
          <div className="source-panel">
            <div className="source-panel-title">Swagger / OpenAPI Specification</div>

            <div className="swagger-input-grid">
              <label className="swagger-upload-card">
                <input
                  type="file"
                  accept=".json,.yaml,.yml"
                  onChange={(e) => {
                    setSwaggerFile(e.target.files?.[0] ?? null);
                    setGenerated(false);
                  }}
                />
                <FileText size={28} />
                <strong>
                  {swaggerFile ? swaggerFile.name : "Upload OpenAPI File"}
                </strong>
                <span>JSON, YAML or YML</span>
              </label>

              <div className="swagger-url-card">
                <div className="source-field">
                  <label>Swagger / OpenAPI URL</label>
                  <input
                    type="url"
                    value={swaggerUrl}
                    onChange={(e) => setSwaggerUrl(e.target.value)}
                    placeholder="https://example.com/openapi.json"
                  />
                </div>
                <span className="swagger-or">OR use a URL to the specification</span>
              </div>

              <div className="api-full-field swagger-load-row">
                <button className="fetch-button" onClick={loadSwagger}>
                  Load API Specification
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* GENERATE */}
      <button
        className="generate-button api-generate-button"
        onClick={generateApiTestCases}
      >
        <Sparkles size={20} />
        Generate API Test Cases
      </button>

      {/* GENERATED */}
      <div className="generated-section">
        <label>Generated API Test Cases</label>

        <div className="output-box">
          <FileText className="document-icon" size={40} />

          {!generated ? (
            <>
              <h3>No API test cases generated yet</h3>
              <p>
                Complete the selected source details and click Generate API Test Cases.
              </p>
            </>
          ) : (
            <>
              <h3>API test cases generated successfully</h3>
              <p>{outputFormat} API test cases will appear here.</p>
            </>
          )}
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

  const [expandedGeneratedCases, setExpandedGeneratedCases] =
    useState<string[]>([]);

  const [selectedGeneratedCases, setSelectedGeneratedCases] =
    useState<string[]>([]);

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

  const generatedTestCases = [
    {
      id: "TC001",
      title: "Verify valid user login",
      type: "Positive",
      steps: [
        "Open the login page.",
        "Enter a valid username.",
        "Enter a valid password.",
        "Click the Login button.",
      ],
      expected: "User should be logged in successfully.",
    },
    {
      id: "TC002",
      title: "Verify login with invalid credentials",
      type: "Negative",
      steps: [
        "Open the login page.",
        "Enter an invalid username or password.",
        "Click the Login button.",
      ],
      expected: "An appropriate validation message should be displayed.",
    },
    {
      id: "TC003",
      title: "Verify login with empty credentials",
      type: "Edge",
      steps: [
        "Open the login page.",
        "Leave username and password empty.",
        "Click the Login button.",
      ],
      expected: "Required field validation should be displayed.",
    },
  ];

  const toggleGeneratedCase = (testCaseId: string) => {
    setExpandedGeneratedCases((current) =>
      current.includes(testCaseId)
        ? current.filter((id) => id !== testCaseId)
        : [...current, testCaseId]
    );
  };

  const toggleGeneratedCaseSelection = (testCaseId: string) => {
    setSelectedGeneratedCases((current) =>
      current.includes(testCaseId)
        ? current.filter((id) => id !== testCaseId)
        : [...current, testCaseId]
    );
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

      {/* GENERATED TEST CASES */}
      <div className="generated-section">
        <label>Generated Test Cases</label>

        {!generated && !generationError ? (
          <div className="output-box">
            <FileText className="document-icon" size={40} />
            <h3>No test cases generated yet</h3>
            <p>
              Complete the selected source details and click Generate Test Cases.
            </p>
          </div>
        ) : generationError ? (
          <div className="output-box">
            <FileText className="document-icon" size={40} />
            <h3 className="generation-error-title">
              Unable to generate test cases
            </h3>
            <p className="generation-error-message">
              {generationError}
            </p>
          </div>
        ) : (
          <div className="generated-testcases-panel">
            <div className="generated-testcases-header">
              <div>
                <h3>Test cases generated successfully</h3>
                <span>{selectedGeneratedCases.length} selected</span>
              </div>
              <span className="generated-format-label">
                {outputFormat}
              </span>
            </div>

            <div className="generated-testcases-list">
              {generatedTestCases.map((testCase) => {
                const expanded =
                  expandedGeneratedCases.includes(testCase.id);
                const selected =
                  selectedGeneratedCases.includes(testCase.id);

                return (
                  <div
                    className="generated-testcase-item"
                    key={testCase.id}
                  >
                    <div className="generated-testcase-row">
                      <button
                        className="generated-expand-button"
                        onClick={() =>
                          toggleGeneratedCase(testCase.id)
                        }
                        aria-label={`${expanded ? "Collapse" : "Expand"} ${testCase.id}`}
                      >
                        {expanded ? (
                          <ChevronDown size={17} />
                        ) : (
                          <ChevronRight size={17} />
                        )}
                      </button>

                      <label className="generated-checkbox">
                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={() =>
                            toggleGeneratedCaseSelection(
                              testCase.id
                            )
                          }
                        />
                      </label>

                      <div className="generated-testcase-main">
                        <strong>{testCase.id}</strong>
                        <span>{testCase.title}</span>
                      </div>

                      <span className="generated-testcase-type">
                        {testCase.type}
                      </span>
                    </div>

                    {expanded && (
                      <div className="generated-testcase-details">
                        <div>
                          <strong>Test Steps</strong>
                          <ol>
                            {testCase.steps.map((step, index) => (
                              <li key={index}>{step}</li>
                            ))}
                          </ol>
                        </div>

                        <div className="generated-expected-result">
                          <strong>Expected Result</strong>
                          <p>{testCase.expected}</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

    </section>
  );
}

/* =========================================================
   AUTOMATION PAGE
========================================================= */

function AutomationPage() {
  type AutomationTestCaseStatus = "Not Automated" | "Automated";

  type AutomationTestCase = {
    id: string;
    title: string;
    status: AutomationTestCaseStatus;
  };

  type AutomationSession = {
    id: number;
    session: string;
    createdBy: string;
    submitted: string;
    status: "Approved";
    testCases: AutomationTestCase[];
  };

  const [sessions, setSessions] = useState<AutomationSession[]>([
    {
      id: 1,
      session: "User Login",
      createdBy: "QA User",
      submitted: "3 hours ago",
      status: "Approved",
      testCases: [
        { id: "TC001", title: "Valid Login", status: "Not Automated" },
        { id: "TC002", title: "Invalid Username", status: "Automated" },
        { id: "TC003", title: "Invalid Password", status: "Not Automated" },
        { id: "TC004", title: "Empty Credentials", status: "Not Automated" },
      ],
    },
    {
      id: 2,
      session: "Password Reset",
      createdBy: "QA User",
      submitted: "1 day ago",
      status: "Approved",
      testCases: [
        { id: "TC005", title: "Reset Password with Valid Email", status: "Not Automated" },
        { id: "TC006", title: "Reset Password with Invalid Email", status: "Not Automated" },
      ],
    },
    {
      id: 3,
      session: "User Registration",
      createdBy: "QA User",
      submitted: "1 week ago",
      status: "Approved",
      testCases: [
        { id: "TC007", title: "Register with Valid Details", status: "Not Automated" },
        { id: "TC008", title: "Register with Existing Email", status: "Not Automated" },
      ],
    },
  ]);

  const [expandedSessions, setExpandedSessions] = useState<number[]>([]);
  const [selectedTestCase, setSelectedTestCase] =
    useState<AutomationTestCase | null>(null);
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [automationModalOpen, setAutomationModalOpen] = useState(false);

  const toggleSession = (sessionId: number) => {
    setExpandedSessions((current) =>
      current.includes(sessionId)
        ? current.filter((id) => id !== sessionId)
        : [...current, sessionId]
    );
  };

  const updateTestCaseStatus = (
    sessionId: number,
    testCaseId: string,
    status: AutomationTestCaseStatus
  ) => {
    setSessions((current) =>
      current.map((session) =>
        session.id !== sessionId
          ? session
          : {
              ...session,
              testCases: session.testCases.map((testCase) =>
                testCase.id === testCaseId
                  ? { ...testCase, status }
                  : testCase
              ),
            }
      )
    );
  };

  const openAutomationModal = (testCase: AutomationTestCase) => {
    setSelectedTestCase(testCase);
    setWebsiteUrl("");
    setAutomationModalOpen(true);
  };

  const closeAutomationModal = () => {
    setAutomationModalOpen(false);
    setSelectedTestCase(null);
    setWebsiteUrl("");
  };

  const openWebsite = () => {
    const url = websiteUrl.trim();

    if (!url) {
      alert("Please enter the website URL.");
      return;
    }

    let normalizedUrl = url;

    if (!/^https?:\/\//i.test(normalizedUrl)) {
      normalizedUrl = `https://${normalizedUrl}`;
    }

    window.open(normalizedUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="page">
      <div className="page-header">
        <h1>Automation</h1>
        <p>
          Automate approved test cases using the AI Code Assist extension.
        </p>
      </div>

      <div className="automation-info-card">
        <div className="automation-info-icon">
          <Code2 size={20} />
        </div>

        <div>
          <h3>Approved Test Cases</h3>
          <p>
            Test cases approved in Dashboard are available here. Expand a
            session and automate each test case individually.
          </p>
        </div>
      </div>

      <div className="automation-sessions-panel">
        <div className="automation-sessions-header">
          <div>
            <h2>Automation Sessions</h2>
            <span>{sessions.length} approved sessions</span>
          </div>
        </div>

        <div className="automation-session-list">
          {sessions.map((session) => {
            const expanded = expandedSessions.includes(session.id);

            return (
              <div className="automation-session" key={session.id}>
                <div className="automation-session-row">
                  <button
                    className="session-expand-button"
                    onClick={() => toggleSession(session.id)}
                    aria-label={`${expanded ? "Collapse" : "Expand"} ${session.session}`}
                  >
                    {expanded ? (
                      <ChevronDown size={18} />
                    ) : (
                      <ChevronRight size={18} />
                    )}
                  </button>

                  <div className="automation-session-name">
                    <strong>{session.session}</strong>
                    <span>{session.testCases.length} test cases</span>
                  </div>

                  <div className="automation-session-created-by">
                    {session.createdBy}
                  </div>

                  <div className="automation-session-submitted">
                    {session.submitted}
                  </div>

                  <span className="status-badge approved">
                    {session.status}
                  </span>
                </div>

                {expanded && (
                  <div className="automation-testcases">
                    {session.testCases.map((testCase) => (
                      <div
                        className="automation-testcase-row"
                        key={testCase.id}
                      >
                        <div className="automation-testcase-details">
                          <span className="automation-testcase-id">
                            {testCase.id}
                          </span>
                          <span className="automation-testcase-title">
                            {testCase.title}
                          </span>
                        </div>

                        <select
                          className={`automation-testcase-status ${
                            testCase.status === "Automated"
                              ? "automated"
                              : ""
                          }`}
                          value={testCase.status}
                          onChange={(event) =>
                            updateTestCaseStatus(
                              session.id,
                              testCase.id,
                              event.target.value as AutomationTestCaseStatus
                            )
                          }
                          aria-label={`Status for ${testCase.id}`}
                        >
                          <option value="Not Automated">
                            Not Automated
                          </option>
                          <option value="Automated">
                            Automated
                          </option>
                        </select>

                        <button
                          className="automate-testcase-button"
                          onClick={() => openAutomationModal(testCase)}
                        >
                          <Code2 size={15} />
                          Automate
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {automationModalOpen && selectedTestCase && (
        <div
          className="automation-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeAutomationModal();
            }
          }}
        >
          <div className="automation-modal">
            <div className="automation-modal-header">
              <div>
                <h2>Automate Test Case</h2>
                <p>
                  {selectedTestCase.id} · {selectedTestCase.title}
                </p>
              </div>

              <button
                className="automation-modal-close"
                onClick={closeAutomationModal}
                aria-label="Close"
              >
                <X size={19} />
              </button>
            </div>

            <div className="automation-modal-body">
              <div className="automation-selected-testcase">
                <span>Selected Test Case</span>
                <strong>
                  {selectedTestCase.id} — {selectedTestCase.title}
                </strong>
              </div>

              <div className="source-field">
                <label>Website URL</label>
                <input
                  type="url"
                  value={websiteUrl}
                  onChange={(event) => setWebsiteUrl(event.target.value)}
                  placeholder="https://example.com"
                  autoFocus
                />
              </div>

              <p className="automation-modal-help">
                The website will open in a new window. You can then use the
                AI Code Assist extension to generate the POM and spec for this
                test case.
              </p>
            </div>

            <div className="automation-modal-footer">
              <button
                className="automation-cancel-button"
                onClick={closeAutomationModal}
              >
                Cancel
              </button>

              <button
                className="automation-open-button"
                onClick={openWebsite}
              >
                <ExternalLink size={16} />
                Open Website
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default App;