
import { useRecoilState, useSetRecoilState } from "recoil"
import Button from "./common/Button"
import Header from "./common/Header"
import Input from "./common/Input"
import Label from "./common/Label"
import { isSignin, signupUser } from "../state/userRecoil"
import axios from "axios"
import { BACKEND_URL } from '../config'
import Alert from "./common/Alert";
import { useNavigate } from "react-router-dom"
import { useState } from "react"




function SignupComp() {
  
  const navigate =useNavigate()
  
  //fetching signupUser from the recoil

  const [user, setUser] = useRecoilState(signupUser);

  const setSignInStatus = useSetRecoilState(isSignin);

  // setting isclicked based on the user clicked the signup button to so spinner

  const [isClicked, setIsClicked] = useState<boolean>(false)


  

  async function handleSignUpInput() {

    setIsClicked(true)
    try {
     const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, user,{
        headers:{
          "Content-Type":"application/json"
        }
      })

      if(!response.data.token){

        <Alert textColor="text-red-800" alertType="Danger Alert!" alertContent="you are not logged in"/>
    
          return;
      }
      localStorage.clear();
      localStorage.setItem("token",response.data.token)
      setSignInStatus(true)
      navigate("/posts")
      
    } catch (error) {
      <Alert textColor="text-red-800" alertType="Danger Alert!" alertContent="error while signing up please try again later"/>
    }

    finally {
      setIsClicked(false)
    }
    
  }



  

  return (
    <div className="h-screen flex justify-center items-center">
           <div className="flex justify-between max-w-md w-full flex-col p-2 ">
      <div className="m-1 p-1">
          <Header mainHeader="Create an Account to Upload Video" subHeader="Already have an Account?" linkto="/login" linkfor="Login"/>
        </div>

        <div>
          <Label htmlFor="username"  label="Username"/>
            <Input placeholder="Enter your username" value={user.username} onChange={(e)=>{
          setUser((previous) => ({
            ...previous,             // Spread the previous state
            username:e.target.value
          }));
          
            }}/>
        </div>

        <div>
          <Label htmlFor="email"  label="Email"/>
            <Input type="email" placeholder="Enter your email" value={user.email} onChange={(e)=>{
          setUser((previous) => ({
            ...previous,             // Spread the previous state
            email:e.target.value
          }));
          
            }}/>
        </div>

        <div>
          <Label htmlFor="password"  label="Password"/>
            <Input type="password" placeholder="Enter your password" value={user.password} onChange={(e)=>{
          setUser((previous) => ({
            ...previous,             // Spread the previous state
            password:e.target.value
          }));
          
            }}/>
        </div>

        <div className="flex justify-center m-4 p-2">
        <Button onClick={handleSignUpInput} type="button" buttonFor="Signup" colour="gray" isClicked={isClicked}/>
        </div>
    </div>

    </div>
  ) 
}

export default SignupComp