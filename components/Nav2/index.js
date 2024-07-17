import React from 'react'
import Image from "next/image"
import Input from "@/components/Nav2/input"

const Nav = () => {
  return (
    
    <nav className="w-[100vw] h-[61px] bg-black">
      <div className='flex flex-row'>
        <div>
        <Image src = "/logo.svg" alt='logo' width={77.7} height={61}/>

        </div>
        <div className='my-auto'>
            <Input />
        </div>
      </div>
    </nav>
   
  )
}

export default Nav
