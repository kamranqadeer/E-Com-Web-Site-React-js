import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";
const userSignInToken=localStorage.userSignInToken;
export function userSignIn(){
  if (userSignInToken) {
    const decodeUserToken = jwtDecode(userSignInToken);
    if (decodeUserToken.exp * 1000 < Date.now()) {
      return "/LogIn"
    } else {
      return "/UserHome"
    }
  }
  else{
    return "/LogIn"
  }
}