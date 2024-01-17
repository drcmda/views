'use client'

import { PerspectiveCamera, OrbitControls } from '@react-three/drei'

export default function Common({ color, controls }) {
  return (
    <>
      {/*color && <color attach='background' args={[color]} />*/}
      <ambientLight intensity={Math.PI} />
      <directionalLight position={[10, 10, 5]} intensity={5} castShadow />
      <directionalLight position={[-10, -0, -10]} color={color} intensity={3} />
      <PerspectiveCamera makeDefault fov={40} position={[0, 0, 6]} />
      {controls && <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 2} enableZoom={false} />}
    </>
  )
}
