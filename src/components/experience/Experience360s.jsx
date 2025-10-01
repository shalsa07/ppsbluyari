"use client";
import React, { useEffect, useState } from 'react';
import { BackSide, TextureLoader } from 'three'
import { degToRad } from 'three/src/math/MathUtils';import { useMemo } from 'react';

export default function Experience360s({data,experienceState}) {
  const [texture, setTexture] = useState(null)
  const textureLoader = new TextureLoader();

  const getFilteredTexture = () => {
    if (!data?._360sImages) return null
    return data?._360sImages.find(image => image.name === experienceState?._360TextureName) || data?._360sImages[0];
  }

  const filteredTexture = getFilteredTexture();
  const textureURL = filteredTexture?.url;
  useEffect(() => {
    if (textureURL) {
      textureLoader.load(textureURL, (newTexture) => {
        setTexture(newTexture);
      });
    }
  }, [textureURL, experienceState?._360TextureName]);

    if (!texture) {
    return null; // Or a loading indicator
  }
  console.log('Experience360s',experienceState?._360TextureName)

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
