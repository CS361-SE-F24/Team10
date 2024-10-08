import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/progressbar.css";

export const ProgressBar = ({ stdID, onProgressUpdate }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);

  // Define steps as the keys you will receive from the API
  const steps = ["testEng", "comprehension", "quality", "publishExam"];
  const stepNames = [
    "Test English",
    "Comprehension",
    "Quality",
    "Publish Exam",
  ];

  useEffect(() => {
    const fetchStudentPlan = async () => {
      if (!stdID) return;
  
      try {
        const response = await axios.get(
          `http://localhost:56733/currentstudentplan?stdID=${stdID}`
        );
        const { testEng, comprehension, quality, publishExam } = response.data;
  
        const fetchedCompletedSteps = [];
        if (testEng) fetchedCompletedSteps.push(1);
        if (comprehension) fetchedCompletedSteps.push(2);
        if (quality) fetchedCompletedSteps.push(3);
        if (publishExam) fetchedCompletedSteps.push(4);
  
        setCompletedSteps(fetchedCompletedSteps);
        setCurrentStep(
          fetchedCompletedSteps.length > 0
            ? Math.max(...fetchedCompletedSteps)
            : 1
        );
  
        const progressPercentage = (fetchedCompletedSteps.length / steps.length) * 100;
        
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
