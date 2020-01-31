import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";
// axios
import axios from "axios";
const userSignInToken=localStorage.userSignInToken;
export function signIn(email, password) {
  if (email == "" && password != "") {
    toast.error("Email Should not be empty");
    return "Email Should not be empty";
  } else if (password == "" && email != "") {
    toast.error("Password shuold not be empty");
    return "Password shuold not be empty";
  } else if (password == "" && email == "") {
    toast.error("Email and Password shuold not be empty");
    return "Email and Password shuold not be empty";
  } else if (!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
    toast.error("Should be enter valid email");
    return "Should be enter valid email";
  } else if (password.length < 6) {
    toast.error("Password must be greater than 6 digite");
    return "Password must be greater than 6 digite";
  } else if (password.length > 9) {
    toast.error("Password must be less than 9 digite");
    return "Password must be less than 9 digite";
  } else return "1";
}
export function singUp(email, password, confirmPassword, userName) {
  if (userName == "") {
    toast.error("Username Should not be empty");
    return "Username Should not be empty";
  } else if (email == "") {
    toast.error("Email Should not be empty");
    return "Email Should not be empty";
  } else if (password == "") {
    toast.error("Paassword Should not be empty");
    return "Password Should not be empty";
  } else if (confirmPassword != password) {
    toast.error("Confirm Password is not match");
    return "Confirm Password is not match";
  } else if (!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
    toast.error("Should be enter valid email");
    return "Should be enter valid email";
  } else if (password.length < 5 || password.length > 16) {
    toast.error("Password should be between 5-15 digits");
    return "Password should be between 5-15 digits";
  } else if (userName.length < 5 || userName.length > 21) {
    toast.error("User Name should be between 5-15 digits");
    return "User Name should be between 5-15 digits";
  } else return "1";
}

export function adminUploadProduct(
  ProdutcTitle,
  ProductionBy,
  Amount,
  ProductCatagorie,
  Size,
  ImageUrl,
  discription
) {
  if (ProductCatagorie == "Categories") {
    toast.error("Select Catagories");
    return "Select Product Category";
  } else if (ProdutcTitle == "") {
    toast.error("ProdutcTitle Should not be empty");
    return "ProdutcTitle Should not be empty";
  } else if (ProdutcTitle.length < 2) {
    toast.error("Input must be greater than 2 digite");
    return "Input must be greater than 1 digite";
  } else if (ProductionBy.length > 20 && ProdutcTitle > 20) {
    toast.error("Input must be less than 9 digite");
    return "Input must be less than 20 digite";
  } else if (!ProdutcTitle.match(/^[A-Za-z]+$/)) {
    toast.error("Wrong input");
    return "Pleas enter correct input";
  } else if (Amount == "/Rs" || Amount == "/$") {
    toast.error("Enter amount");
    return "Amount shuold not be empty";
  } else if (ProductionBy == "") {
    toast.error("ProductionBy shuold not be empty");
    return "ProductionBy shuold not be empty";
  } else if (ProductionBy.length < 5) {
    toast.error("Production By must be greater than 5 digite");
    return "Input must be greater than 1 digite";
  } else if (Size == "Product Size") {
    toast.error("Size is not Selected");
    return "Select Product Size";
  } 
  else if (discription == "" ) {
    toast.error("Discription Should not be empty");
    return "Discription Should not be empty";
  } else if (discription.length < 10) {
    toast.error("Discription must be greater than 10 digite");
    return "Discription must be greater than 10 digite";
  } else if (discription.length > 100) {
    toast.error("Discription must be less than 100 digite");
    return "Discription must be less than 100 digite";
  } else if (ImageUrl == "") {
    toast.error("Select Image");
    return "Select Image";
  } else return "1";
}

export function clientToken(){
  if (userSignInToken) {
    const decodeUserToken = jwtDecode(userSignInToken);
    // console.log(decodeUserToken);
    if (!decodeUserToken.exp * 1000 < Date.now()) {
      return true
    } else {
      return false
    }
  }
  else{
    return false
  }
}
export function setStyle(style){
  switch (style) {
    case "ShlwarKamez": {
      return(setList(style)) ;
    }
    case "Kurta": {
      return(setList(style)) ;
    }
    case "CoatPaint": {
      return(setList(style)) ;
    }
    case "Wasket": {
      return(setList(style)) ;
    }
    case "Shawles": {
      return(setList(style)) ;
    }
    case "Shirts": {
      return(setList(style)) ;
    }
    case "UnstitchClothes": {
        return(setList(style)) ;
    }
  }
}
 async function setList(style){
   let AllStyle=[];
  const { data: oneCategory } = await axios.get(
    `/getOnCategory/${style}`
  );
  for (var i = 0; i <= Object.keys(oneCategory).length; i++) {
    if (oneCategory[i] != null) {
      AllStyle.push(oneCategory[i]);
    }
  }
  return AllStyle;
}