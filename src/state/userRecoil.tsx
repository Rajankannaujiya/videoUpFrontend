import axios from "axios";
import { atom, atomFamily, RecoilEnv, selector, selectorFamily } from "recoil";
import { BACKEND_URL } from "../config";

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false 

export const signupUser = atom({
    key:"signupUser",
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

interface PostVideoProps {
    id: string;
    video_url: string;
    title: string;
    description: string;
    created_at:string;
    updated_at:string;
    username:string;
  }


export const initialVideos = atom<PostVideoProps[] | []>({
    key:"videos",
    default:[],
})


export const videosSelector= selector<PostVideoProps[]>({
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


interface PostImageProps {
    id: string;
    image_url: string;
    title: string;
    description: string;
    created_at:string;
    updated_at:string;
    username:string
  }

export const initialPhoto = atom<PostImageProps[] | []>({
    key:"photos",
    default:[],
})


export const photoSelector = selector<PostImageProps[]>({
    key:"photoSelector",
    get:async({get})=>{
        const existinPhoto =  get(initialPhoto)
        try {
            const response = await axios.get(`${BACKEND_URL}/api/v1/image/`,{
                headers:{
                    'Authorization':`${localStorage.getItem("token")}`
                }
            })

            
            // const responseDataArray = Object.values(response.data);

            return [...existinPhoto,...response.data.imagegDetail]
            } catch (error) {
                console.log("An error has been occured while fetching videos",error);
                return existinPhoto;
            }
    }
})

interface PostProps{
    id:string;
    type:string
    title:string;
    videoUrl?:string;
    imageUrl?:string;
    description:string;
    createdAt:string;
    updatedAt:string;
    username:string
}


export const postAtom = atom<PostProps[] | []>({
    key:"postAtom",
    default:[]
})

export const postSelector = selector<PostProps[]>({
    key:"postSelector",
    get: async({get})=>{
        const existingPost = get(postAtom);

        try {
            const response = await axios.get(`${BACKEND_URL}/api/v1/post/`,{
                headers:{
                    'Authorization':`${localStorage.getItem("token")}`
                }
            })
            
            // const responseDataArray = Object.values(response.data);

            return [...existingPost,...response.data.post]
            } catch (error) {
                console.log("An error has been occured while fetching videos",error);
                return existingPost;
            }

    }
})



interface MyPost{
    id:string;
    type:string
    title:string;
    video_url?:string;
    image_url?:string;
    description:string;
    createdAt:string;
    updatedAt:string;
}

export const myPosts = atom<MyPost[] | []>({
    key:"myPosts",
    default: []
})


export const myPostSelector = selector<MyPost[]>({
    key: "myPostSelector",
    get: async ({ get }) => {
      const existingMypost = get(myPosts);
  
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/post/userPost`, {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });
  
        console.log("this is the userPost", response);
  
        return [...existingMypost, ...response.data.post];
      } catch (error) {
        console.log("An error occurred while fetching posts", error);
        return existingMypost;
      }
    },
  });


  interface FullPostCompProps{
    id:string;
  type?:string;
  title:string;
  video_url?:string;
  image_url?:string;
  duration:string;
  description:string;
  publishedDate:string;
  updatedDate:string;
  username:string
}


  export const singleImageAtom= atomFamily<FullPostCompProps[] ,string|[]>({
    key:"singleImageAtom",
    default:[]
  })


  export const singleImageSelector = selectorFamily<FullPostCompProps[],string>({
    key:"singleImageSelector",
    get:id => async({get})=>{
       const existingPost = get(singleImageAtom(id));
        try {

            const response =await axios.get(`${BACKEND_URL}/api/v1/image/one/${id}`,{
                headers:{
                    'Authorization': `${localStorage.getItem("token")}`
                }
            })

                console.log("is is a single post",response.data.imageDetails)
            return [...response.data.imageDetails]
        } catch (error) {
            console.log("An error occurred while fetching posts", error);
            return existingPost;   
        }
    }
  })


  export const singleVideoAtom= atomFamily<FullPostCompProps[] ,string|[]>({
    key:"singleVideoAtom",
    default:[]
  })


  export const singleVideoSelector = selectorFamily<FullPostCompProps[],string>({
    key:"singleVideoSelector",
    get:id => async({get})=>{
       const existingPost = get(singleVideoAtom(id));
        try {

            const response =await axios.get(`${BACKEND_URL}/api/v1/video/one/${id}`,{
                headers:{
                    'Authorization': `${localStorage.getItem("token")}`
                }
            })

                console.log("is is a single post",response.data.singleVideo)
            return [...response.data.singleVideo]
        } catch (error) {
            console.log("An error occurred while fetching posts", error);
            return existingPost;   
        }
    }
  })



export const delteImage = atomFamily({
    key:"delteImage",
    default:selectorFamily({
        key:"deleteImageSelector",
        get:id => async({get})=>{
            get(delteImage(id));
            try {
    
                const response =await axios.get(`${BACKEND_URL}/api/v1/image/delete/${String(id)}`,{
                    headers:{
                        'Authorization': `${localStorage.getItem("token")}`
                    }
                })
    
                    
                return [...response.data.message]
            } catch (error) {
                console.log("An error occurred while fetching posts", error);
                return; 
            }
        }
    })
})

export const deleteVideo = atomFamily({
    key:"deleteVideo",
    default:selectorFamily({
        key:"deleteVideoSelector",
        get:id => async({get})=>{
            get(delteImage(id));
            try {
    
                const response =await axios.get(`${BACKEND_URL}/api/v1/video/delete/${String(id)}`,{
                    headers:{
                        'Authorization': `${localStorage.getItem("token")}`
                    }
                })
    
                    
                return [...response.data.message]
            } catch (error) {
                console.log("An error occurred while fetching posts", error);
                return; 
            }
        }
    })
})


export const updateVideo = atomFamily({
    key:"updateVideo",
    default:selectorFamily({
        key:"updateVideoSelector",
        get:id => async({get})=>{
            get(delteImage(id));
            try {
    
                const response =await axios.get(`${BACKEND_URL}/api/v1/video/update/${String(id)}`,{
                    headers:{
                        'Authorization': `${localStorage.getItem("token")}`
                    }
                })
    
                    
                return [...response.data.message]
            } catch (error) {
                console.log("An error occurred while fetching posts", error);
                return; 
            }
        }
    })
})

export const updateImage = atomFamily({
    key:"updateImage",
    default:selectorFamily({
        key:"updateImageSelector",
        get:id => async({get})=>{
            get(delteImage(id));
            try {
    
                const response =await axios.get(`${BACKEND_URL}/api/v1/image/update/${String(id)}`,{
                    headers:{
                        'Authorization': `${localStorage.getItem("token")}`
                    }
                })
    
                    
                return [...response.data.message]
            } catch (error) {
                console.log("An error occurred while fetching posts", error);
                return; 
            }
        }
    })
})

export const isRefresh = atom({
    key:"refresh",
    default:false
})



export const isAuthenticated = selector({
    key: "checkUserTokenSelector",
    get: ({ get }) => {
        get(isSignin)
        const token = localStorage.getItem("token");
        if (!token || token === 'undefined') {
            return false; // User is not authenticated
        }
        return true; // User is authenticated
    },
});
