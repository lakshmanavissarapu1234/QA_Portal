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
} from "lucide-react";

import "./App.css";

type Page = "manual" | "automation" | "settings";

function App() {
  const [activePage, setActivePage] = useState<Page>("manual");
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

          {/* NAVIGATION */}
          <nav className="navigation">

            <button
              className={`nav-button ${
                activePage === "manual" ? "active" : ""
              }`}
              onClick={() => setActivePage("manual")}
            >
              <FileText size={21} />
              <span>Manual</span>
            </button>

            <button
              className={`nav-button ${
                activePage === "automation" ? "active" : ""
              }`}
              onClick={() => setActivePage("automation")}
            >
              <Bot size={21} />
              <span>Automation</span>
            </button>

            <button
              className={`nav-button ${
                activePage === "settings" ? "active" : ""
              }`}
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

        {activePage === "manual" && <ManualPage />}

        {activePage === "automation" && <AutomationPage />}

        {activePage === "settings" && <SettingsPage />}

      </main>
    </div>
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

  const [requirement, setRequirement] = useState("");
  const [generated, setGenerated] = useState(false);

  const generateTestCases = () => {
    if (!requirement.trim()) {
      alert("Please enter a requirement or user story.");
      return;
    }

    setGenerated(true);
  };

  return (
    <section className="page">

      {/* HEADER */}
      <div className="page-header">
        <h1>Manual Test Cases</h1>

        <p>
          Generate manual test cases from your requirements.
        </p>
      </div>

      {/* =========================
          MANUAL OPTIONS
      ========================= */}
      <div className="options-card">

        {/* SOURCE */}
        <div className="option-section">

          <label>Source</label>

          <div className="segment-group">

            <button
              className={`segment-button ${
                source === "Jira" ? "active" : ""
              }`}
              onClick={() => setSource("Jira")}
            >
              <ClipboardList size={17} />
              Jira
            </button>

            <button
              className={`segment-button ${
                source === "Manual" ? "active" : ""
              }`}
              onClick={() => setSource("Manual")}
            >
              <FileText size={17} />
              Manual
            </button>

            <button
              className={`segment-button ${
                source === "Document" ? "active" : ""
              }`}
              onClick={() => setSource("Document")}
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
              className={`segment-button ${
                outputFormat === "Normal" ? "active" : ""
              }`}
              onClick={() => setOutputFormat("Normal")}
            >
              <FileText size={17} />
              Normal
            </button>

            <button
              className={`segment-button ${
                outputFormat === "Gherkin" ? "active" : ""
              }`}
              onClick={() => setOutputFormat("Gherkin")}
            >
              <Code2 size={17} />
              Gherkin
            </button>

            <button
              className={`segment-button ${
                outputFormat === "Excel" ? "active" : ""
              }`}
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
                onChange={(e) =>
                  setPositive(e.target.checked)
                }
              />
              <span>Positive</span>
            </label>

            <label className="checkbox-option">
              <input
                type="checkbox"
                checked={negative}
                onChange={(e) =>
                  setNegative(e.target.checked)
                }
              />
              <span>Negative</span>
            </label>

            <label className="checkbox-option">
              <input
                type="checkbox"
                checked={edge}
                onChange={(e) =>
                  setEdge(e.target.checked)
                }
              />
              <span>Edge</span>
            </label>

          </div>

        </div>

      </div>

      {/* REQUIREMENT */}
      <div className="requirement-section">

        <label>Requirement</label>

        <textarea
          value={requirement}
          onChange={(e) =>
            setRequirement(e.target.value)
          }
          placeholder="Enter your requirement or user story..."
        />

      </div>

      {/* GENERATE */}
      <button
        className="generate-button"
        onClick={generateTestCases}
      >
        <Sparkles size={20} />
        Generate Test Cases
      </button>

      {/* GENERATED */}
      <div className="generated-section">

        <label>Generated Test Cases</label>

        <div className="output-box">

          <FileText
            className="document-icon"
            size={40}
          />

          {!generated ? (
            <>
              <h3>No test cases generated yet</h3>

              <p>
                Enter a requirement and click Generate Test Cases.
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

  const [framework, setFramework] =
    useState("Playwright");

  const [language, setLanguage] =
    useState("TypeScript");

  const [pom, setPom] =
    useState(true);

  const [spec, setSpec] =
    useState(true);

  const [json, setJson] =
    useState(true);

  const [requirement, setRequirement] =
    useState("");

  const [generated, setGenerated] =
    useState(false);

  /* FRAMEWORKS */
  const frameworks = [
    "Playwright",
    "Selenium",
    "Cypress",
  ];

  /* LANGUAGES */
  const languages = [
    "TypeScript",
    "JavaScript",
    "Python",
    "Java",
  ];

  const generateAutomation = () => {

    if (!requirement.trim()) {
      alert("Please enter a requirement for automation.");
      return;
    }

    setGenerated(true);
  };

  return (
    <section className="page">

      {/* =========================
          HEADER
      ========================= */}
      <div className="page-header">

        <h1>Automation</h1>

        <p>
          Generate automation test scripts from your requirements.
        </p>

      </div>

      {/* =================================================
          AUTOMATION OPTIONS
          Framework + Language + Output
          ALL IN ONE ROW
      ================================================= */}
      <div className="automation-options-card">

        {/* FRAMEWORK */}
        <div className="automation-option">

          <label>Framework</label>

          <div className="select-wrapper">

            <select
              value={framework}
              onChange={(e) =>
                setFramework(e.target.value)
              }
            >

              {frameworks.map((item) => (
                <option
                  key={item}
                  value={item}
                >
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
              onChange={(e) =>
                setLanguage(e.target.value)
              }
            >

              {languages.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}

            </select>

          </div>

        </div>

        {/* OUTPUT */}
        <div className="automation-option automation-output">

          <label>Output</label>

          <div className="automation-checkboxes">

            <label className="checkbox-option">

              <input
                type="checkbox"
                checked={pom}
                onChange={(e) =>
                  setPom(e.target.checked)
                }
              />

              <span>POM</span>

            </label>

            <label className="checkbox-option">

              <input
                type="checkbox"
                checked={spec}
                onChange={(e) =>
                  setSpec(e.target.checked)
                }
              />

              <span>Spec</span>

            </label>

            <label className="checkbox-option">

              <input
                type="checkbox"
                checked={json}
                onChange={(e) =>
                  setJson(e.target.checked)
                }
              />

              <span>JSON</span>

            </label>

          </div>

        </div>

      </div>

      {/* =========================
          AUTOMATION REQUIREMENT
      ========================= */}
      <div className="requirement-section">

        <label>Automation Requirement</label>

        <textarea
          value={requirement}
          onChange={(e) =>
            setRequirement(e.target.value)
          }
          placeholder="Enter the requirement for automation..."
        />

      </div>

      {/* =========================
          GENERATE AUTOMATION
      ========================= */}
      <button
        className="generate-button"
        onClick={generateAutomation}
      >

        <Code2 size={21} />

        Generate Automation

      </button>

      {/* =========================
          GENERATED AUTOMATION
      ========================= */}
      <div className="generated-section">

        <label>Generated Automation</label>

        <div className="output-box automation-output-box">

          <Code2
            className="document-icon"
            size={42}
          />

          {!generated ? (
            <>
              <h3>No automation generated yet</h3>

              <p>
                Enter a requirement and click Generate Automation.
              </p>
            </>
          ) : (
            <>
              <h3>
                Automation generated successfully
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

/* =========================================================
   SETTINGS PAGE
========================================================= */

function SettingsPage() {

  return (
    <section className="page">

      <div className="page-header">

        <h1>Settings</h1>

        <p>
          Configure your QA Portal preferences.
        </p>

      </div>

      <div className="settings-card">

        <Settings size={28} />

        <div>

          <h3>Portal Settings</h3>

          <p>
            Additional configuration options can be added here.
          </p>

        </div>

      </div>

    </section>
  );
}

export default App;