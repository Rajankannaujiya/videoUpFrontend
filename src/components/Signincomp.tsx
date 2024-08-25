import { useRecoilState, useSetRecoilState } from "recoil"
import Button from "./common/Button"
import Header from "./common/Header"
import Input from "./common/Input"
import Label from "./common/Label"
import { isSignin, signupUser } from "../state/userRecoil"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom"
import Alert from "./common/Alert"
import { useState } from "react"



function Signincomp() {

  const navigate =useNavigate()
  const[user,setUser] = useRecoilState(signupUser)
  const setSignInStatus = useSetRecoilState(isSignin);
  const [isClicked, setIsClicked] = useState<boolean>(false)

 async function handleSignInInput(){
  setIsClicked(true)
  try {
    const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, user,{
      headers:{
        "Content-Type":"application/json"
      }
    });
    console.log("this is data", response.data);

    // Store the token in localStorage
    localStorage.setItem("token", response.data.token);
    setSignInStatus(true)
    // Navigate to the "/posts" route
    navigate("/posts");
  } catch (error) {
    <Alert textColor="text-red-800" alertType="Danger Alert!" alertContent="error while signing up please try again later"/>
  }

  finally{
    setIsClicked(false)
  }

  }

  return (
    <div className="h-screen flex justify-center items-center">
           <div className="flex justify-between max-w-md w-full flex-col p-2 ">
      <div className="m-1 p-1">
          <Header mainHeader="Login to your Account" subHeader="Don't have an Account?" linkto="/" linkfor="Signup"/>
        </div>

        <div>
          <Label htmlFor="email"  label="Email"/>
            <Input type="email" placeholder="Enter your email" onChange={(e)=>{
              setUser((previous)=>({
                ...previous,
                email:e.target.value
              }))
            }}/>
        </div>

        <div>
          <Label htmlFor="password"  label="Password"/>
            <Input type="password" placeholder="Enter your password" onChange={(e)=>{
              setUser((previous)=>({
                ...previous,
                password:e.target.value
              }))
            }}/>
        </div>

        <div className="flex justify-center m-4 p-2">
        <Button onClick={handleSignInInput} type="button" buttonFor="Login" colour="gray" isClicked={isClicked}/>
        </div>
    </div>

    </div>
  )
}

export default Signincomp