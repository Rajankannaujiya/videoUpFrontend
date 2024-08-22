import axios from "axios";
import { atom, selector } from "recoil";
import { BACKEND_URL } from "../config";

export const signupUser = atom({
    key:"signupUserDetail",
    default:{
        username:'',
        email:'',
        password:''
    }
})

export const signinUser = atom({
    key:'signinUserDetail',
    default:{
        email:'',
        password:''
    }
})

export const isSignin = atom({
    key:'SignInStatus',
    default:false
})

interface PostProps {
    id: string;
    video_url: string;
    title: string;
    description: string;
    created_at:string;
    updated_at:string
  }


export const initialVideos = atom<PostProps[] | []>({
    key:"videos",
    default:[],
})


export const videosSelector= selector<PostProps[]>({
    key: "videosSelector",
    get:async({get})=>{
      const existingVideo =  get(initialVideos)
        try {
            const response = await axios.get(`${BACKEND_URL}/api/v1/video/`,{
                headers:{
                    'Authorization':`${localStorage.getItem("token")}`
                }
            })
    
            console.log("this is the response",response.data.videoDetail);
            
            // const responseDataArray = Object.values(response.data);

            return [...existingVideo,...response.data.videoDetail]
            } catch (error) {
                console.log("An error has been occured while fetching videos",error);
                return existingVideo;
            }
    }
})