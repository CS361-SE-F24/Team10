import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/progressbar.css";

export const ProgressBar = ({ stdID, onProgressUpdate }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [steps, setSteps] = useState([]);
  const [stepNames, setStepNames] = useState([]);

  const getStepName = (key) => {
    switch (key) {
      case 'testEng':
        return "Test English";
      case 'comprehension':
        return "Comprehension";
      case 'quality':
        return "Quality";
      case 'publishExam':
        return "Publish Exam";
      case 'anotherStep': // Replace with actual step names if necessary
        return "Another Step";
      case 'finalStep':
        return "Final Step";
      default:
        return key; // Fallback to the key itself if not found
    }
  };

  useEffect(() => {
    const fetchStudentPlan = async () => {
      if (!stdID) return;

      try {
        const response = await axios.get(
          `http://localhost:56733/currentstudentplan?stdID=${stdID}`
        );
        const data_get = response.data;
        //(data_get);

        // Extract keys and build steps and stepNames
        const newSteps = Object.keys(data_get);
        const newStepNames = newSteps.map(getStepName);
        
        const fetchedCompletedSteps = newSteps.reduce((acc, key, index) => {
          if (data_get[key]) {
            acc.push(index + 1); // Use index + 1 as the step number
          }
          return acc;
        }, []);

        setSteps(newSteps);
        setStepNames(newStepNames);
        setCompletedSteps(fetchedCompletedSteps);
        setCurrentStep(
          fetchedCompletedSteps.length > 0
            ? Math.max(...fetchedCompletedSteps)
            : 1
        );
  
        const progressPercentage = Math.floor((fetchedCompletedSteps.length / newSteps.length) * 100);
        //(fetchedCompletedSteps.length,steps.length);
        
        // Post progress percentage to the backend
        await axios.post('http://localhost:56733/updatepercent', {
          stdID,
          progressPercentage,
        });
  
        onProgressUpdate(progressPercentage);
      } catch (error) {
        console.error("Error fetching student plan:", error);
      }
    };
  
    fetchStudentPlan();
  }, [stdID, onProgressUpdate]);
  

  return (
    <div className="progress-bar-container vertical" style={{ flex: 1 }}>
      {steps.map((step, index) => (
        <div
          key={index}
          className={`step ${
            completedSteps.includes(index + 1) ? "completed" : ""
          } ${currentStep === index + 1 ? "active" : ""}`}
          style={{ cursor: "pointer" }}
        >
          <div className="circle"></div>
          <div className="step-name">{stepNames[index]}</div>
          {index !== steps.length - 1 && <div className="line"></div>}
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;
