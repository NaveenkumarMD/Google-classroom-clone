import React, { useState, useRef, useEffect } from 'react'

function Textbox(props) {
    console.log(props)
    const [flag, setflag] = useState('none')
    const [brad, setbrad] = useState('30px')
    const [border, setBorder] = useState(null)
    const [height, setheight] = useState(null)
    const contentref = useRef(null)
    const titleref = useRef(null)
    

    const handleclick = () => {
        props.onChangetitle(titleref.current.innerHTML)    
        props.onChangecontent(contentref.current.innerHTML) 
        props.onsubmit(titleref.current.innerHTML,contentref.current.innerHTML)
        titleref.current.innerHTML=""
        contentref.current.innerHTML=""
    }

    return (
        <div style={{ marginTop: '30px',margin:"10px auto"}}>

            <div contentEditable ref={titleref} placeholder="Title" className="title" style={{ display: flag }}></div>
            <div contentEditable ref={contentref} placeholder="Announce something to your class.." className="textbox" onClick={() => {
                setflag(null)
                setBorder('0px')
                setheight('150px')
            }} style={{borderTopLeftRadius:border,borderTopRightRadius:border,height:height}}></div>
            <div className="btn-group">
            <div>

            </div>
            <div className="btn-group">
            <div style={{ textAlign: '', marginTop: '20px', display: flag ,marginRight:"20px"}}>
                <button className="btn" onClick={()=>{
                    setflag('none')
                    setheight('20px')
                    setBorder(null)
                }}>Cancel</button>
            </div>
            <div style={{ textAlign: '', marginTop: '20px', display: flag }}>
                <button className="btn" onClick={handleclick}>Done</button>
            </div>
            </div>
            </div>

        </div>
    )
}

export default Textbox