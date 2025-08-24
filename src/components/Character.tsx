import React, { useRef, useEffect, useState } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import * as THREE from 'three'

export default function Character() {
  const group = useRef<THREE.Group>(null!)
  const idleFbx = useLoader(FBXLoader, '/character_idle.fbx')
  const waveFbx = useLoader(FBXLoader, '/character_wave.fbx')

  const mixer = useRef<THREE.AnimationMixer | null>(null)
  const [currentAction, setCurrentAction] = useState<'idle' | 'wave'>('idle')

  // 👇 修复材质的函数
const fixMaterials = (model: THREE.Group) => {
  model.traverse((child) => {
    // ✅ 使用 'isMesh' 类型断言（推荐）
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh
      let material = mesh.material

      // 处理材质数组
      if (Array.isArray(material)) {
        mesh.material = material.map((mat) => createStandardMaterial(mat))
      } else {
        mesh.material = createStandardMaterial(material)
      }
    }
  })
}

// 单独提取函数，类型更清晰
function createStandardMaterial(mat: THREE.Material): THREE.MeshStandardMaterial {
  // ✅ 确保是 MeshStandardMaterial 或 MeshBasicMaterial 才读取属性
  if (!(mat instanceof THREE.MeshPhongMaterial || 
        mat instanceof THREE.MeshLambertMaterial || 
        mat instanceof THREE.MeshBasicMaterial || 
        mat instanceof THREE.MeshStandardMaterial)) {
    // 如果是其他材质（如 LineMaterial），返回默认
    return new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5, metalness: 0.2 })
  }

  // ✅ 此时 TypeScript 知道 mat 有这些属性
  const standardMat = new THREE.MeshStandardMaterial({
    color: mat.color || 0xffffff,
    map: mat.map,
    normalMap: (mat as any).normalMap, // normalMap 不在基础 Material 上，需断言
    roughness: 0.5,
    metalness: 0.2,
    emissive: new THREE.Color(0x333333),
    emissiveIntensity: 1.5,
  })

  // ✅ 如果有贴图，设置颜色空间
  if (mat.map) {
    mat.map.colorSpace = THREE.SRGBColorSpace
  }

  // 释放旧材质
  mat.dispose()

  return standardMat
}

  useEffect(() => {
    if (!idleFbx || !waveFbx) return

    // 🔧 修复两个模型的材质
    fixMaterials(idleFbx)
    fixMaterials(waveFbx)

    // 初始添加 Idle
    group.current.add(idleFbx)
    idleFbx.scale.set(5, 5, 5)

    mixer.current = new THREE.AnimationMixer(idleFbx)
    mixer.current.clipAction(idleFbx.animations[0]).play()

    const handleClick = () => {
      mixer.current?.stopAllAction() // ✅ 正确方法名：stopAllActions()
      group.current.clear()

      if (currentAction === 'idle') {
        group.current.add(waveFbx)
        waveFbx.scale.set(5, 5, 5)
        mixer.current = new THREE.AnimationMixer(waveFbx)
        mixer.current.clipAction(waveFbx.animations[0]).play()
        setCurrentAction('wave')
      } else {
        group.current.add(idleFbx)
        idleFbx.scale.set(5, 5, 5)
        mixer.current = new THREE.AnimationMixer(idleFbx)
        mixer.current.clipAction(idleFbx.animations[0]).play()
        setCurrentAction('idle')
      }
    }

    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [idleFbx, waveFbx, currentAction])

  useFrame((_, delta) => {
    mixer.current?.update(delta)
  })

  return <group ref={group} />
}