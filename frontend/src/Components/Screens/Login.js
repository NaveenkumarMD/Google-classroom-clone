import React, { useState ,useRef,useContext} from 'react'
import Navbar from '../Navbar'
import Classroom from '../Icons/Classroom'
import LinearProgress from '@material-ui/core/LinearProgress';
import { Link,useHistory } from 'react-router-dom'
import Alert from '../Alert'
import {Maincontext,} from '../../App'
import { DataUsageOutlined } from '@material-ui/icons';
function Login() {
    const {state,dispatch}=useContext(Maincontext)
    const [loading, setLoading] = useState(false)
    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")
    const [res, setResponse] = useState("")
    const [title,setTitle]=useState("")
    const [open,setOpen]=useState(false)
    const alertref=useRef()
    const history=useHistory()
    const login = async () => {
        setLoading(true)
        await fetch("/login", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                "mail": mail,
                "password": password
            })

        }).then(res => res.json()).then(data => {
            setLoading(false)
            if(data.name){
                dispatch({
                    type: "USER",
                    payload:data
                })
                setTitle("Success")
                setResponse("Successfully logged in")
                alertref.current.getAlert()
                setTimeout(()=>history.push("/"),3000)
            }
            if(data.err){
                setTitle("Error")
                setResponse(data.err)
                alertref.current.getAlert()
            }
            
            console.log(data)
        }).catch(err => {
            setLoading(false)
            console.log(err.message)
        })
        setLoading(false)
    }
    return (
        <div >
            <Navbar />
            { loading && < LinearProgress color="secondary" />}
            <div className="login-card" >
                <div style={{ textAlign: "center", marginTop: "10px" }}>
                    <Classroom size={90} />
                    <div className="login-text" >
                        Login
                </div>
                </div>
                <div style={{
                    marginTop: "50px"
                }}>
                    <form>
                        <label for="mail" className="label">Mail</label> <br />
                        <div style={{ textAlign: "center" }}>
                            <input name="mail" className="input" value={mail} onChange={(e) => setMail(e.target.value)} /> <br />
                        </div>

                        <label for="password" className="label">Password</label><br />
                        <div style={{ textAlign: "center" }}>
                            <input name="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} /></div>
                    </form>
                    <div style={{ textAlign: "center" }}>
                        <button className="button" onClick={login}>Login</button>
                        <div className="link">
                            <Link to="/Signup" className="link">New to classroom?</Link>
                        </div>
                    </div>

                </div>
                <Alert text={res} title={title} open={open}  ref={alertref}/>
            </div>

        </div>
    )
}

export default Login