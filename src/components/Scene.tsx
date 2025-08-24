import React from 'react'
import { Canvas } from '@react-three/fiber'
import Character from './Character'
import * as THREE from 'three';
export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 2, 5], fov: 50 }}
      gl={{
    toneMapping: THREE.NoToneMapping,        // 🔥 关闭色调压缩，让光真正亮起来
    outputColorSpace: THREE.SRGBColorSpace,  // 重要：正确显示颜色
  }}>
      <ambientLight intensity={2} />
      <directionalLight
        position={[5, 10, 5]}
        intensity={2}
        castShadow
      />
      <hemisphereLight color={'#ffffff'} groundColor={'#444444'} intensity={0.8} />
      <Character />
    </Canvas>
  )
}
