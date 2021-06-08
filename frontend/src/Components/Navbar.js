import React from 'react'
import Classroom from './Icons/Classroom'

function Navbar() {
    return (<
        div className="navbar" >
        <div className="navbar-icon" >
            <Classroom size={30}
            /> </div>  <div className="navbar-title" >
                Classroom </div> </div>
    )
}
export default Navbar