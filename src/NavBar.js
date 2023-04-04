import {NavLink, Route,Switch,useNavigate} from 'react-router-dom'
const NavBar = () =>{
    const page = useNavigate()
    const ButtonPress = (event) =>{
        const PressEvent = event.target.id 
        
        console.log(PressEvent)
        if (PressEvent == "LoginButton"){
            page("/Login")    
        }
        if (PressEvent == "SignUpButton"){
            page("/SignUp")
        }
    }
    return (
        <div id = "Menu">
        <h1 id = "TitleText">FOSystem</h1>
        <div id = "buttons">
          
           <button onClick={ButtonPress} id = "LoginButton" to = "/Login">Login</button>
          <button id = "SignUpButton" onClick={ButtonPress}>Sign Up</button>
          
        </div>
        
       </div>
    )
}
export default NavBar