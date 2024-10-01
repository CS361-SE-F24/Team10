import React, { useState } from 'react';
import { DonutChart } from './DonutChart'; // Import DonutChart
import '../css/progressbar.css';

export const ProgressBar = () => {
  const steps = ['1', '2', '3', '4']; // กำหนดจำนวนขั้นตอน
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]); // Array to track completed steps

  // ฟังก์ชันเพื่อ toggle สถานะเสร็จสมบูรณ์ของ step
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

  // คำนวณเปอร์เซ็นต์ความสำเร็จ
  const progressPercentage = (completedSteps.length / steps.length) * 100;

  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-end' }}> 
      {/* จัดให้อยู่ด้านบนขวา ด้วย alignItems และ justifyContent */}

      <div className="progress-bar-container vertical" style={{ flex: 1 }}> {/* flex: 1 เพื่อให้ ProgressBar ใช้พื้นที่ตามต้องการ */}
        {steps.map((step, index) => (
          <div
            key={index}
            className={`step ${completedSteps.includes(index + 1) ? 'completed' : ''} ${currentStep === index + 1 ? 'active' : ''}`}
            onClick={() => toggleStep(index + 1)} // อนุญาตให้คลิกเพื่อเปลี่ยนสถานะ
            style={{ cursor: 'pointer' }} // แสดงผลว่าคลิกได้
          >
            <div className="circle">{step}</div>
            {index !== steps.length - 1 && <div className="line"></div>}
          </div>
        ))}
      </div>

      {/* จัดวาง DonutChart ด้านขวาบน */}
      <div style={{ marginLeft: '-100px', marginTop: '0px' }}> {/* ใช้ marginLeft เป็นค่าลบเพื่อขยับเข้าไปใกล้ */} 
        <DonutChart progress={progressPercentage} />
      </div>

    </div>
  );
};

export default ProgressBar;
