import { useRecoilValue } from "recoil";
import AuthSide from "../components/AuthSide"
import Signincomp from "../components/Signincomp"
import { isAuthenticated } from "../state/userRecoil";


function Signin() {

  const checkIsAuthenticated = useRecoilValue(isAuthenticated);

    return (
     !checkIsAuthenticated && (<div className="grid grid-cols-4 lg:grid-cols-12">
        {/* SignupComp: Full width on small screens, 4 columns on large screens */}
        <div className="col-span-full lg:col-span-4">
          <Signincomp />
        </div>
  
        {/* AuthSide: Hidden by default, visible on large screens and spans 8 columns */}
        <div className="hidden lg:block lg:col-span-8">
          <AuthSide />
        </div>
      </div>)
    )
  }

export default Signin