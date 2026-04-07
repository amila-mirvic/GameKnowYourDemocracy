import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { GameProvider } from "./app/GameProvider";

import WelcomeScreen from "./screens/Welcome/WelcomeScreen";
import SetupScreen from "./screens/Setup/SetupScreen";
import WorldSelectorScreen from "./screens/WorldSelector/WorldSelectorScreen";

import World1TaskSelectorScreen from "./screens/World1TaskSelector/World1TaskSelectorScreen";
import World2TaskSelectorScreen from "./screens/World2TaskSelector/World2TaskSelectorScreen";
import World3TaskSelectorScreen from "./screens/World3TaskSelector/World3TaskSelectorScreen";
import World4TaskSelectorScreen from "./screens/World4TaskSelector/World4TaskSelectorScreen";

import World1Task1IntroScreen from "./screens/World1Task1Intro/World1Task1IntroScreen";
import World1Task1Screen from "./screens/World1Task1/World1Task1Screen";
import World1Task2IntroScreen from "./screens/World1Task2Intro/World1Task2IntroScreen";
import World1Task2Screen from "./screens/World1Task2/World1Task2Screen";
import World1Task3IntroScreen from "./screens/World1Task3Intro/World1Task3IntroScreen";
import World1Task3Screen from "./screens/World1Task3/World1Task3Screen";
import World1Task4IntroScreen from "./screens/World1Task4Intro/World1Task4IntroScreen";
import World1Task4InstructionsScreen from "./screens/World1Task4Instructions/World1Task4InstructionsScreen";
import World1Task4Screen from "./screens/World1Task4/World1Task4Screen";

import World2Task1IntroScreen from "./screens/World2Task1IntroScreen/World2Task1IntroScreen";
import World2Task1Screen from "./screens/World2Task1Screen/World2Task1Screen";
import World2Task2IntroScreen from "./screens/World2Task2IntroScreen/World2Task2IntroScreen";
import World2Task2Screen from "./screens/World2Task2Screen/World2Task2Screen";
import World2Task3IntroScreen from "./screens/World2Task3IntroScreen/World2Task3IntroScreen";
import World2Task3Screen from "./screens/World2Task3Screen/World2Task3Screen";

import World3Task1IntroScreen from "./screens/World3Task1IntroScreen/World3Task1IntroScreen";
import World3Task1Screen from "./screens/World3Task1Screen/World3Task1Screen";
import World3Task2IntroScreen from "./screens/World3Task2IntroScreen/World3Task2IntroScreen";
import World3Task2Screen from "./screens/World3Task2Screen/World3Task2Screen";
import World3Task3IntroScreen from "./screens/World3Task3IntroScreen/World3Task3IntroScreen";
import World3Task3Screen from "./screens/World3Task3Screen/World3Task3Screen";
import World3Task4IntroScreen from "./screens/World3Task4IntroScreen/World3Task4IntroScreen";
import World3Task4Screen from "./screens/World3Task4Screen/World3Task4Screen";
import World3Task4OutroScreen from "./screens/World3Task4OutroScreen/World3Task4OutroScreen";

import World4Task1IntroScreen from "./screens/World4Task1IntroScreen/World4Task1IntroScreen.js";
import World4Task1Screen from "./screens/World4Task1Screen/World4Task1Screen";
import World4Task2IntroScreen from "./screens/World4Task2IntroScreen/World4Task2IntroScreen";
import World4Task2Screen from "./screens/World4Task2Screen/World4Task2Screen";
import World4Task3IntroScreen from "./screens/World4Task3IntroScreen/World4Task3IntroScreen";
import World4Task3Screen from "./screens/World4Task3Screen/World4Task3Screen";
import World4Task4IntroScreen from "./screens/World4Task4IntroScreen/World4Task4IntroScreen";
import World4Task4Screen from "./screens/World4Task4Screen/World4Task4Screen";

export default function App() {
  return (
    <GameProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/setup" element={<SetupScreen />} />
          <Route path="/world-select" element={<WorldSelectorScreen />} />

          <Route path="/world-1" element={<World1TaskSelectorScreen />} />
          <Route path="/world-2" element={<World2TaskSelectorScreen />} />
          <Route path="/world-3" element={<World3TaskSelectorScreen />} />
          <Route path="/world-4" element={<World4TaskSelectorScreen />} />

          <Route path="/world-1/task-1-intro" element={<World1Task1IntroScreen />} />
          <Route path="/world-1/task-1" element={<World1Task1Screen />} />
          <Route path="/world-1/task-2-intro" element={<World1Task2IntroScreen />} />
          <Route path="/world-1/task-2" element={<World1Task2Screen />} />
          <Route path="/world-1/task-3-intro" element={<World1Task3IntroScreen />} />
          <Route path="/world-1/task-3" element={<World1Task3Screen />} />
          <Route path="/world-1/task-4-intro" element={<World1Task4IntroScreen />} />
          <Route path="/world-1/task-4-instructions" element={<World1Task4InstructionsScreen />} />
          <Route path="/world-1/task-4" element={<World1Task4Screen />} />

          <Route path="/world-2/task-1-intro" element={<World2Task1IntroScreen />} />
          <Route path="/world-2/task-1" element={<World2Task1Screen />} />
          <Route path="/world-2/task-2-intro" element={<World2Task2IntroScreen />} />
          <Route path="/world-2/task-2" element={<World2Task2Screen />} />
          <Route path="/world-2/task-3-intro" element={<World2Task3IntroScreen />} />
          <Route path="/world-2/task-3" element={<World2Task3Screen />} />

          <Route path="/world-3/task-1-intro" element={<World3Task1IntroScreen />} />
          <Route path="/world-3/task-1" element={<World3Task1Screen />} />
          <Route path="/world-3/task-2-intro" element={<World3Task2IntroScreen />} />
          <Route path="/world-3/task-2" element={<World3Task2Screen />} />
          <Route path="/world-3/task-3-intro" element={<World3Task3IntroScreen />} />
          <Route path="/world-3/task-3" element={<World3Task3Screen />} />
          <Route path="/world-3/task-4-intro" element={<World3Task4IntroScreen />} />
          <Route path="/world-3/task-4" element={<World3Task4Screen />} />
          <Route path="/world-3/task-4-outro" element={<World3Task4OutroScreen />} />

          <Route path="/world-4/task-1-intro" element={<World4Task1IntroScreen />} />
          <Route path="/world-4/task-1" element={<World4Task1Screen />} />
          <Route path="/world-4/task-2-intro" element={<World4Task2IntroScreen />} />
          <Route path="/world-4/task-2" element={<World4Task2Screen />} />
          <Route path="/world-4/task-3-intro" element={<World4Task3IntroScreen />} />
          <Route path="/world-4/task-3" element={<World4Task3Screen />} />
          <Route path="/world-4/task-4-intro" element={<World4Task4IntroScreen />} />
          <Route path="/world-4/task-4" element={<World4Task4Screen />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </GameProvider>
  );
}