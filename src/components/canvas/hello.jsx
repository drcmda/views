'use client'

import * as THREE from 'three'
import { useState, useRef, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations, useCursor, OrthographicCamera } from '@react-three/drei'

const normalMaterial = new THREE.MeshNormalMaterial()

function Model(props) {
  const { scene } = useGLTF('/hello-text.glb')
  return <primitive object={scene} {...props} />
}

function Fragments({ visible, ...props }) {
  const group = useRef()
  const { scene, animations, materials } = useGLTF('/hello-fragments.glb')
  const { actions } = useAnimations(animations, group)
  // Exchange inner material
  useMemo(() => scene.traverse((o) => o.type === 'Mesh' && o.material === materials.inner && (o.material = normalMaterial)), [])
  // Play actions
  useEffect(() => {
    if (visible)
      Object.keys(actions).forEach((key) => {
        actions[key].repetitions = 0
        actions[key].clampWhenFinished = true
        actions[key].play()
      })
  }, [visible])
  return <primitive ref={group} object={scene} {...props} />
}

export default function Scene() {
  const vec = new THREE.Vector3()
  const [clicked, setClicked] = useState(false)
  const [hovered, setHovered] = useState(false)
  useCursor(hovered)
  useFrame((state) => {
    state.camera.position.lerp(vec.set(clicked ? -10 : 0, clicked ? 10 : 0, 20), 0.1)
    state.camera.lookAt(0, 0, 0)
  })
  return (
    <>
      <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={300} />
      <Fragments visible={clicked} />
      {!clicked && <Model onClick={() => (setClicked(true), setHovered(false))} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} />}
    </>
  )
}

useGLTF.preload('/hello-text.glb')
useGLTF.preload('/hello-fragments.glb')
