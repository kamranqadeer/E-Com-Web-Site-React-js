
   import { toast } from "react-toastify";
   export  function singIn (email,password){
            if(email=="" && password !=""){
                toast.error("Email Should not be empty")
                return "Email Should not be empty";
            }
            else if(password=="" && email != ""){
                toast.error("Password shuold not be empty")
                return "Password shuold not be empty";
            }
            else if(password=="" && email == ""){
                toast.error("Email and Password shuold not be empty")
                return "Email and Password shuold not be empty";
            }
            else if(!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
                toast.error("Should be enter valid email")
                return "Should be enter valid email"
            }
            else if(password.length < 6){
                toast.error("Password must be greater than 6 digite")
                return "Password must be greater than 6 digite"
            }
            else if(password.length > 9){
                toast.error("Password must be less than 9 digite")
                return "Password must be less than 9 digite"
            }
            else 
            return "1";
     }
     export  function singUp (email,password,confirmPassword,userName){
        if(userName=="" ){
            toast.error("Username Should not be empty")
            return "Username Should not be empty";
        }
        else if(email=="" ){
            toast.error("Email Should not be empty")
            return "Email Should not be empty";
        }
        else if(password =="" ){
            toast.error("Paassword Should not be empty")
            return "Password Should not be empty";
        }
        else if(confirmPassword != password){
            toast.error("Confirm Password is not match")
            return "Confirm Password is not match";
        }
        else if(!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
            toast.error("Should be enter valid email")
            return "Should be enter valid email"
        }
        else if(password.length < 5 || password.length >16){
            toast.error("Password should be between 5-15 digits")
            return "Password should be between 5-15 digits"
        }
        else if(userName.length < 5 || userName.length > 21){
            toast.error("User Name should be between 5-15 digits")
            return "User Name should be between 5-15 digits"
        }
        else 
        return "1";
 }
