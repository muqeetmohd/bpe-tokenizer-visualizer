import React from 'react';

interface ControlsProps {
  onPlayPause: () => void;
  onStepBack: () => void;
  onStepForward: () => void;
  isPlaying: boolean;
  canGoBack: boolean;
  canGoForward: boolean;
}

const Controls: React.FC<ControlsProps> = ({
  onPlayPause,
  onStepBack,
  onStepForward,
  isPlaying,
  canGoBack,
  canGoForward
}) => {
  return (
    <div className="controls">
      <div className="control-btn-wrapper">
        <button
          onClick={onStepBack}
          disabled={!canGoBack}
          className="control-btn back-btn"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="19,20 9,12 19,4 19,20"/>
            <line x1="5" y1="19" x2="5" y2="5"/>
          </svg>
        </button>
        <div className="control-tooltip">
          <div className="control-tooltip-content">
            <div className="control-tooltip-icon">⬅️</div>
            <div className="control-tooltip-text">
              <strong>Previous Step</strong>
              <br />
              <span className="control-tooltip-subtext">Go back to see earlier tokenization stages</span>
            </div>
          </div>
          <div className="control-tooltip-arrow"></div>
        </div>
      </div>
      
      <button
        onClick={onPlayPause}
        className={`control-btn play-btn ${isPlaying ? 'playing' : ''}`}
        title={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="6" y="4" width="4" height="16"/>
            <rect x="14" y="4" width="4" height="16"/>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="5,3 19,12 5,21 5,3"/>
          </svg>
        )}
      </button>
      
      <div className="control-btn-wrapper">
        <button
          onClick={onStepForward}
          disabled={!canGoForward}
          className="control-btn forward-btn"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="5,4 15,12 5,20 5,4"/>
            <line x1="19" y1="5" x2="19" y2="19"/>
          </svg>
        </button>
        <div className="control-tooltip">
          <div className="control-tooltip-content">
            <div className="control-tooltip-icon">➡️</div>
            <div className="control-tooltip-text">
              <strong>Next Step</strong>
              <br />
              <span className="control-tooltip-subtext">Advance to see the next tokenization stage</span>
            </div>
          </div>
          <div className="control-tooltip-arrow"></div>
        </div>
      </div>
    </div>
  );
};

export default Controls;
