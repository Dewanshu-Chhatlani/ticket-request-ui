import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LogOnPage from "./components/LogOnPage";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LogOnPage />} />
          <Route path="/list-requests" element={<Dashboard />} />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
