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

type Source = "Jira" | "Manual" | "Document";

function App() {
  const [activePage, setActivePage] = useState<Page>("manual");
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={darkMode ? "app dark" : "app light"}>
      <aside className="sidebar">
        <div className="sidebar-top">
          <div className="brand">
            <div className="brand-icon">
              <Sparkles size={22} strokeWidth={2.2} />
            </div>
            <span>QA Portal</span>
          </div>

          <nav className="navigation">
            <button className={`nav-button ${activePage === "manual" ? "active" : ""}`} onClick={() => setActivePage("manual")}>
              <FileText size={21} />
              <span>Manual</span>
            </button>
            <button className={`nav-button ${activePage === "automation" ? "active" : ""}`} onClick={() => setActivePage("automation")}>
              <Bot size={21} />
              <span>Automation</span>
            </button>
            <button className={`nav-button ${activePage === "settings" ? "active" : ""}`} onClick={() => setActivePage("settings")}>
              <Settings size={21} />
              <span>Settings</span>
            </button>
          </nav>
        </div>

        <div className="sidebar-bottom">
          <div className="sidebar-user">
            <div className="user-avatar"><User size={22} /></div>
            <div className="user-info">
              <strong>QA User</strong>
              <span>QA Engineer</span>
            </div>
            <button
              className="theme-button"
              onClick={() => setDarkMode(!darkMode)}
              title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <Sun size={19} /> : <Moon size={19} />}
            </button>
          </div>
        </div>
      </aside>

      <main className="main-content">
        {activePage === "manual" && <ManualPage />}
        {activePage === "automation" && <AutomationPage />}
        {activePage === "settings" && <SettingsPage />}
      </main>
    </div>
  );
}

function ManualPage() {
  const [source, setSource] = useState<Source>("Jira");
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
      <div className="page-header">
        <h1>Manual Test Cases</h1>
        <p>Generate manual test cases from your requirements.</p>
      </div>

      <div className="options-card">
        <div className="option-section">
          <label>Source</label>
          <div className="segment-group">
            <button className={`segment-button ${source === "Jira" ? "active" : ""}`} onClick={() => setSource("Jira")}>
              <ClipboardList size={17} /> Jira
            </button>
            <button className={`segment-button ${source === "Manual" ? "active" : ""}`} onClick={() => setSource("Manual")}>
              <FileText size={17} /> Manual
            </button>
            <button className={`segment-button ${source === "Document" ? "active" : ""}`} onClick={() => setSource("Document")}>
              <FileText size={17} /> Document
            </button>
          </div>
        </div>

        <div className="option-section output-section">
          <label>Output Format</label>
          <div className="segment-group">
            {(["Normal", "Gherkin", "Excel"] as const).map((item) => (
              <button key={item} className={`segment-button ${outputFormat === item ? "active" : ""}`} onClick={() => setOutputFormat(item)}>
                {item === "Gherkin" ? <Code2 size={17} /> : <FileText size={17} />}
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="option-section test-type-section">
          <label>Test Type</label>
          <div className="checkbox-group">
            <Checkbox label="Positive" checked={positive} onChange={setPositive} />
            <Checkbox label="Negative" checked={negative} onChange={setNegative} />
            <Checkbox label="Edge" checked={edge} onChange={setEdge} />
          </div>
        </div>
      </div>

      <div className="requirement-section">
        <label>Requirement</label>
        <textarea value={requirement} onChange={(e) => setRequirement(e.target.value)} placeholder="Enter your requirement or user story..." />
      </div>

      <button className="generate-button" onClick={generateTestCases}>
        <Sparkles size={20} /> Generate Test Cases
      </button>

      <div className="generated-section">
        <label>Generated Test Cases</label>
        <div className="output-box">
          <FileText className="document-icon" size={40} />
          {!generated ? (
            <><h3>No test cases generated yet</h3><p>Enter a requirement and click Generate Test Cases.</p></>
          ) : (
            <><h3>Test cases generated successfully</h3><p>{outputFormat} test cases will appear here.</p></>
          )}
        </div>
      </div>
    </section>
  );
}

function AutomationPage() {
  const [source, setSource] = useState<Source>("Jira");
  const [framework, setFramework] = useState("Playwright");
  const [language, setLanguage] = useState("TypeScript");
  const [pom, setPom] = useState(true);
  const [spec, setSpec] = useState(true);
  const [json, setJson] = useState(true);
  const [requirement, setRequirement] = useState("");
  const [generated, setGenerated] = useState(false);

  const frameworks = ["Playwright", "Selenium", "Cypress"];
  const languages = ["TypeScript", "JavaScript", "Python", "Java"];

  const generateAutomation = () => {
    if (!requirement.trim()) {
      alert("Please enter a requirement for automation.");
      return;
    }
    setGenerated(true);
  };

  return (
    <section className="page">
      <div className="page-header">
        <h1>Automation</h1>
        <p>Generate automation test scripts from your requirements.</p>
      </div>

      {/* Source + Framework + Language + Output: one compact row */}
      <div className="automation-options-card">
        <div className="automation-option source-option">
          <label>Source</label>
          <div className="segment-group automation-source-group">
            <button className={`segment-button ${source === "Jira" ? "active" : ""}`} onClick={() => setSource("Jira")}>
              <ClipboardList size={16} /> Jira
            </button>
            <button className={`segment-button ${source === "Manual" ? "active" : ""}`} onClick={() => setSource("Manual")}>
              <FileText size={16} /> Manual
            </button>
            <button className={`segment-button ${source === "Document" ? "active" : ""}`} onClick={() => setSource("Document")}>
              <FileText size={16} /> Document
            </button>
          </div>
        </div>

        <div className="automation-option">
          <label>Framework</label>
          <div className="select-wrapper">
            <select value={framework} onChange={(e) => setFramework(e.target.value)}>
              {frameworks.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>
        </div>

        <div className="automation-option">
          <label>Language</label>
          <div className="select-wrapper">
            <select value={language} onChange={(e) => setLanguage(e.target.value)}>
              {languages.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>
        </div>

        <div className="automation-option automation-output">
          <label>Output</label>
          <div className="automation-checkboxes">
            <Checkbox label="POM" checked={pom} onChange={setPom} />
            <Checkbox label="Spec" checked={spec} onChange={setSpec} />
            <Checkbox label="JSON" checked={json} onChange={setJson} />
          </div>
        </div>
      </div>

      <div className="requirement-section">
        <label>Automation Requirement</label>
        <textarea value={requirement} onChange={(e) => setRequirement(e.target.value)} placeholder="Enter the requirement for automation..." />
      </div>

      <button className="generate-button" onClick={generateAutomation}>
        <Code2 size={21} /> Generate Automation
      </button>

      <div className="generated-section">
        <label>Generated Automation</label>
        <div className="output-box automation-output-box">
          <Code2 className="document-icon" size={42} />
          {!generated ? (
            <><h3>No automation generated yet</h3><p>Enter a requirement and click Generate Automation.</p></>
          ) : (
            <>
              <h3>Automation generated successfully</h3>
              <p>{source} · {framework} · {language}</p>
              <p className="generated-details">{pom ? "POM " : ""}{spec ? "Spec " : ""}{json ? "JSON" : ""}</p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function Checkbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <label className="checkbox-option">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span>{label}</span>
    </label>
  );
}

function SettingsPage() {
  return (
    <section className="page">
      <div className="page-header">
        <h1>Settings</h1>
        <p>Configure your QA Portal preferences.</p>
      </div>
      <div className="settings-card">
        <Settings size={28} />
        <div><h3>Portal Settings</h3><p>Additional configuration options can be added here.</p></div>
      </div>
    </section>
  );
}

export default App;