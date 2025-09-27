import React, { useEffect } from 'react';
import { BPEStep } from '../App';

interface VocabularyModalProps {
  isOpen: boolean;
  onClose: () => void;
  steps: BPEStep[];
  vocabSize: number;
}

const VocabularyModal: React.FC<VocabularyModalProps> = ({
  isOpen,
  onClose,
  steps,
  vocabSize
}) => {
  // Get all unique tokens from all steps
  const getAllTokens = () => {
    const tokenSet = new Set<string>();
    steps.forEach(step => {
      step.tokens.forEach(token => tokenSet.add(token));
    });
    return Array.from(tokenSet).sort();
  };

  const allTokens = getAllTokens();

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="modal-content">
        {/* Header */}
        <div className="modal-header">
          <h2>
            VOCABULARY ({vocabSize} TOKENS)
          </h2>
          <button
            onClick={onClose}
            className="modal-close"
          >
            ✕
          </button>
        </div>
        
        {/* Content */}
        <div className="modal-body">
          <div className="vocab-grid">
            {allTokens.map((token, index) => (
              <div
                key={index}
                className="vocab-token"
              >
                {token}
              </div>
            ))}
          </div>
        </div>
        
        {/* Footer */}
        <div className="modal-footer">
          <div className="text-center">
            SHOWING ALL UNIQUE TOKENS FROM THE TOKENIZATION PROCESS
          </div>
        </div>
      </div>
    </div>
  );
};

export default VocabularyModal;
