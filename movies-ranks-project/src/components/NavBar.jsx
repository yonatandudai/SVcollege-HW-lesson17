import React from 'react'
import Button from './Button'

export default function NavBar({handleAdd, handleSearch, handleDelete, handleHome}) {
  return (
    <div className='bg-teal-200 w-screen h-16 flex justify-around items-center p-4 mt-8'>
        <Button text="Add" onClick={handleAdd}/>
        <Button text="Search" onClick={handleSearch}/>
        <Button text="Delete" onClick={handleDelete}/>
        <Button text="Home" onClick={handleHome}/>
    </div>
  )
}
