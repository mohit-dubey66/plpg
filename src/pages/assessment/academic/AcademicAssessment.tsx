import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AssessmentLayout } from '../../../components/assessment/AssessmentLayout';
import { useAcademicAssessmentStore } from '../../../store/useAcademicAssessmentStore';
import { SubjectSelection } from './steps/SubjectSelection';
import { TimeCommitment } from './steps/TimeCommitment';
import { LearningStyle } from './steps/LearningStyle';
import { CurrentKnowledge } from './steps/CurrentKnowledge';
import { TOTAL_ACADEMIC_STEPS } from '../../../lib/constants';

const AssessmentStep = () => {
  const currentStep = useAcademicAssessmentStore((state) => state.currentStep);

  switch (currentStep) {
    case 1:
      return <SubjectSelection />;
    case 2:
      return <TimeCommitment />;
    case 3:
      return <LearningStyle />;
    case 4:
      return <CurrentKnowledge />;
    default:
      return null;
  }
};

export const AcademicAssessment = () => {
  const navigate = useNavigate();
  const { isCompleted, currentStep } = useAcademicAssessmentStore();

  useEffect(() => {
    if (isCompleted) {
      navigate('/assessment/academic/summary');
    }
  }, [isCompleted, navigate]);

  return (
    <AssessmentLayout
      title="Academic Subject Assessment"
      description="Let's understand your academic goals and create a personalized study plan."
      currentStep={currentStep}
      totalSteps={TOTAL_ACADEMIC_STEPS}
    >
      <AssessmentStep />
    </AssessmentLayout>
  );
};