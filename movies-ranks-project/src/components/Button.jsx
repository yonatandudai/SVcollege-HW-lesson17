import React from 'react'

export default function Button({text, onClick}) {
  //activate the onClick function when the button is clicked

  return (
    <button onClick={onClick} className='bg-sky-400 hover:bg-gray-600 px-4 py-2 rounded-full cursor-pointer'>{text}</button>
  )
}
