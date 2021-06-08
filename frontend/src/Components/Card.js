import React from 'react'
import { MoreVert, NavigateNext } from '@material-ui/icons'
import {useHistory} from 'react-router-dom'
import Options from './Icons/Options'
function Card(props) {
    const history=useHistory()
    console.log(props.func)
    const handleopen=()=>{
        history.push(`/Class/${props.name}`)
    }
    return (
        <div className="card">
            <div className="card-header">
                <div>
                    <div className="card-header-text">
                        {props.name}
                </div>
                    <div className="dot">
                        <Options />
                    </div>
                </div>
                <div className="card-header-description">
                    {props.staff}
                </div>
            </div>
            <div className="card-profile">

            </div>
            <div className="card-footer" onClick={()=>handleopen()}>
                <div></div>
                <div>
                    <span className="open-text" >Open</span>
                    <NavigateNext className="next-icon" />
                </div>

            </div>
        </div>
    )
}
export default Card
