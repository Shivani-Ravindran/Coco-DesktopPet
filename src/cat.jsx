import React, { useEffect, useRef } from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { cursorPosition } from "@tauri-apps/api/window";

function App() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    const appWindow = getCurrentWindow();

    ctx.imageSmoothingEnabled = false;

    // The exact pixelCat array
    const pixelCat = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 1, 0, 0, 0, 0, 1, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 1, 0, 0, 0, 0, 1, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 1, 0, 0, 0, 0, 1, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,],
      [0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0,],
      [0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0,],
      [0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0,],
      [0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 1, 2, 2, 1, 2, 2, 1, 2, 2, 1, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0,],
      [0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 2, 1, 2, 2, 1, 2, 2, 1, 2, 2, 1, 2, 2, 2, 1, 1, 1, 0, 0, 0, 0, 0,],
      [0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0,],
      [0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 0, 0, 0, 0, 0,],
      [0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0,],
      [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0,],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0,],
      [0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 0, 1, 1, 1, 1, 0,],
      [0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 1, 2, 2, 1, 0,],
      [0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 1, 2, 2, 1, 0,],
      [0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 1, 2, 2, 1, 0,],
      [0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 1, 2, 2, 1, 0,],
      [0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 1, 2, 2, 1, 0,],
      [0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 1, 0,],
      [0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0,],
      [0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0,],
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 0,],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 1, 0, 1, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    ];

    const pixelSize = 3;
    const offsetX = 14;
    const offsetY = 14;

    appWindow.setIgnoreCursorEvents(true);
    let running = true;
    let lastIgnore = null;
    let rafId = null;

    let currentHeadX = 0;
    let currentHeadY = 0;
    let currentPupilX = 0;
    let currentPupilY = 0;

    let localX = 62.5;
    let localY = 62.5;

    const updateCursor = async () => {
      if (!running) return;
      try {
        const [pos, winPos, factor] = await Promise.all([
          cursorPosition(),
          appWindow.outerPosition(),
          appWindow.scaleFactor(),
        ]);
        localX = (pos.x - winPos.x) / factor;
        localY = (pos.y - winPos.y) / factor;
      } catch (e) {}
      setTimeout(updateCursor, 32);
    };

    const updateIgnore = async () => {
      if (!running) return;
      try {
        let isOpaque = false;
        if (localX >= 0 && localX < 125 && localY >= 0 && localY < 125) {
          const pixel = ctx.getImageData(Math.floor(localX), Math.floor(localY), 1, 1).data;
          isOpaque = pixel[3] > 0;
        }
        if (isOpaque && lastIgnore !== false) {
          await appWindow.setIgnoreCursorEvents(false);
          lastIgnore = false;
        } else if (!isOpaque && lastIgnore !== true) {
          await appWindow.setIgnoreCursorEvents(true);
          lastIgnore = true;
        }
      } catch (e) {}
      setTimeout(updateIgnore, 32);
    };

    let lastTime = null;

    const render = (timestamp) => {
      if (!running) return;

      const dt = lastTime ? Math.min((timestamp - lastTime) / 16.67, 3) : 1;
      lastTime = timestamp;

      // --- THE NEW TIGHTER CONSTRAINTS ---
      // We clamp the movement so it never strays too far off the body's grid.
      // Dividing by 35 makes it less sensitive, clamping to 0.75 makes it stop sooner.
      const targetHeadX = Math.max(-0.75, Math.min(0.75, (localX - 62.5) / 35));
      const targetHeadY = Math.max(-0.50, Math.min(0.75, (localY - 62.5) / 35));
      
      const targetPupilX = Math.max(-0.7, Math.min(0.7, (localX - 62.5) / 30));
      const targetPupilY = Math.max(-0.7, Math.min(0.7, (localY - 62.5) / 30));

      // Smooth Lerp (Keeps the fluid motion)
      const reactSpeed = 1 - Math.pow(1 - 0.15, dt);
      currentHeadX += (targetHeadX - currentHeadX) * reactSpeed;
      currentHeadY += (targetHeadY - currentHeadY) * reactSpeed;
      currentPupilX += (targetPupilX - currentPupilX) * reactSpeed;
      currentPupilY += (targetPupilY - currentPupilY) * reactSpeed;

      // Rounding the final output to keep sharp monitor pixels (No smearing)
      const headRenderX = Math.round(currentHeadX * pixelSize);
      const headRenderY = Math.round(currentHeadY * pixelSize);
      const pupilRenderX = Math.round(currentPupilX * pixelSize);
      const pupilRenderY = Math.round(currentPupilY * pixelSize);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const deferredPupils = [];

      for (let row = 0; row < pixelCat.length; row++) {
        for (let col = 0; col < pixelCat[row].length; col++) {
          const colorIndex = pixelCat[row][col];
          if (colorIndex === 0) continue;

          const isBody = row >= 16;
          const isPupil =
            (row === 10 || row === 11) &&
            [12, 13, 18, 19].includes(col) &&
            colorIndex === 2;

          if (isBody) {
            ctx.fillStyle = colorIndex === 1 ? "#e9e9e9" : "#000000";
            ctx.fillRect(
              offsetX + col * pixelSize,
              offsetY + row * pixelSize,
              pixelSize,
              pixelSize,
            );
          } else {
            if (isPupil) {
              ctx.fillStyle = "#e9e9e9";
              ctx.fillRect(
                offsetX + col * pixelSize + headRenderX,
                offsetY + row * pixelSize + headRenderY,
                pixelSize,
                pixelSize,
              );
              deferredPupils.push({ col, row });
            } else {
              ctx.fillStyle = colorIndex === 1 ? "#e9e9e9" : "#000000";
              ctx.fillRect(
                offsetX + col * pixelSize + headRenderX,
                offsetY + row * pixelSize + headRenderY,
                pixelSize,
                pixelSize,
              );
            }
          }
        }
      }

      ctx.fillStyle = "#000000";
      for (const p of deferredPupils) {
        ctx.fillRect(
          offsetX + p.col * pixelSize + headRenderX + pupilRenderX,
          offsetY + p.row * pixelSize + headRenderY + pupilRenderY,
          pixelSize,
          pixelSize,
        );
      }

      rafId = requestAnimationFrame(render);
    };

    updateCursor();
    updateIgnore();
    rafId = requestAnimationFrame(render);

    return () => {
      running = false;
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas ref={canvasRef} width={125} height={125} style={styles.canvas} />
  );
}

const styles = {
  canvas: {
    width: "125px",
    height: "125px",
    backgroundColor: "transparent",
    cursor: "default",
    imageRendering: "pixelated",
  },
};

export default App;