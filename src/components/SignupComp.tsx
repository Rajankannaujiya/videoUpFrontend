import Button from "./common/Button"
import Header from "./common/Header"
import Input from "./common/Input"
import Label from "./common/Label"

function SignupComp() {

  function handleChange(){
    console.log("i clicked")
  }

  function sendSignupInput(){
    console.log("request to send")
  }

  return (
    <div className="h-screen flex justify-center items-center">
           <div className="flex justify-between max-w-md w-full flex-col p-2 ">
      <div className="m-1 p-1">
          <Header mainHeader="Create an Account to Upload Video" subHeader="Already have an Account?" linkto="/login" linkfor="Login"/>
        </div>

        <div>
          <Label htmlFor="username"  label="Username"/>
            <Input placeholder="Enter your username" onChange={handleChange}/>
        </div>

        <div>
          <Label htmlFor="email"  label="Email"/>
            <Input placeholder="Enter your email" onChange={handleChange}/>
        </div>

        <div>
          <Label htmlFor="password"  label="Password"/>
            <Input placeholder="Enter your password" onChange={handleChange}/>
        </div>

        <div className="flex justify-center m-4 p-2">
        <Button onClick={sendSignupInput} type="button" buttonFor="Signup"/>
        </div>
    </div>

    </div>
  )
}

export default SignupComp