
import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Leva } from "leva";
import { UI } from "./components/UI";
import { useState, useCallback } from "react";

export const sections = ["intro", "titanium", "camera", "action-button"];

function App() {
  const [section, setSection] = useState(0);

  const handleSectionChange = useCallback((newSection) => {
    setSection(newSection);
  }, []);

  return (
    <>
      <Leva hidden/>
      <Canvas camera={{ position: [0, 0, 3], fov: 30 }}>
        <color attach="background" args={["#171720"]} />
        {/* <Experience section={section} /> */}
        <Experience section={section} sections={sections} />
      </Canvas>
      <UI
        sections={sections}
        section={section}
        onSectionChange={handleSectionChange}
      />
    </>
  );
}

export default App;
