import React,{useState,useEffect,useContext} from 'react'
import Banner from '../Banner'
import Navbar from '../Navbar'
import Textbox from '../Textbox'
import LinearProgress from '@material-ui/core/LinearProgress';
import { Maincontext } from '../../App';
import Announcementscard from '../Announcementscard'
function Classes(props) {
    const {state,dispatch}=useContext(Maincontext)
    const [name,setName]=useState(props.match.params.name)
    const [loading,setLoading]=useState(true)
    const [title,setTitle]=useState()
    const [announcements,setAnnouncements]=useState(null)
    const [content,setContent]=useState('1')
    useEffect(
        async ()=>{
            await fetch("/getroominfo",{
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify({
                    "name":name
                })
            }).then(res=>res.json()).then(data=>{
                dispatch({
                    type:"ROOM",
                    payload:data
                })
                fetch("/getannouncements",{
                    method:"POST",
                    headers:{
                        "content-type":"application/json"
                    },
                    body:JSON.stringify({
                        "room_id":data._id
                    })
                }).then(res=>res.json()).then(data=>{
                    console.log(data)
                    setLoading(false)
                    setAnnouncements(data)
                }).catch(err=>{
                    console.log(err)
                })
            }).catch(err=>{
                console.log(err)
            })
            console.log(state.room)
            
        }

        
    ,[])
    const hanldeclick=async (title,content)=>{
        setLoading(true)
        console.log(title,content) 
         await fetch("/announcement",{
             method:"POST",
             headers:{
                 "content-type":"application/json"
             },
             body:JSON.stringify({
                 "title":title,
                 "text":content,
                 "name":name,
                 "position":"student",
                 "_id":state.user.id
             })
         }).then(res=>res.json()).then(data=>{
             setLoading(false)
             console.log(data)
             window.location.reload()
         }).catch(err=>{
             console.log(err)
         })
      }
    return (
        <div>
            <Navbar/>
            {loading && <LinearProgress color="secondary" />}
            <div style={{padding:"20px"}}>

            <Banner name={name}/>
            <Textbox onChangetitle={setTitle} onChangecontent={setContent} onsubmit={hanldeclick}/>
            {announcements!=undefined && announcements.map(data=>{
                console.log(data)
                return(
                    <Announcementscard title={data.title} content={data.text}/>
                )
            })}
            </div>
        </div>
    )
}

export default Classes
