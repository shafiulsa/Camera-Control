import { CameraControls, Environment, Gltf } from "@react-three/drei";
import * as THREE from "three";
import { useControls, button } from "leva";
import { useEffect, useRef, useState } from "react";

const cameraPositions = {
  intro: [
    -0.06258848664171972,
    -0.1436835297181929,
    -1.3110457981146688,
    0,
    0,
    0
  ],
  titanium: [0.5006298758692549, 0.2291230053744947, 1.4281068475263972, -0.3944163432990971, -8.673617379884035e-19, -0.30730399954860455],
  camera: [-0.30817656179434716, -0.26346593329672413, 0.7305054419232939, 0.047618268145396936, 0.33013226291193015, -0.07551162849689386],
  "action-button": [-1.2797191136427757, -0.24741489746620626, -0.0480318527996859, 0, 0, 0],
};

export const Experience = ({ section, sections }) => {

  const controlRef = useRef(null);
  const sphere = useRef()
  const box = useRef()
  useControls("Settings", {
    smoothTime: {
      value: 0.35,
      min: 0.1,
      max: 2,
      step: 0.1,
      onChange: (value) => {
        controlRef.current.smoothTime = value;
      },
    },
  });

  useControls("Dolly test", {
    in: button(() => controlRef.current?.dolly(1, true)),
    out: button(() => controlRef.current?.dolly(-1, true)),
  });


  useControls("truck", {
    up: button(() => {
      controlRef.current?.truck(0, -0.5, true);
    }),
    left: button(() => {
      controlRef.current?.truck(-0.5, 0, true);
    }),
    down: button(() => {
      controlRef.current?.truck(0, 0.5, true);
    }),
    righth: button(() => {
      controlRef.current?.truck(0.5, 0, true);
    }),
    diagonal: button(() => {
      controlRef.current?.truck(0.5, 0.2, true);
    }),
  });


  useControls("rotate", {
    up: button(() => {
      controlRef.current?.rotate(0, -0.5, true);
    }),
    down: button(() => {
      controlRef.current?.rotate(0, 0.5, true);
    }),
    left: button(() => {
      controlRef.current?.rotate(-0.5, 0, true);
    }),
    right: button(() => {
      controlRef.current?.rotate(0.5, 0, true);
    }),
  });


  useControls("fit", {
    fitToBox: button(() => {
      controlRef.current?.fitToBox(box.current, true);
    }),
    fitToSphere: button(() => {
      controlRef.current?.fitToSphere(sphere.current, true);
    }),
  });

  // Helper to find coordinates for cameraPositions object
  useControls("helper", {
    getLookAt: button(() => {
      const position = controlRef.current.getPosition();
      const target = controlRef.current.getTarget();
      console.log([...position, ...target]);
    }),
  });

  const [introFinished, setIntroFinished] = useState(false);


  const intro = async () => {
    controlRef.current?.setLookAt(0, 0, 5, 0, 0, 0, false);
    await controlRef.current?.dolly(3, true);
    await controlRef.current?.rotate(THREE.MathUtils.degToRad(45), THREE.MathUtils.degToRad(25), true);
    setIntroFinished(true);
    playTransition();
  };
  const playTransition = () => {
    const currentSection = sections[section]; // Get the section name
    controlRef.current?.setLookAt(...cameraPositions[currentSection], true);
  };


  useEffect(() => {
    intro();
  }, []);


  useEffect(() => {
    // সেকশন পরিবর্তন হলেই ট্রানজিশন প্লে হবে
    if (!introFinished) return;
    playTransition();
  }, [section]);


  return (
    <>

      <CameraControls ref={controlRef}
        mouseButtons={{
          left: 0,   // Disables rotate
          middle: 0, // Disables zoom
          right: 0,  // Disables pan
          wheel: 0,  // Disables scroll-zoom
        }}
        // Disable all touch gestures for mobile
        touches={{
          one: 0,
          two: 0,
          three: 0,
        }}
      />
      <mesh ref={box} visible={false}>
        <boxGeometry args={[0.5, 1, 0.2]} />
        <meshBasicMaterial color="mediumpurple" wireframe />
      </mesh>

      <mesh ref={sphere} visible={false}>
        <sphereGeometry args={[0.3, 64, 64]} />
        <meshBasicMaterial color="hotpink" wireframe />
      </mesh>

      <Gltf
        position={[0, 0, 0]}
        src="models/apple_iphone_15_pro_max_black.glb"
      />
      <group rotation-y={Math.PI}>
        <Environment preset="warehouse" blur />
      </group>
    </>
  );
};