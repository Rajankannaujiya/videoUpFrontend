import { useNavigate } from "react-router-dom";
import UpdateComp from "../components/UpdateCopm"
import { useRecoilValueLoadable } from "recoil";
import { isAuthenticated } from "../state/userRecoil";
import { useEffect } from "react";



function UpdatePost() {

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
      <UpdateComp/> 
      </div>
  )
}

export default UpdatePost