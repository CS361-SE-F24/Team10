// src/Page/Home.js
import React from 'react';
import '../css/home.css';
import {ProgressBar} from '../Page/progressbar.js'; // Adjust the path as needed

export const Home = () => {
  return (
    <>
      <div className="sidebar">
        <h4>PhD Student</h4>
        <div className="advisor">
          อาจารย์นันทิชา เมืองพันธ์
        </div>
        <div className="email">
          Email : nanticha.mangpun@gmail.com
        </div>
      </div>

      <div className="progressbar">
        <ProgressBar />
      </div>
    </>
  );
};
