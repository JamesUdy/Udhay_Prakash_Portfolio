import React, { Suspense, useState } from "react";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import styled from "styled-components";

import Social from "./Social";

import './hero.css';
import "../index.css";

import {styles} from '../styles';

import { avatar, bgImg, bgVid} from "../assets";

const Img = styled.img`
  object-fit: contain;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  animation: animate 2s infinite ease alternate;

  @keyframes animate {
    to {
      transform: translateY(10px);
    }
  }
`;

export default function Hero() {
    const [videoLoaded, setVideoLoaded] = useState(false);

    const handleVideoLoad = () => {
      setVideoLoaded(true);
    };
    return (
        <section className="relative mb-20 mx-auto lg:mb-5">
            <video
                autoPlay
                loop
                muted
                src={bgVid}
                className="object-cover relative w-full h-[700px] sm:h-[650px] md:h-[700px] lg:h-[700px]"
                onLoadedData={handleVideoLoad}
                poster={videoLoaded ? null : bgImg}
            ></video>
            <div className={`absolute lg:top-40 top-44 sm:top-28 left-16 right-16`}>
                <div className=" flex  flex-col items-center lg:flex-row justify-around">
                    <div>
                        <h1 className={`${styles.heroHeadText}`}>Hi, I'm <span className="hero-text">Udhaya Prakash M</span></h1>
                        <p className={`${styles.heroSubText} mt-2 text-white-100`}>I develop captivating user interfaces <br className="sm:block hidden" /> for exceptional web experiences.</p>
                    </div>
                    <div className="relative hero-bg">
                        <Canvas>
                            <Suspense fallback={null}>
                                <OrbitControls enableZoom={false} />
                                <ambientLight intensity={0.5} />
                                <directionalLight position={[3, 2, 1]} />
                                <Sphere args={[1, 64, 64]} scale={2.5}>
                                    <MeshDistortMaterial
                                    color="#0077b6"
                                    attach="material"
                                    distort={0.5}
                                    speed={2}
                                    />
                                </Sphere>
                            </Suspense>
                        </Canvas>
                        <Img src={avatar} alt="Hero Image" />
                    </div>
                </div>
            </div>
            <Social />
        </section>        
    )
};
