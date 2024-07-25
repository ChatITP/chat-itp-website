import React from 'react'
import Image from "next/image"

const Card = ({topic = "topic holder", des = "des holder", IconSrc = "community.svg"}) => {
  return (
    <div id = "Card" className='w-[367.28px] h-[200px] px-8 pt-4 border border-1 border-white/50 bg-gradient-to-r from-white/40 to-white/20 rounded-xl'>
        <div className='flex flex-col '>
        <Image
                src={`/${IconSrc}`}
                alt={topic}
                width={320}
                height={320}
                className="w-[45px] h-auto pb-4"
              />

            <h2 className='text-lg capitalize font-semibold pb-2'>{topic}</h2>
            <p className = "text-sm">{des}</p>
        </div>
    </div>
  )
}

export default Card
