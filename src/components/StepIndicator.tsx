import React from 'react';
import { BPEStep } from '../App';

interface StepIndicatorProps {
  steps: BPEStep[];
  currentStep: number;
  totalSteps: number;
  vocabSize: number;
  onShowVocabulary: () => void;
  onStepClick?: (stepIndex: number) => void;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps,
  currentStep,
  totalSteps,
  vocabSize,
  onShowVocabulary,
  onStepClick
}) => {
  const progress = totalSteps > 0 ? ((currentStep + 1) / totalSteps) * 100 : 0;

  const getStepDescription = (step: BPEStep, index: number) => {
    if (index === 0) return 'Initial characters';
    if (step.type === 'gather' && step.merge) {
      return `Gather: [${step.merge.join('] + [')}] → [${step.merge.join('')}]`;
    }
    if (step.type === 'merge' && step.merge) {
      return `Merge: [${step.merge.join('] + [')}] → [${step.merge.join('')}]`;
    }
    return 'Processing...';
  };

  const getStepIcon = (step: BPEStep, index: number) => {
    if (index === 0) return '⚪';
    if (step.type === 'gather') return '🟢';
    if (step.type === 'merge') return '🔵';
    return '⚪';
  };

  const getTokenStats = (step: BPEStep) => {
    const tokenCount = step.tokens.length;
    const uniqueTokens = new Set(step.tokens).size;
    return `${tokenCount} tokens | ${uniqueTokens} unique`;
  };

  return (
    <div className="steps-sidebar">
      <h3>BPE Steps</h3>
      
      <div className="steps-list">
        {steps.map((step, index) => (
          <div 
            key={step.step} 
            className={`step-card ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
            onClick={() => onStepClick?.(index)}
          >
            <div className="step-header">
              <div className="step-number-container">
                <span className="step-icon">{getStepIcon(step, index)}</span>
                <span className="step-number">Step {step.step}</span>
              </div>
              <span className={`step-type-badge ${step.type}`}>{step.type}</span>
            </div>
            
            <div className="step-description">
              {getStepDescription(step, index)}
            </div>
            
            <div className="step-stats">
              {getTokenStats(step)}
            </div>
            
            {step.merge && (
              <div className="merge-preview">
                <span className="merge-label">Merging:</span>
                <div className="merge-tokens">
                  {step.merge.map((token, tokenIndex) => (
                    <span key={tokenIndex} className="merge-token">{token}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="progress-container">
        <div className="progress-header">
          <span>Progress</span>
          <span>{currentStep + 1} / {totalSteps}</span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="progress-text">
          {Math.round(progress)}% Complete
        </div>
      </div>
      
      <button
        onClick={onShowVocabulary}
        className="vocab-button"
      >
        <span className="vocab-label">Vocabulary Size</span>
        <span className="vocab-value">{vocabSize}</span>
      </button>
    </div>
  );
};

export default StepIndicator;
