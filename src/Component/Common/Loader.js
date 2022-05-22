import React from 'react'
import CircularProgress from "@mui/material/CircularProgress";
const Loader = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
        <CircularProgress size={100} />
    </div>
  )
}

export default Loader