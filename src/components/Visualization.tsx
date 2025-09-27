import React, { useState } from 'react';
import { BPEStep } from '../App';

interface VisualizationProps {
  steps: BPEStep[];
  currentStep: number;
}

const Visualization: React.FC<VisualizationProps> = ({ steps, currentStep }) => {
  const [showTokenIds, setShowTokenIds] = useState(false);
  const currentStepData = steps[currentStep];

  const getTokenClasses = (token: string, tokenIndex: number) => {
    let classes = 'token-pill';
    
    // Highlight tokens that are about to be merged (gather step)
    if (currentStepData.type === 'gather' && currentStepData.merge) {
      // Check if this specific token is part of the merge pair
      const mergeTokens = currentStepData.merge;
      const isFirstToken = tokenIndex < currentStepData.tokens.length - 1 && 
                          token === mergeTokens[0] && 
                          currentStepData.tokens[tokenIndex + 1] === mergeTokens[1];
      const isSecondToken = tokenIndex > 0 && 
                           token === mergeTokens[1] && 
                           currentStepData.tokens[tokenIndex - 1] === mergeTokens[0];
      
      if (isFirstToken || isSecondToken) {
        classes += ' token-gather';
      }
    }
    
    // Highlight tokens that were just merged (merge step)
    if (currentStepData.type === 'merge' && currentStepData.merge) {
      // Check if this token is the result of the merge
      const mergedToken = currentStepData.merge.join('');
      if (token === mergedToken) {
        classes += ' token-merged';
      }
    }
    
    return classes;
  };

  const getTokenTooltip = (token: string) => {
    const frequency = currentStepData.frequencies[token] || 0;
    const isBeingMerged = currentStepData.type === 'gather' && currentStepData.merge && currentStepData.merge.includes(token);
    const wasJustMerged = currentStepData.type === 'merge' && currentStepData.merge && currentStepData.merge.includes(token);
    
    let tooltip = `Token: "${token}"\nFrequency: ${frequency}`;
    
    if (isBeingMerged) {
      tooltip += '\n🟡 Being gathered for merge';
    } else if (wasJustMerged) {
      tooltip += '\n🔵 Just merged';
    }
    
    return tooltip;
  };

  const getTokenStyle = (token: string, tokenIndex: number) => {
    // Highlight tokens that are about to be merged (gather step)
    if (currentStepData.type === 'gather' && currentStepData.merge) {
      const mergeTokens = currentStepData.merge;
      const isFirstToken = tokenIndex < currentStepData.tokens.length - 1 && 
                          token === mergeTokens[0] && 
                          currentStepData.tokens[tokenIndex + 1] === mergeTokens[1];
      const isSecondToken = tokenIndex > 0 && 
                           token === mergeTokens[1] && 
                           currentStepData.tokens[tokenIndex - 1] === mergeTokens[0];
      
      if (isFirstToken || isSecondToken) {
        return {
          backgroundColor: '#fbbf24',
          borderColor: '#f59e0b',
          animation: 'gatherPulse 1.2s infinite',
          transform: 'scale(1.05)'
        };
      }
    }
    
    // Highlight tokens that were just merged (merge step)
    if (currentStepData.type === 'merge' && currentStepData.merge) {
      const mergedToken = currentStepData.merge.join('');
      if (token === mergedToken) {
        return {
          backgroundColor: '#D1FAE5',
          borderColor: '#10b981',
          color: '#064E3B',
          animation: 'mergeSuccess 0.6s ease-out',
          transform: 'scale(1.1)'
        };
      }
    }
    
    return {};
  };

  // Get token pair frequencies for the current step (currently unused but kept for future use)
  // const getTokenPairFrequencies = () => {
  //   const pairs: { [key: string]: number } = {};
  //   const tokens = currentStepData.tokens;
  //   
  //   for (let i = 0; i < tokens.length - 1; i++) {
  //     const pair = `${tokens[i]} + ${tokens[i + 1]}`;
  //     pairs[pair] = (pairs[pair] || 0) + 1;
  //   }
  //   
  //   return Object.entries(pairs)
  //     .sort(([,a], [,b]) => b - a)
  //     .slice(0, 5); // Show top 5 pairs
  // };

  // Get individual token frequencies for the current step
  const getTokenFrequencies = () => {
    return Object.entries(currentStepData.frequencies)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 8); // Show top 8 tokens
  };

  const tokenFrequencies = getTokenFrequencies();
  const maxTokenFrequency = Math.max(...tokenFrequencies.map(([, freq]) => freq));

  return (
    <div className="visualization-container">
      {/* Top Section - Tokenization Visualization */}
      <div className="tokenization-section">
        <div className="visualization-header">
          <h3>Tokenization Visualization</h3>
          <div className="token-controls">
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={showTokenIds}
                onChange={(e) => setShowTokenIds(e.target.checked)}
              />
              <span className="toggle-slider"></span>
              <span className="toggle-label">Show Token IDs</span>
            </label>
          </div>
        </div>
        
        <div className="tokens-display">
          {currentStepData.tokens.map((token, tokenIndex) => (
            <div
              key={`${currentStepData.step}-${tokenIndex}`}
              className={getTokenClasses(token, tokenIndex)}
              style={getTokenStyle(token, tokenIndex)}
              title={getTokenTooltip(token)}
            >
              {showTokenIds && (
                <div className="token-id">{tokenIndex}</div>
              )}
              <div className="token-text">{token}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Bottom Section - Frequencies & Stats */}
      <div className="bottom-panels">
        {/* Token Frequencies */}
        <div className="frequencies-panel">
          <h4>Token Frequencies</h4>
          <div className="frequencies-list">
            {tokenFrequencies.map(([token, frequency]) => (
              <div key={token} className="frequency-item">
                <div className="frequency-label">"{token}"</div>
                <div className="frequency-bar-container">
                  <div 
                    className="frequency-bar"
                    style={{ 
                      width: `${(frequency / maxTokenFrequency) * 100}%`,
                      backgroundColor: frequency === maxTokenFrequency ? '#fbbf24' : '#10b981'
                    }}
                  ></div>
                  <span className="frequency-count">{frequency}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        
        {/* Vocabulary Statistics */}
        <div className="stats-panel">
          <h4>Vocabulary Statistics</h4>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-value">{currentStepData.tokens.length}</div>
              <div className="stat-label">Total Tokens</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{new Set(currentStepData.tokens).size}</div>
              <div className="stat-label">Unique Tokens</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">
                {currentStepData.tokens.length > 0 ? 
                  ((new Set(currentStepData.tokens).size / currentStepData.tokens.length) * 100).toFixed(1) : 0}%
              </div>
              <div className="stat-label">Compression Ratio</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{Object.keys(currentStepData.frequencies).length}</div>
              <div className="stat-label">Vocabulary Size</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Visualization;
