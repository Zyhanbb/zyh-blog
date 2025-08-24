import React from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Love from './Love'

const Project: React.FC = () => {
  return (
    <Canvas camera={{ position: [0, 2, 5] }} style={{ width: '45px', height: '45px' }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 2, 2]} intensity={1} />
      <Love />
      <NewOrbitControls />
    </Canvas>
  )
}

const NewOrbitControls: React.FC = () => {
  const { camera } = useThree()

  const handleChange = () => {
    console.log('位置', camera.position)
    setTimeout(() => {
      camera.position.set(0, 2, 5)
      camera.updateProjectionMatrix()
    }, 500)
  }

  return <OrbitControls onEnd={handleChange} enableDamping={true} dampingFactor={0.9} />
}

export default Project
