import { useNavigate } from "react-router-dom";
import UploadComp from "../components/UploadComp"
import { useRecoilValueLoadable } from "recoil";
import { useEffect } from "react";
import { isAuthenticated } from "../state/userRecoil";



function Upload() {

  const navigate = useNavigate();
  const checkIsAuthenticated = useRecoilValueLoadable(isAuthenticated);

  useEffect(() => {
    // Handle authentication check
    if (checkIsAuthenticated.state === 'hasValue' && !checkIsAuthenticated.contents) {
        // User is not authenticated, redirect to home or login
        navigate('/', { replace: true });
    }
}, [checkIsAuthenticated, navigate]);


 
  return (
      <div className="flex justify-center mt-7">
      <UploadComp/> 
      </div>
  )
}

export default Upload