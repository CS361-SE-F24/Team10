import React, { useState, useEffect } from 'react';
import DonutChart from './DonutChart';
import axios from 'axios';
import '../css/progressbar.css';

export const ProgressBar = ({ stdID }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to control popup visibility

  // Define steps as the keys you will receive from the API
  const steps = ['testEng', 'comprehension', 'quality', 'publishExam'];
  const stepNames = ['Test English', 'Comprehension', 'Quality', 'Publish Exam']; // Readable step names

  useEffect(() => {
    const fetchStudentPlan = async () => {
      if (!stdID) return;

      try {
        const response = await axios.get(`http://localhost:56733/currentstudentplan?stdID=${stdID}`);
        const { testEng, comprehension, quality, publishExam } = response.data;

        const fetchedCompletedSteps = [];
        if (testEng) fetchedCompletedSteps.push(1); // Step 1 corresponds to testEng
        if (comprehension) fetchedCompletedSteps.push(2); // Step 2 corresponds to comprehension
        if (quality) fetchedCompletedSteps.push(3); // Step 3 corresponds to quality
        if (publishExam) fetchedCompletedSteps.push(4); // Step 4 corresponds to publishExam

        setCompletedSteps(fetchedCompletedSteps);
        setCurrentStep(fetchedCompletedSteps.length > 0 ? Math.max(...fetchedCompletedSteps) : 1);
      } catch (error) {
        console.error('Error fetching student plan:', error);
      }
    };

    fetchStudentPlan();
  }, [stdID]);

  // Calculate progress percentage
  const progressPercentage = (completedSteps.length / steps.length) * 100;

  return (
    <div className="items">
      {/* Progress bar container */}
      <div className="progress-bar-container vertical" style={{ flex: 1 }}>
      {steps.map((step, index) => (
        <div
          key={index}
          className={`step ${completedSteps.includes(index + 1) ? 'completed' : ''} ${currentStep === index + 1 ? 'active' : ''}`}
          style={{ cursor: 'pointer' }}
        >
          <div className="circle">{index + 1}</div>
          <div className="step-name">{stepNames[index]}</div>
          {index !== steps.length - 1 && <div className="line"></div>}
        </div>
      ))}

      </div>

      {/* DonutChart */}
      <div className="DonutChart">
        <DonutChart progress={progressPercentage} />
      </div>

      
    </div>
  );
};

export default ProgressBar;
