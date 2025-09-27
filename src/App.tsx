import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import InputSection from './components/InputSection';
import Controls from './components/Controls';
import Visualization from './components/Visualization';
import StepIndicator from './components/StepIndicator';
import VocabularyModal from './components/VocabularyModal';

export interface BPEStep {
  step: number;
  type: 'initial' | 'gather' | 'merge';
  tokens: string[];
  merge: string[] | null;
  frequencies: Record<string, number>;
}

export interface BPEResponse {
  steps: BPEStep[];
  vocab_size: number;
}

function App() {
  const [bpeData, setBpeData] = useState<BPEResponse | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showVocabulary, setShowVocabulary] = useState(false);

  const handleRunTokenization = async (sentence: string, numMerges: number = 10) => {
    setIsLoading(true);
    setError(null);
    setCurrentStep(0); // Reset to first step when running new tokenization
    
    try {
      // Mock data for testing - replace with actual API call when backend is fixed
      // const mockData: BPEResponse = {
      //   steps: [
      //     { step: 0, type: "initial", tokens: ["c", "a", "t", "</w>"], merge: null, frequencies: {"c": 1, "a": 1, "t": 1, "</w>": 1} },
      //     { step: 1, type: "gather", tokens: ["c", "a", "t", "</w>"], merge: ["c", "a"], frequencies: {"c": 1, "a": 1, "t": 1, "</w>": 1} },
      //     { step: 2, type: "merge", tokens: ["ca", "t", "</w>"], merge: ["c", "a"], frequencies: {"ca": 1, "t": 1, "</w>": 1} },
      //     { step: 3, type: "gather", tokens: ["ca", "t", "</w>"], merge: ["t", "</w>"], frequencies: {"ca": 1, "t": 1, "</w>": 1} },
      //     { step: 4, type: "merge", tokens: ["ca", "t</w>"], merge: ["t", "</w>"], frequencies: {"ca": 1, "t</w>": 1} }
      //   ],
      //   vocab_size: 5
      // };
      
      // Uncomment this when your backend is fixed:
      const response = await fetch('http://localhost:8080/api/bpe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sentence,
          merges: numMerges
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: BPEResponse = await response.json();
      console.log('API Response for', numMerges, 'merges:', data);
      console.log('Number of steps received:', data.steps.length);
      setBpeData(data);
      
      // setBpeData(mockData);
      // setCurrentStep(0);
    } catch (err) {
      console.error('Error during tokenization:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleStepBack = () => {
    if (bpeData && currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepForward = () => {
    if (bpeData && currentStep < bpeData.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Auto-play animation
  useEffect(() => {
    if (isPlaying && bpeData && currentStep < bpeData.steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prevStep => prevStep + 1);
      }, 1500); // 1.5 second delay between steps
      return () => clearTimeout(timer);
    } else if (isPlaying && bpeData && currentStep >= bpeData.steps.length - 1) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentStep, bpeData]);

  // Debug logging
  
  useEffect(() => {
    if (bpeData) {
      console.log('BPE Data:', bpeData);
      console.log('Current Step:', currentStep);
      console.log('Total Steps:', bpeData.steps.length);
      console.log('Steps:', bpeData.steps);
    }
  }, [bpeData, currentStep]);

  return (
    <div className="app-container">
      <Navbar />
      
      <div>
        <InputSection 
          onRunTokenization={handleRunTokenization}
          isLoading={isLoading}
        />
        
        {error && (
          <div className="error-message">
            ERROR: {error}
          </div>
        )}
        
        {bpeData && (
          <>
            <Controls
              onPlayPause={handlePlayPause}
              onStepBack={handleStepBack}
              onStepForward={handleStepForward}
              isPlaying={isPlaying}
              canGoBack={currentStep > 0}
              canGoForward={currentStep < bpeData.steps.length - 1}
            />
            
            <div className="main-layout">
              <div className="content-area">
                <Visualization 
                  steps={bpeData.steps}
                  currentStep={currentStep}
                />
              </div>
              
              <div className="steps-sidebar">
                <StepIndicator
                  steps={bpeData.steps}
                  currentStep={currentStep}
                  totalSteps={bpeData.steps.length}
                  vocabSize={bpeData.vocab_size}
                  onShowVocabulary={() => setShowVocabulary(true)}
                  onStepClick={(stepIndex) => setCurrentStep(stepIndex)}
                />
              </div>
            </div>
            
            <button
              className="vocabulary-float-btn"
              onClick={() => setShowVocabulary(true)}
            >
              Vocabulary size: {bpeData.vocab_size}
            </button>
          </>
        )}
      </div>
      
      {bpeData && (
        <VocabularyModal
          isOpen={showVocabulary}
          onClose={() => setShowVocabulary(false)}
          steps={bpeData.steps}
          vocabSize={bpeData.vocab_size}
        />
      )}
    </div>
  );
}

export default App;
