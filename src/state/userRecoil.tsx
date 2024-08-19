import { atom } from "recoil";

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