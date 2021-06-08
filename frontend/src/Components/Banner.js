import React from 'react'

function Banner(props) {
   
    return (
        <div className="banner">
            <div className="banner-title">
                {props.name}
            </div>
        </div>
    )
}

export default Banner
