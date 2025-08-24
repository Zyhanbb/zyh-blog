import React, { useRef, useState, useContext, type JSX } from 'react'
import { useGLTF } from '@react-three/drei'
import { MeshStandardMaterial } from 'three'
import MyContext from '../../contexts/Context'
import type { GLTF } from 'three-stdlib'
import * as THREE from 'three'

// 类型定义：GLTF 模型结构
type GLTFResult = GLTF & {
  nodes: {
    texture_v100001: THREE.Mesh
  }
  materials: {
    [key: string]: THREE.Material
  }
}

// 注意：JSX 类型需在 tsconfig 中配置 "jsx": "react-jsx"
export default function Model(props: JSX.IntrinsicElements['group']) {
  const { nodes } = useGLTF('/love.glb') as unknown as GLTFResult
  const { data, setData } = useContext(MyContext)!
  const [scale, setScale] = useState<number>(4)
  const [color, setColor] = useState<string>('black')
  const originalScale = useRef<number>(4)

  const handleClick = () => {
    setScale(5)
    setColor('red')
    setData(!data)
    console.log('data', data)
    setTimeout(() => {
      setScale(originalScale.current)
    }, 250)
  }

  return (
    <group {...props} dispose={null} scale={scale}>
      <mesh
        geometry={nodes.texture_v100001.geometry}
        material={new MeshStandardMaterial({ color })}
        rotation={[Math.PI / 2, 0, 0]}
        onClick={handleClick}
      />
    </group>
  )
}

useGLTF.preload('/love.glb')
