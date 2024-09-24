// src/Page/progressbar.js
import React, { useState } from 'react';
import '../css/progressbar.css';

export const ProgressBar = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4'];

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
      <div className="progress-bar-container vertical">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`step ${currentStep > index ? 'completed' : ''} ${currentStep === index + 1 ? 'active' : ''}`}
          >
            <div className="circle">{index + 1}</div>
            {index !== steps.length - 1 && <div className="line"></div>}
          </div>
        ))}
      </div>

      <div className="navigation-buttons">
        <button className='prev' onClick={prevStep} disabled={currentStep === 1}>
          Prev
        </button>
        <button className='next' onClick={nextStep} disabled={currentStep === steps.length}>
          Next
        </button>
      </div>
    </div>
  );
};
