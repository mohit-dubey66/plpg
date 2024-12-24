import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AssessmentLayout } from '../../../components/assessment/AssessmentLayout';
import { useSkillAssessmentStore } from '../../../store/useSkillAssessmentStore';
import { SkillSelection } from './steps/SkillSelection';
import { CurrentProficiency } from './steps/CurrentProficiency';
import { LearningPreferences } from './steps/LearningPreferences';
import { Resources } from './steps/Resources';
import { TimeCommitment } from './steps/TimeCommitment';
import { Motivation } from './steps/Motivation';

const AssessmentStep = () => {
  const currentStep = useSkillAssessmentStore((state) => state.currentStep);

  switch (currentStep) {
    case 1:
      return <SkillSelection />;
    case 2:
      return <CurrentProficiency />;
    case 3:
      return <LearningPreferences />;
    case 4:
      return <Resources />;
    case 5:
      return <TimeCommitment />;
    case 6:
      return <Motivation />;
    default:
      return null;
  }
};

export const SkillAssessment = () => {
  const navigate = useNavigate();
  const isCompleted = useSkillAssessmentStore((state) => state.isCompleted);

  useEffect(() => {
    if (isCompleted) {
      navigate('/assessment/skill/summary');
    }
  }, [isCompleted, navigate]);

  return (
    <AssessmentLayout
      title="Skill Learning Assessment"
      description="Let's understand your learning goals and preferences to create a personalized learning path."
    >
      <AssessmentStep />
    </AssessmentLayout>
  );
};