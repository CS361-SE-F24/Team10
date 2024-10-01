import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register components of ChartJS
ChartJS.register(ArcElement, Tooltip, Legend);

export const DonutChart = ({ progress }) => { 
  const data = {
    labels: ['Completed', 'Remaining'],
    datasets: [
      {
        label: 'Progress',
        data: [progress, 100 - progress], // แสดงเปอร์เซ็นต์ความสำเร็จที่ถูกส่งมา
        backgroundColor: ['#9ccc65', '#f44336'], 
        hoverBackgroundColor: ['#8bc34a', '#e57373'], 
        borderWidth: 0, 
      },
    ],
  };

  const options = {
    cutout: '70%', 
    plugins: {
      legend: {
        display: false, 
      },
      tooltip: {
        enabled: false, 
      },
    },
    maintainAspectRatio: false, // เพิ่มเพื่อให้สามารถปรับขนาดเองได้
  };

  return (
    <div style={{ textAlign: 'center', position: 'relative', width: '100px', height: '150px' }}> {/* ปรับขนาดของคอนเทนเนอร์ */}
      <Doughnut data={data} options={options} />
      <div style={{ 
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
        fontSize: '16px',  /* ลดขนาดตัวอักษร */
        fontWeight: 'bold', 
        color: '#f44336' 
      }}>
        {Math.round(progress)}%
      </div>
      <div style={{ marginTop: '10px', fontSize: '14px', color: 'blue' }}> {/* ลดขนาดข้อความ */}
        {/* Current: ตีพิมพ์ผลงานวิจัย */}
      </div>
    </div>
  );
};

export default DonutChart;
