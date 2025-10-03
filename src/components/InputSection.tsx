import React, { useState, useEffect } from 'react';

interface InputSectionProps {
  onRunTokenization: (sentence: string, numMerges: number) => void;
  isLoading: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({ onRunTokenization, isLoading }) => {
  const [sentence, setSentence] = useState('');
  const [numMerges, setNumMerges] = useState(10);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (sentence.trim()) {
      onRunTokenization(sentence.trim(), numMerges);
    }
  };

  // Show tooltip when user has entered text but hasn't run tokenization yet
  useEffect(() => {
    if (sentence.trim() && !isLoading) {
      setShowTooltip(true);
      // Hide tooltip after 5 seconds
      const timer = setTimeout(() => {
        setShowTooltip(false);
      }, 5000);
      return () => clearTimeout(timer);
    } else {
      setShowTooltip(false);
    }
  }, [sentence, isLoading]);

  return (
    <div className="input-section">
      <div className="input-container">
        <h2>Enter the sentence you want to tokenize using BPE</h2>
        
        <form onSubmit={handleSubmit} className="input-form">
          <div className="input-group">
            <input
              type="text"
              id="sentence"
              value={sentence}
              onChange={(e) => setSentence(e.target.value)}
              placeholder="Enter the sentence you want to tokenize using BPE"
              className="sentence-input"
              disabled={isLoading}
            />
            <div className="button-container">
              <button
                type="submit"
                disabled={isLoading || !sentence.trim()}
                className="run-button"
              >
                {isLoading ? 'Tokenizing...' : 'Run'}
              </button>
              {showTooltip && (
                <div className="tooltip">
                  <div className="tooltip-content">
                    <div className="tooltip-icon">🎯</div>
                    <div className="tooltip-text">
                      <strong>Press Run to see the tokenization process!</strong>
                      <br />
                      <span className="tooltip-subtext">Watch how BPE breaks down your text step by step</span>
                    </div>
                  </div>
                  <div className="tooltip-arrow"></div>
                </div>
              )}
            </div>
          </div>
          
          <div className="merges-input">
            <label htmlFor="numMerges">Number of BPE steps:</label>
            <small className="merges-help">Each step includes gathering and merging tokens</small>
            <input
              type="number"
              id="numMerges"
              value={numMerges}
              onChange={(e) => {
                const value = e.target.value;
                const numValue = parseInt(value);
                if (!isNaN(numValue) && numValue >= 1 && numValue <= 50) {
                  setNumMerges(numValue);
                }
              }}
              onBlur={(e) => {
                const value = e.target.value;
                const numValue = parseInt(value);
                if (value === '' || isNaN(numValue) || numValue < 1 || numValue > 50) {
                  setNumMerges(10);
                }
              }}
              min="1"
              max="50"
              step="1"
              className="merges-number"
              disabled={isLoading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default InputSection;
