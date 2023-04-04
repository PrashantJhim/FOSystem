import './login.css'
import NavBar from './NavBar'
const Login = () =>{

    const Test = async () =>{
        const data = await fetch("/",
        {method:"POST",
        headers:{
            "Content-Type":"application/json"
        }
        ,body:JSON.stringify({
            FullName:"Prashant",
            Username:"Prashant"
        })
    })
        const txt = await data.json()
        console.log(txt)
    }

   
    return (
        <div>
            <NavBar/>
            <div id = "Container">
                <img id = "Img" src = "Donots.JPG"/>
                <div id = "Content">
                   <h1 id = "Title">Login</h1>
                   <h3 class = "Titles">Email</h3>
                   <input id = "Input1" type="text" placeholder = "Enter The Email "/>
                   <h3 class = "Titles">Password</h3>
                   <input id = "Input2" type="text" placeholder = "Enter The Password "/>

                   <button onClick={Test} id = "LoginButton2">Login</button>
                </div>
            </div>


        </div>
    )
}
export default Login 