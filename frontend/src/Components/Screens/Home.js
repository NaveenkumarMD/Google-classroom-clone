import React, { useState, useContext, useEffect } from 'react';
import Navbar from '../Navbar'
import Card from '../Card'
import LinearProgress from '@material-ui/core/LinearProgress';
import { Maincontext } from '../../App'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Menu, MenuItem } from '@material-ui/core'
import { SignalCellularNullTwoTone, TrafficRounded } from '@material-ui/icons';

const options = [
    'create a classroom',
    'join a classroom'
];

const ITEM_HEIGHT = 48;
const Home = () => {
    const { state, dispatch } = useContext(Maincontext)
    const [classes, setClasses] = useState(null)
    const [loading, setLoading] = useState(true)
    const [rooms, setRooms] = useState(null)
    const [create, setCreate] = useState(false)
    const [join, setJoin] = useState(false)
    const [createname, setCreatename] = useState(null)
    const [joinname,setJoinname]=useState(SignalCellularNullTwoTone)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    console.log(state)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handlejoin=async()=>{
        setLoading(true)
        await fetch("/addstudent",{
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                "name":joinname,
                "student":state.user.id
            })
        }).then(res => res.json()).then(data => {
            setLoading(false)
            console.log(data)
            if(data.msg){
                setJoin(false)
                window.location.reload();
            }
        }).catch(err => {
            setLoading(false)
            console.log(err.message)
        })
    }
    const handlecreate = async () => {
        setLoading(TrafficRounded)
        await fetch("/createclassroom", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                "name":createname,
                "staff":state.user.id
            })
        }).then(res => res.json()).then(data => {
            setLoading(false)
            if(data.msg){
                setCreate(false)
            }
        }).catch(err => {
            setLoading(false)
            console.log(err.message)
        })
    }

    useEffect(async () => {
        await fetch("/getrooms", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                "_id": state.user.id
            })
        }).then(res => res.json()).then(data => {
            setLoading(false)
            setRooms(data.msg)
            dispatch({
                type:"CLASSROOMS",
                payload: data.msg
            })
        }).catch(err => {
            setLoading(false)
            console.log(err.message)
        })
    }, [])
    const handleopen=()=>{
        alert("open")
    }
    const handleaddiconclick = (option) => {
        if (option == 'create a classroom') {
            setCreate(true)
        }
        if (option == 'join a classroom') {
            setJoin(true)
        }
    }
    return (

        <div>
            <Navbar />
            {loading && <LinearProgress color="secondary" />}
            <div className="cards">
                {rooms != undefined && rooms.map(data => {
                       return (
                        <Card name={data.name} staff={data.creator} key={data._id}  func={handleopen}/>
                    )
                })}
            </div>

            <AddCircleIcon className="addIcon" onClick={() => setCreate(true)} />
            <div>

                <Dialog open={create} onClose={() => setCreate(false)} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title" >Create classroom</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Create a new classroom for your students as a teacher share the code with the students to join
          </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Classroom name"
                            type="email"
                            fullWidth
                            value={createname}
                            onChange={e=>setCreatename(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setCreate(false)} color="secondary">
                            Cancel
          </Button>
                        <Button onClick={() => handlecreate()} color="primary">
                            Create
          </Button>
                    </DialogActions>
                </Dialog>
                <div class="addIcon">
                    <IconButton
                        aria-label="more"
                        aria-controls="long-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        <AddCircleIcon className="addIcon" />
                    </IconButton>
                    <Menu
                        id="long-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                            style: {
                                maxHeight: ITEM_HEIGHT * 4.5,
                                width: '20ch',
                            },
                        }}
                    >
                        {options.map((option) => (
                            <MenuItem key={option} selected={option === 'Pyxis'} onClick={() => handleaddiconclick(option)}>
                                {option}
                            </MenuItem>
                        ))}
                    </Menu>
                </div>
            </div>
            <div>

                <Dialog open={join} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Enter the classroom code that your teacher gave you
          </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Email Address"
                            type="email"
                            fullWidth
                            value={joinname}
                            onChange={(e)=>setJoinname(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setJoin(false)} color="secondary">
                            Cancel
          </Button>
                        <Button color="primary" onClick={handlejoin}>
                            Join
          </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
}

export default Home;
