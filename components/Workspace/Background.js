"use client";
import { useRecoilValue } from "recoil";
import { viewportPositionState } from "../../contexts/workspace";
import { useEffect, useRef } from "react";

export default function Background() {
  const viewportPosition = useRecoilValue(viewportPositionState);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawGrid();
    };

    const drawGrid = () => {
      const { x: viewportX, y: viewportY, scale } = viewportPosition;
      ctx.fillStyle = "#4D4D4E";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const clampedScale = Math.max(0.4, scale);
      const dotSize = 2 * clampedScale;
      const gridSpacing = 30;
      const dotTransparency = scale < 0.8 ? Math.max(scale - 0.4, 0) / 0.5 : 1;

      const dotColor = `rgba(130, 130, 130, ${dotTransparency})`;
      ctx.fillStyle = dotColor;

      const startX = -(viewportX % gridSpacing) + viewportX;
      const startY = -(viewportY % gridSpacing) + viewportY;

      for (
        let dotVX = startX;
        dotVX < viewportX + canvas.width / clampedScale;
        dotVX += gridSpacing
      ) {
        for (
          let dotVY = startY;
          dotVY < viewportY + canvas.height / clampedScale;
          dotVY += gridSpacing
        ) {
          // convert the dots from absolute coordinates to screen coordinates
          const dotX = (dotVX - viewportX) * clampedScale;
          const dotY = (dotVY - viewportY) * clampedScale;
          ctx.beginPath();
          ctx.arc(dotX, dotY, dotSize, 0, Math.PI * 2, true);
          ctx.fill();
        }
      }
    };

    drawGrid();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [viewportPosition]);

  return (
    <div>
      <canvas ref={canvasRef} className="absolute top-0 left-0 -z-10"></canvas>
    </div>
  );
}
