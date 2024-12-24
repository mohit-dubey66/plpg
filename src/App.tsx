import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { Dashboard } from './components/Dashboard';
import { LearningPaths } from './pages/LearningPaths';
import { RevisionGuides } from './pages/RevisionGuides';
import { CreateLearningPath } from './pages/CreateLearningPath';
import { Summary } from './pages/assessment/Summary';
import { SkillAssessment } from './pages/assessment/skill/SkillAssessment';
import { SkillSummary } from './pages/assessment/skill/SkillSummary';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/revision-guides" element={<RevisionGuides />} />
          <Route path="/create-learning-path" element={<CreateLearningPath />} />
          <Route path="/learning-paths/skill" element={<SkillAssessment />} />
          <Route path="/assessment/skill/summary" element={<SkillSummary />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;