import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './Components/Screens/Home'
import Login from './Components/Screens/Login'
import Signup from './Components/Screens/Signup'
import Classes from './Components/Screens/Classes'
//context
import { initialState, reducer } from './Reducers/index'
import { createContext,useReducer } from 'react';
export const Maincontext = createContext()
function App() {
  const [state,dispatch]=useReducer(reducer,initialState)
  return (
    <BrowserRouter>
      <Maincontext.Provider value={{state,dispatch}}>
        <Route path="/" component={Home} exact />
        <Route path="/Login" component={Login}/>
        <Route path="/Signup" component={Signup}/> 
        <Route path="/Class/:name" component={Classes}/> 
      </Maincontext.Provider>
    </BrowserRouter>
  )
}
export default App