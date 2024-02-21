import * as Yup from 'yup'


export const signupschema = Yup.object({
    
    name: Yup.string().min(2).max(25).required("Please Enter Your Name"),
    password: Yup.string().min(6).required("Please Enter your Password")
})