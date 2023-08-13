import React, { useRef } from "react";
import { useSnapshot } from "valtio";
import state from "../store";
import { easing } from "maath";
import { RootState, useFrame } from "@react-three/fiber";

interface CameraRigProps {
  children: React.ReactNode | React.ReactElement;
}

const CameraRig: React.FC<CameraRigProps> = ({ children }) => {
  const group:any = useRef(null);
  const snap = useSnapshot(state);

  useFrame((state:RootState, delta:number) => {
    const isBreakpoint = window.innerWidth <= 1260;
    const isMobile = window.innerWidth <= 600;
    let targetPosition:any = [-0.4, 0, 2];
    if (snap.intro) {
        if(isBreakpoint) targetPosition = [0,0,2];
        if(isMobile) targetPosition = [0,0.2,2.5];
    } else {
        if (isMobile) targetPosition = [0, 0, 2.5];
        else targetPosition = [0,0,2]
    }

    easing.damp3(state.camera.position, targetPosition, 0.25, delta);

    easing.dampE(
      group.current ? group.current.rotation : '',
      [state.pointer.y / 10, -state.pointer.x / 5, 0],
      0.25
    );
  });

  return <group ref={group}>{children}</group>;
};

export default CameraRig;
