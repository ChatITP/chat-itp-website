import React from 'react'

const Prompt = ({text = "text-holder"}) => {
  return (
    <div id = "prompt" className = "w-[415.96px] h-[91px] border border-1 border-white/50 px-6 pt-4">
      <p className = "text-base text-left">{text}</p>
    </div>
  )
}

export default Prompt
