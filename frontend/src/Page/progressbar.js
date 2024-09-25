import React, { useState } from 'react';
import '../css/progressbar.css';

export const ProgressBar = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]); // Array to track completed steps
  const steps = ['1', '2', '3', '4']; // Only numbers now

  const toggleStep = (step) => {
    // Check if the step is already completed
    let updatedCompletedSteps = [...completedSteps];
    if (updatedCompletedSteps.includes(step)) {
      // If the step is already completed, remove it from the array
      updatedCompletedSteps = updatedCompletedSteps.filter((s) => s !== step);
    } else {
      // If the step is not completed, add it to the array
      updatedCompletedSteps.push(step);
    }
    setCompletedSteps(updatedCompletedSteps);
    setCurrentStep(step);
  };

  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
      <div className="progress-bar-container vertical">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`step ${completedSteps.includes(index + 1) ? 'completed' : ''} ${currentStep === index + 1 ? 'active' : ''}`}
            onClick={() => toggleStep(index + 1)} // Allow clicking to toggle completion
            style={{ cursor: 'pointer' }} // Make it look clickable
          >
            <div className="circle">{step}</div> {/* Only showing step number */}
            {/* Removed the step label */}
            {index !== steps.length - 1 && <div className="line"></div>}
          </div>
        ))}
      </div>
    </div>
  );
};
