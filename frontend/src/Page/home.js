// src/Page/Home.js
import React from 'react';
import '../css/home.css';
import { ProgressBar } from '../Page/progressbar.js';

export const Home = () => {
  return (
    <div className="home-container">
      <div className="sidebar">
        <h4>PhD Student</h4>
        <div className="rec">
          <div className="inside">
            <h3>ชื่</h3>
          </div>
        </div>
        <br />
        <div className="advisor">อาจารย์นันทิชา เมืองพันธ์</div>
        <div className="email">Email: nanticha.mangpun@gmail.com</div>
      </div>
      <div className="progressbar">
        <ProgressBar />
      </div>
    </div>
  );
};
