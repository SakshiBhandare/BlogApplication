import React from 'react'
import { GiButterfly } from "react-icons/gi";

function Logo({ width = '100px' }) {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center'
    }}>
      <GiButterfly style={{ width: '3rem', height: '3rem', color: 'purple' }}/>
    </div>
  )
}

export default Logo
