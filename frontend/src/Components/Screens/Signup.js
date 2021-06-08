import React, {useState ,useRef,} from 'react'
import Navbar from '../Navbar'
import Classroom from '../Icons/Classroom'
import LinearProgress from '@material-ui/core/LinearProgress';
import { Link,useHistory } from 'react-router-dom';
import Alert from '../Alert'
function Signup() {
    const [loading, setLoading] = useState(false)
    const [name,setName]=useState("")
    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")
    const [res, setResponse] = useState("")
    const [title,setTitle]=useState("")
    const [open,setOpen]=useState(false)
    const history=useHistory()
    const alertref=useRef()
    const login = async () => {
        setLoading(true)
        await fetch("/signup", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                "name":name,
                "mail": mail,
                "password":password
            })

        }).then(res => res.json()).then(data => {
            setLoading(false)
            if(data.msg){
                setTitle("Success")
                setResponse("Successfully signed in")
                alertref.current.getAlert()
                setTimeout(()=>{
                    history.push("/Login")
                },3000)
            }
            if(data.err){
                setTitle("Error")
                setResponse(data.err)
            }
            alertref.current.getAlert()          
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
            <Alert text={res} title={title} open={open}  ref={alertref}/>
            { loading && < LinearProgress color="secondary" />}
            <div className="login-card" style={{height:"500px"}} >
                <div style={{textAlign:"center",marginTop:"10px"}}>
                <Classroom size={90} />
                <div className="login-text" >
                    Signup
                </div>
                </div>
                <div style={{marginTop:"50px"
                }}>
                <div>
                <label for="name" className="label">Name</label> <br/>
                    <div style={{textAlign:"center"}}>
                    <input name="name" className="input" value={name} onChange={(e)=>setName(e.target.value)} /> <br/>
                    </div>
                    <label for="mail" className="label">Mail</label> <br/>
                    <div style={{textAlign:"center"}}>
                    <input name="mail" className="input" value={mail} onChange={(e)=>setMail(e.target.value)}/> <br/>
                    </div>

                    <label for="password" className="label">Password</label><br/>   
                    <div style={{textAlign:"center"}}>          
                    <input name="password" className="input" value={password} onChange={(e)=>setPassword(e.target.value)}/></div>
                </div>
                <div style={{textAlign:"center"}}>
                    <button className="button" onClick={login}>Signup</button> <br/>
                    <div className="link">
                    <Link to="/Login" className="link">Already a member?</Link>
                    </div>
           
                </div>
                </div>
                
            </div>
        </div>
    )
}

export default Signup
