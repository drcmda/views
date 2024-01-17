'use client'

import { Canvas, addEffect } from '@react-three/fiber'
import { Preload, View } from '@react-three/drei'
import Lenis from '@studio-freight/lenis'

// Use lenis smooth scroll
const lenis = new Lenis()
addEffect((t) => lenis.raf(t))

export default function Scene({ style, ...props }) {
  return (
    <Canvas
      shadows
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        ...style,
      }}
      eventSource={document.body}
      eventPrefix='client'
      {...props}>
      <View.Port />
      <Preload all />
    </Canvas>
  )
}
