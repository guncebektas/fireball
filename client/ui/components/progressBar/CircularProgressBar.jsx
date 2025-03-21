import React from 'react';

export const CircularProgressBar = ({ progress = 2, size = 100, strokeWidth = 10, icon }) => {

  const {color} = Meteor.settings.public.app;

  const radius = (size - strokeWidth) / 2; // Radius of the circle
  const circumference = 2 * Math.PI * radius; // Circumference of the full circle
  const gapAngle = 90; // The angle for the gap at the bottom (in degrees)
  const gapFraction = gapAngle / 360; // Fraction of the circle that is the gap
  const visibleCircumference = circumference * (1 - gapFraction); // Adjusted circumference for the visible part

  if (progress < 3) {
    progress = 2;
  }

  const offset = visibleCircumference - (progress / 100) * visibleCircumference; // Offset for progress
  const normalizedProgress = Math.min(Math.max(progress, 0), 100); // Ensure progress is between 0-100
  const progressOffset = (1 - normalizedProgress / 100) * visibleCircumference;
  const startOffset = circumference * (gapFraction / 2);

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg
        width={size}
        height={size}
        style={{ transform: `rotate(${90 + gapAngle / 2}deg)`, overflow: 'visible' }} // Rotate to center the gap at the bottom
      >
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color.progressBar.background}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${visibleCircumference} ${circumference}`} // Visible part + gap
          strokeDashoffset={0}
        />
        {/* Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color.progressBar.progress}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${visibleCircumference} ${circumference}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>

      {/* Centered Icon */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <img src={icon} alt="center icon" style={{ width: size / 4 }} />
      </div>
    </div>
  );
};
