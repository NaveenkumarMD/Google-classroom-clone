export const initialState={
    user:JSON.parse(localStorage.getItem("user")),
    classrooms:JSON.parse(localStorage.getItem("classrroms")),
    room:JSON.parse(localStorage.getItem("rooms"))
}
export const reducer=(state,action)=>{
    if(action.type==="USER"){
        localStorage.setItem("user",JSON.stringify(action.payload))
        console.log("download..")
        var obj={
            ...state,
            user:action.payload,
        }        
        return obj
    }
    if(action.type==="CLASSROOMS"){
        localStorage.setItem("classrooms",JSON.stringify(action.payload))
        var obj1={
            ...state,
            classrooms:action.payload
        }
        return obj1
    }
    if(action.type==="ROOM"){
        localStorage.setItem("room",JSON.stringify(action.payload))
        var obj2={
            ...state,
            room:action.payload
        }
        return obj2
    }
    return state
}