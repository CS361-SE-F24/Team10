import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import '../css/progressbar.css';

export const ProgressBar = ({ stdID }) => { // Destructure stdID correctly
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]); // Array to track completed steps
  const steps = ['1', '2', '3', '4']; // Only numbers now
  // const location = useLocation();
  // //console.log(stdID);
  
  useEffect(() => {
    const fetchStudentPlan = async () => {
      if (!stdID) return; // Don't call API if stdID is undefined
    
      try {
        //console.log("Fetching data for stdID:", stdID);
        const response = await axios.get(`http://localhost:56733/currentstudentplan?stdID=${stdID}`); // Adjust port if necessary
        const { testEng, comprehension, quality, publishExam } = response.data;
        //console.log(response.data);
        
        // Process response...
        const fetchedCompletedSteps = [];
        if (testEng) fetchedCompletedSteps.push(1);
        if (comprehension) fetchedCompletedSteps.push(2);
        if (quality) fetchedCompletedSteps.push(3);
        if (publishExam) fetchedCompletedSteps.push(4);

        setCompletedSteps(fetchedCompletedSteps);
        setCurrentStep(fetchedCompletedSteps.length > 0 ? Math.max(...fetchedCompletedSteps) : 1);
      } catch (error) {
        console.error('Error fetching student plan:', error);
      }
    };
    
    //console.log(completedSteps);
    
    fetchStudentPlan();
  }, [stdID]); // Dependency array ensures it fetches data when stdID changes

  const toggleStep = (step) => {
    let updatedCompletedSteps = [...completedSteps];
    if (updatedCompletedSteps.includes(step)) {
      updatedCompletedSteps = updatedCompletedSteps.filter((s) => s !== step);
    } else {
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
            // onClick={() => toggleStep(index + 1)}
            style={{ cursor: 'pointer' }}
          >
            <div className="circle">{step}</div> {/* Step number displayed */}
            {index !== steps.length - 1 && <div className="line"></div>}
          </div>
        ))}
      </div>
    </div>
  );
};
