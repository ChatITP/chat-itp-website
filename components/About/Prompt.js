import React from 'react'

const Prompt = ({text = "text-holder"}) => {
  return (
    <div id = "prompt" className = "w-[500px] h-[91px] border border-1 border-white/50 px-6 pt-4 rounded-lg">
      <p className = "text-sm text-left">{text}</p>
    </div>
  )
}

export default Prompt
