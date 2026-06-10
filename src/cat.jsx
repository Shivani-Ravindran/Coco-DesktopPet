import React, { useState, useEffect, useRef } from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { cursorPosition } from "@tauri-apps/api/window";
import { listen } from "@tauri-apps/api/event";

// Typing State Colors
const typingColors = {
  1: "#ffffff",
  2: "#9b9b9b",
  3: "#575757",
  4: "#303030",
  5: "#000000",
};

// Idle State Frame
const pixelCat = [
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 1, 0, 0, 0, 0, 1, 2, 1, 1, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 1, 0, 0, 0, 0, 1, 2, 2, 1, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 1, 0, 0, 0, 0, 1, 2, 2, 1, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 1, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 0,
    0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1,
    0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
    0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 1,
    0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 1, 2, 2, 1, 2, 2, 1, 2, 2, 1, 2, 2, 2, 1,
    0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 2, 1, 2, 2, 1, 2, 2, 1, 2, 2, 1, 2, 2, 2, 1,
    1, 1, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2,
    2, 1, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
    1, 1, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
    2, 1, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1,
    1, 1, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0,
    0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
    1, 0, 1, 1, 1, 1, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
    1, 0, 1, 2, 2, 1, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
    1, 0, 1, 2, 2, 1, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
    1, 0, 1, 2, 2, 1, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
    1, 0, 1, 2, 2, 1, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
    1, 0, 1, 2, 2, 1, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
    1, 1, 1, 2, 2, 1, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 1, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 1, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1,
    1, 1, 1, 1, 1, 1, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 1, 0, 1, 2, 2, 2, 2, 1, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
  ],
];

// Typing Frames
const typing1 = [
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 5, 1, 0, 0, 1, 5, 1, 1, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 1, 1, 5, 5, 1, 0, 0, 1, 5, 5, 1, 1, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 1, 1, 5, 5, 5, 1, 1, 1, 1, 5, 5, 5, 1, 1, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 1, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 1, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 1, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 1, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 1, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 1, 5, 5, 5, 1, 1, 5, 5, 5, 5, 5, 1, 1, 5, 5, 5, 5, 5, 1, 1, 0,
    0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 1, 5, 5, 1, 5, 5, 1, 5, 5, 5, 1, 5, 5, 1, 5, 5, 5, 5, 5, 1, 1,
    0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 1, 1, 1, 5, 5, 1, 5, 5, 1, 5, 5, 5, 1, 5, 5, 1, 5, 5, 5, 5, 5, 5, 1,
    1, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 1, 5, 5, 5, 5, 5, 1, 1, 5, 5, 5, 5, 5, 1, 1, 5, 5, 5, 5, 5, 5, 5, 5,
    1, 1, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 1, 1, 1, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
    5, 1, 1, 0, 0, 0, 0,
  ],
  [
    0, 0, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
    5, 5, 1, 1, 0, 0, 0,
  ],
  [
    0, 0, 1, 1, 1, 1, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
    5, 5, 5, 1, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 1, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
    5, 5, 5, 1, 1, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
    5, 5, 5, 5, 1, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
    5, 5, 5, 5, 1, 1, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
    5, 5, 5, 5, 5, 1, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 5, 5, 5, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
    5, 5, 5, 5, 5, 1, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 5, 5, 5, 1, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
    5, 5, 5, 5, 5, 1, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 5, 5, 5, 1, 0, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5,
    5, 5, 5, 5, 5, 1, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 5, 5, 5, 1, 0, 0, 1, 5, 5, 5, 5, 5, 5, 2, 2,
    2, 2, 2, 2, 2, 1, 0,
  ],
  [
    0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 5, 5, 5, 1, 1, 1, 1, 5, 5, 2, 5, 5, 5, 2, 2,
    2, 2, 2, 2, 4, 1, 0,
  ],
  [
    0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 5, 5, 5, 2, 2, 2, 1, 5, 2, 2, 5, 5, 5, 2, 2,
    2, 2, 2, 4, 4, 1, 0,
  ],
  [
    0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 5, 5, 5, 2, 2, 2, 1, 2, 2, 5, 5, 5, 5, 2, 2,
    2, 2, 4, 4, 4, 1, 0,
  ],
  [
    0, 0, 0, 1, 2, 2, 2, 2, 2, 5, 5, 5, 5, 2, 2, 4, 2, 2, 2, 5, 5, 5, 5, 2, 2,
    2, 4, 4, 4, 4, 1, 0,
  ],
  [
    0, 0, 1, 2, 2, 2, 2, 2, 2, 5, 5, 5, 5, 2, 4, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    3, 4, 4, 4, 4, 1, 0,
  ],
  [
    0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    3, 4, 4, 4, 4, 1, 0,
  ],
  [
    1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 1, 0, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    3, 4, 4, 4, 1, 1, 0,
  ],
  [
    1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 1, 0, 0, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    3, 4, 4, 1, 1, 0, 0,
  ],
  [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 0, 0, 0,
  ],
];

const typing2 = [
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 5, 1, 0, 0, 1, 5, 1, 1, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 1, 1, 5, 5, 1, 0, 0, 1, 5, 5, 1, 1, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 1, 1, 5, 5, 5, 1, 1, 1, 1, 5, 5, 5, 1, 1, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 1, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 1, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 1, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 1, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 1, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 1, 5, 5, 5, 1, 1, 5, 5, 5, 5, 5, 1, 1, 5, 5, 5, 5, 5, 1, 1, 0,
    0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 1, 5, 5, 1, 5, 5, 1, 5, 5, 5, 1, 5, 5, 1, 5, 5, 5, 5, 5, 1, 1,
    0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 1, 1, 1, 5, 5, 1, 5, 5, 1, 5, 5, 5, 1, 5, 5, 1, 5, 5, 5, 5, 5, 5, 1,
    1, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 1, 5, 5, 5, 5, 5, 1, 1, 5, 5, 5, 5, 5, 1, 1, 5, 5, 5, 5, 5, 5, 5, 5,
    1, 1, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 1, 1, 1, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
    5, 1, 1, 0, 0, 0, 0,
  ],
  [
    0, 0, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
    5, 5, 1, 1, 0, 0, 0,
  ],
  [
    0, 0, 1, 1, 1, 1, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
    5, 5, 5, 1, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
    5, 5, 5, 1, 1, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
    5, 5, 5, 5, 1, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
    5, 5, 5, 5, 1, 1, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
    5, 5, 5, 5, 5, 1, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 5, 5, 5, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
    5, 5, 5, 5, 5, 1, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 5, 5, 5, 1, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
    5, 5, 5, 5, 5, 1, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 5, 5, 5, 1, 1, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5,
    5, 5, 5, 5, 5, 1, 0,
  ],
  [
    0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 5, 5, 5, 2, 2, 1, 1, 5, 5, 5, 5, 5, 5, 5, 5,
    5, 5, 5, 5, 5, 1, 0,
  ],
  [
    0, 0, 0, 0, 1, 2, 2, 2, 2, 5, 5, 5, 5, 2, 4, 1, 1, 5, 5, 5, 5, 5, 5, 5, 5,
    5, 5, 5, 5, 5, 1, 1,
  ],
  [
    0, 0, 0, 1, 2, 2, 2, 2, 2, 5, 5, 5, 5, 4, 4, 1, 1, 5, 5, 5, 5, 5, 5, 2, 2,
    2, 2, 2, 2, 2, 2, 1,
  ],
  [
    0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 1, 1, 5, 5, 5, 5, 5, 5, 2, 2,
    2, 2, 2, 2, 2, 4, 1,
  ],
  [
    1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 1, 1, 5, 5, 5, 5, 5, 5, 2, 2,
    2, 2, 2, 2, 4, 4, 1,
  ],
  [
    1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 1, 1, 5, 5, 2, 5, 5, 5, 2, 2,
    2, 2, 2, 4, 4, 1, 1,
  ],
  [
    1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 1, 1, 1, 5, 2, 5, 5, 5, 5, 2, 2,
    2, 2, 4, 4, 1, 1, 0,
  ],
  [
    1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 1, 1, 0, 1, 2, 2, 5, 5, 5, 5, 2, 2,
    2, 4, 4, 1, 1, 0, 0,
  ],
  [
    1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 1, 1, 0, 0, 1, 3, 3, 3, 3, 3, 3, 3, 3,
    4, 4, 1, 1, 0, 0, 0,
  ],
  [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 0, 0, 0, 0,
  ],
];

function App() {
  const canvasRef = useRef(null);
  const isBlinkingRef = useRef(false);
  const isTypingRef = useRef(false);
  const [isTyping, setIsTyping] = useState(false);

  // Blinking Logic
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      isBlinkingRef.current = true;
      setTimeout(() => {
        isBlinkingRef.current = false;
      }, 200);
    }, 5000);

    return () => {
      clearInterval(blinkInterval);
    };
  }, []);

  // Typing Listener Logic
  useEffect(() => {
    let unlistenFunc;
    let animationTimeout;

    const setupTauriListener = async () => {
      unlistenFunc = await listen("global-typing", () => {
        setIsTyping(true);
        isTypingRef.current = true;

        if (animationTimeout) clearTimeout(animationTimeout);

        // Return to rest (idle frame) 350ms after the last keystroke
        animationTimeout = setTimeout(() => {
          setIsTyping(false);
          isTypingRef.current = false;
        }, 350);
      });
    };

    setupTauriListener();

    return () => {
      if (unlistenFunc) unlistenFunc();
      if (animationTimeout) clearTimeout(animationTimeout);
    };
  }, []);

  // Canvas Rendering Logic
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    const appWindow = getCurrentWindow();

    const handleMouseDown = async (e) => {
      if (e.button === 0) {
        try {
          await appWindow.startDragging();
        } catch (err) {
          console.error("Failed to start window drag:", err);
        }
      }
    };

    canvas.addEventListener("mousedown", handleMouseDown);

    ctx.imageSmoothingEnabled = false;

    const pixelSize = 3;
    const offsetX = 14;
    const offsetY = 14;

    appWindow.setIgnoreCursorEvents(true);
    let running = true;
    let lastTime = null;
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
          const pixel = ctx.getImageData(
            Math.floor(localX),
            Math.floor(localY),
            1,
            1,
          ).data;
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

    const render = (timestamp) => {
      if (!running) return;

      const dt = lastTime ? Math.min((timestamp - lastTime) / 16.67, 3) : 1;
      lastTime = timestamp;

      // Calculate the tracking physics for the Idle state
      const targetHeadX = Math.max(-0.75, Math.min(0.75, (localX - 62.5) / 35));
      const targetHeadY = Math.max(0, Math.min(0.75, (localY - 62.5) / 35));

      const targetPupilX = Math.max(-0.7, Math.min(0.7, (localX - 62.5) / 30));
      const targetPupilY = Math.max(-0.7, Math.min(0.7, (localY - 62.5) / 30));

      const reactSpeed = 1 - Math.pow(1 - 0.15, dt);
      currentHeadX += (targetHeadX - currentHeadX) * reactSpeed;
      currentHeadY += (targetHeadY - currentHeadY) * reactSpeed;
      currentPupilX += (targetPupilX - currentPupilX) * reactSpeed;
      currentPupilY += (targetPupilY - currentPupilY) * reactSpeed;

      const headRenderX = Math.round(currentHeadX * pixelSize);
      const headRenderY = Math.round(currentHeadY * pixelSize);
      const pupilRenderX = Math.round(currentPupilX * pixelSize);
      const pupilRenderY = Math.round(currentPupilY * pixelSize);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isTypingRef.current) {
        const activeFrame =
          Math.floor(timestamp / 150) % 2 === 0 ? typing1 : typing2;

        for (let row = 0; row < activeFrame.length; row++) {
          for (let col = 0; col < activeFrame[row].length; col++) {
            const colorKey = activeFrame[row][col];
            if (colorKey !== 0) {
              ctx.fillStyle = typingColors[colorKey];
              ctx.fillRect(
                offsetX + col * pixelSize,
                offsetY + row * pixelSize,
                pixelSize,
                pixelSize,
              );
            }
          }
        }
      } 
      else {
        const deferredPupils = [];

        for (let row = 0; row < pixelCat.length; row++) {
          for (let col = 0; col < pixelCat[row].length; col++) {
            const colorIndex = pixelCat[row][col];
            if (colorIndex === 0) continue;

            const isBody = row >= 16;
            const isEyeRegion =
              row >= 9 &&
              row <= 12 &&
              ((col >= 11 && col <= 14) || (col >= 17 && col <= 20));
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
              if (isBlinkingRef.current && isEyeRegion) {
                ctx.fillStyle = "#000000";
                ctx.fillRect(
                  offsetX + col * pixelSize + headRenderX,
                  offsetY + row * pixelSize + headRenderY,
                  pixelSize,
                  pixelSize,
                );
              } else if (isPupil) {
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
        if (!isBlinkingRef.current) {
          ctx.fillStyle = "#000000";
          for (const p of deferredPupils) {
            ctx.fillRect(
              offsetX + p.col * pixelSize + headRenderX + pupilRenderX,
              offsetY + p.row * pixelSize + headRenderY + pupilRenderY,
              pixelSize,
              pixelSize,
            );
          }
        }
      }

      rafId = requestAnimationFrame(render);
    };

    updateCursor();
    updateIgnore();
    rafId = requestAnimationFrame(render);

    return () => {
      running = false;
      if (rafId) cancelAnimationFrame(rafId);
      canvas.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  return (
  <canvas
    ref={canvasRef}
    width={125}
    height={125}
    style={styles.canvas}
  />
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
