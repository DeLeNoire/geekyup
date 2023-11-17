/* eslint-disable react/no-children-prop */
'use client'
import TabsBar from "@/components/tabs";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MeshComponent } from "../../components/modelLib";


export default function RenderModel() {

  
  return (
    <>

      <main className=" bg-gradient-to-r via-[#fbfdfb] from-rose-50 to-white w-screen h-screen flex overflow-scroll mt-0 rounded-lg">
        <div className="h-screen w-screen">        
        <Canvas className=' flex justify-center items-center w-[1200px] h-[900px] overflow-auto'>
        <OrbitControls />
        <ambientLight />
        <pointLight position={[0, 0, 0]} />
        <MeshComponent/>
        </Canvas> 

        </div>
        
      </main>
     
    </>
  );
}
