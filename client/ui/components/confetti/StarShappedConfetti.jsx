import React, {useEffect, useState} from 'react';
import Confetti from 'react-confetti';
import {randomInt} from "react-confetti/src/utils";

const drawStar = (ctx) => {
  const numPoints = this.numPoints || randomInt(4, 6)
  const outerRadius = 10; // Customize size as needed
  const innerRadius = outerRadius / 2;

  ctx.beginPath();
  ctx.moveTo(0, 0 - outerRadius);

  for (let n = 1; n < numPoints * 2; n++) {
    const radius = n % 2 === 0 ? outerRadius : innerRadius;
    const x = radius * Math.sin((n * Math.PI) / numPoints);
    const y = -1 * radius * Math.cos((n * Math.PI) / numPoints);
    ctx.lineTo(x, y);
  }

  ctx.fill();
  ctx.closePath();
};

export const StarShapedConfetti = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Set dimensions on mount
    handleResize();
    // Update dimensions on window resize
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (<Confetti
    width={windowDimensions.width || window.innerWidth}
    height={windowDimensions.height || window.innerHeight}
    recycle={false}
    numberOfPieces={200} // Adjust particle count
    drawShape={drawStar}
  />)
}
