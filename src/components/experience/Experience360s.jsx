import React from 'react'
import { BackSide, TextureLoader } from 'three'
import { degToRad } from 'three/src/math/MathUtils'

export default function Experience360s({data}) {
  const texture=new TextureLoader().load(data?._360sImages[0]?.url)
  // console.log('Experience360s',texture)
  return (
    <mesh
      rotation={[0, degToRad(90), 0]}
      scale={[1,1,-1]}
    >
      <sphereGeometry args={[32,500,500]}/>
      <meshBasicMaterial 
        side={BackSide}
        map={texture}
      />
    </mesh>
  )
}
