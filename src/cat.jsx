import React, { useEffect, useRef } from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";

function App() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    const appWindow = getCurrentWindow();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = false;

    const pixelCat = [
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
      ],
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
      ],
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 1, 0, 0, 0, 0, 1, 2, 1, 1, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
      ],
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 1, 0, 0, 0, 0, 1, 2, 2, 1, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
      ],
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 1, 0, 0, 0, 0, 1, 2, 2, 1, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
      ],
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 1, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
      ],
      [
        0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1,
        0, 0, 0, 0, 0, 0, 0, 0,
      ],
      [
        0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
        1, 0, 0, 0, 0, 0, 0, 0,
      ],
      [
        0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
        1, 0, 0, 0, 0, 0, 0, 0,
      ],
      [
        0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2,
        1, 0, 0, 0, 0, 0, 0, 0,
      ],
      [
        0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 1, 2, 2, 1, 2, 2, 1, 2, 2, 1, 2, 2, 2,
        1, 0, 0, 0, 0, 0, 0, 0,
      ],
      [
        0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 2, 1, 2, 2, 1, 2, 2, 1, 2, 2, 1, 2, 2, 2,
        1, 1, 1, 0, 0, 0, 0, 0,
      ],
      [
        0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2,
        2, 2, 1, 0, 0, 0, 0, 0,
      ],
      [
        0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
        1, 1, 1, 0, 0, 0, 0, 0,
      ],
      [
        0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
        2, 2, 1, 0, 0, 0, 0, 0,
      ],
      [
        0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1,
        1, 1, 1, 0, 0, 0, 0, 0,
      ],
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
      ],
      [
        0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
        0, 0, 0, 0, 0, 0, 0, 0,
      ],
      [
        0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
        1, 1, 0, 1, 1, 1, 1, 0,
      ],
      [
        0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
        2, 1, 0, 1, 2, 2, 1, 0,
      ],
      [
        0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
        2, 1, 0, 1, 2, 2, 1, 0,
      ],
      [
        0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
        2, 1, 0, 1, 2, 2, 1, 0,
      ],
      [
        0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
        2, 1, 0, 1, 2, 2, 1, 0,
      ],
      [
        0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
        2, 1, 0, 1, 2, 2, 1, 0,
      ],
      [
        0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
        2, 1, 1, 1, 2, 2, 1, 0,
      ],
      [
        0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
        2, 2, 2, 2, 2, 2, 1, 0,
      ],
      [
        0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
        2, 2, 2, 2, 2, 2, 1, 0,
      ],
      [
        0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1,
        1, 1, 1, 1, 1, 1, 1, 0,
      ],
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 1, 0, 1, 2, 2, 2, 2, 1, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
      ],
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
      ],
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
      ],
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
      ],
    ];

    // Downscaled to fit comfortably within 125px without clipping
    const pixelSize = 3;
    const offsetX = 14;
    const offsetY = 14;

    for (let row = 0; row < pixelCat.length; row++) {
      for (let col = 0; col < pixelCat[row].length; col++) {
        const colorIndex = pixelCat[row][col];
        if (colorIndex === 0) continue;
        if (colorIndex === 1) ctx.fillStyle = "#e9e9e9";
        if (colorIndex === 2) ctx.fillStyle = "#000000";
        ctx.fillRect(
          offsetX + col * pixelSize,
          offsetY + row * pixelSize,
          pixelSize,
          pixelSize,
        );
      }
    }
    appWindow.setIgnoreCursorEvents(true);

    let running = true;
    let lastIgnore = null;

    const poll = async () => {
      if (!running) return;

      try {
        const { cursorPosition } = await import("@tauri-apps/api/window");
        const [pos, winPos, factor] = await Promise.all([
          cursorPosition(),
          appWindow.outerPosition(),
          appWindow.scaleFactor(),
        ]);

        // pos and winPos are both physical pixels, convert difference to logical
        const localX = (pos.x - winPos.x) / factor;
        const localY = (pos.y - winPos.y) / factor;

        // localX/Y are now in logical CSS pixels — same space as the canvas
        const pixel = ctx.getImageData(
          Math.floor(localX),
          Math.floor(localY),
          1,
          1,
        ).data;

        const isOpaque = pixel[3] > 0;

        if (isOpaque && lastIgnore !== false) {
          await appWindow.setIgnoreCursorEvents(false);
          lastIgnore = false;
        } else if (!isOpaque && lastIgnore !== true) {
          await appWindow.setIgnoreCursorEvents(true);
          lastIgnore = true;
        }
      } catch (e) {
        console.error(e); // temporarily log errors so we can see what's failing
      }

      setTimeout(poll, 16);
    };

    poll();

    return () => {
      running = false;
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
  },
};

export default App;