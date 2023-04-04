import './sign.css'
import { useState } from 'react'
import { passwordStrength } from 'check-password-strength' 

import NavBar from './NavBar'
const SignUP = () =>{
    var validator = require("email-validator");
    const [Details,NewDetails] = useState({FullName:undefined,Username:undefined,Password:undefined,Email:undefined})
    const [PassCheck,ChangePassCheck] = useState(false)
    const [ConfirmCheck,ChangeConfirm] = useState(false)
    const [EmailCheck,ChangeEmailCheck] = useState(false)
    

    //Function To Show Password Both 
    const ShowPassword = () =>{
        const Checked = document.getElementById("ShowInput").checked
        console.log(Checked)
        if (Checked == true){
            document.getElementById("Pass1").type = "text"
            document.getElementById("Pass2").type = "text"
        }
        if (Checked == false){
            document.getElementById("Pass1").type = "password"
            document.getElementById("Pass2").type = "password"
        }
        console.log("ok i am working")
    }
    // Function To Check Password is Strong 
    const StrongPassword = () =>{
        const value = passwordStrength(document.getElementById("Pass1").value)
        const text = document.getElementById("Pass1").value 
        if (text.length == 0){
            ChangePassCheck(false)
            document.getElementById("Pass1").style.borderBottomColor = "black";
        }
        if (value.id == 0){
            ChangePassCheck(false)
            console.log("Too Weak")
            document.getElementById("Pass1").style.borderBottomColor = "crimson";
        }
        if (value.id == 1){
            ChangePassCheck(false)
            console.log("Weak")
            document.getElementById("Pass1").style.borderBottomColor = "#Fff206";
        }
        if (value.id == 2 ){
            ChangePassCheck(false)
            console.log("Medium")
            document.getElementById("Pass1").style.borderBottomColor = "#Fff206";
            
        }
        if (value.id >= 3 ){
            ChangePassCheck(true)
            console.log("Strong")
            document.getElementById("Pass1").style.borderBottomColor = "green";
        }
    }

     // Function to find whether Email is Only in Database
     const EmailChecker = async() =>{
        const Email = document.getElementById("Email").value
        const Request = await fetch("/Find",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                Email:Email
            })
        })
        const Response = await Request.json()
        const List = Response.Data 
        const Validate = validator.validate(Email)

       if (List.length != 0 ){
        ChangeEmailCheck(false)
        document.getElementById("Email").style.borderBottomColor = "crimson"
       }
       if ( Validate == false){
        ChangeEmailCheck(false)
        document.getElementById("Email").style.borderBottomColor = "crimson"
       }
       if (List.length == 0 ){
        ChangeEmailCheck(true)
        document.getElementById("Email").style.borderBottomColor = "green"
       }
       if ( Validate == false){
        ChangeEmailCheck(false)
        document.getElementById("Email").style.borderBottomColor = "green"
       }
        
    }

    //Function to Register The Data in Database 
    const RegisterData = async () =>{
        const Email = document.getElementById("Email").value 
        const Username = document.getElementById("Username").value 
        const FullName = document.getElementById("FullName").value 
        const Password = document.getElementById("Pass1").value 

        EmailChecker()
        CheckPassword()
        StrongPassword()

    if (PassCheck == true && ConfirmCheck == true && EmailCheck == true){
     var DetailsToSave = { 
        Email:Email,
        Username:Username,
        FullName:FullName,
        Password:Password
     }

     const Request = await fetch("/Register",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(DetailsToSave)
     })
     const Response = await Request.json()
     console.log(Response)
    }
    if (PassCheck == false){
        alert("Password is not in valid format")
    }
    if (ConfirmCheck == false){
        alert("Password donot match to each other")
    }
    if (EmailCheck == false){
        alert("Email already Exist in Database or Either it is not Valid")
    }
}
    
    
    //Function To Check Whether Passwords Match Or Not  
    const CheckPassword = () =>{
        const Pass1 = document.getElementById("Pass1").value 
        const Pass2 = document.getElementById("Pass2").value 

        if (Pass1 == Pass2){
            ChangeConfirm(true)
            console.log("Password Matched")
            document.getElementById("Pass2").style.borderBottomColor = "green"
        }
        if (Pass1 != Pass2){
            ChangeConfirm(false)
            console.log("Password Not Matched")
            document.getElementById("Pass2").style.borderBottomColor = "crimson"
        }
    }
    return (
        <div>
            <NavBar/>
            <div id = "Container">
                <img id = "Img" src = "Donots.JPG"/>
                <div id = "SignUpContainer">
                    <h1 id = "Maintitle">Register</h1>
                    <h2 class = "Titles">FullName</h2>
                    <input id = "FullName" class="Inputs" type="text" placeholder="Enter The FullName"/>
                    <h2 class = "Titles">UserName</h2>
                    <input id = "Username" class="Inputs" type="text" placeholder="Enter The Username"/>
                    <h2 class = "Titles">Email</h2>
                    <input onChange={EmailChecker} id = "Email" class="Inputs" type="text" placeholder="Enter The Email"/>
                    <h2 class = "Titles">Password</h2>
                    <input onChange={StrongPassword} id = "Pass1" class="Inputs" type="password" placeholder="Enter The Password"/>
                    
      <small class="help-block" id="password-text"></small>
                    <h2 class = "Titles">Confirm Password</h2>
                    <input onChange={CheckPassword} id = "Pass2" class="Inputs" type = "password" placeholder='Confirm The Password'/>
                    <div id = "ShowPassDiv">
                        <input onChange={ShowPassword} id = "ShowInput" type = "checkbox" />
                        <h3 id = "ShowTxt">Show Password</h3>
                    </div>
                    <button onClick={RegisterData} id = "RegisterButton">Register</button>

                </div>
            </div>


        </div>
    )
}
export default SignUP 