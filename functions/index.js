const functions = require("firebase-functions");
const app = require("express")();
const FBAuth = require("./uniti/fbAuth");
const cors = require("cors");
app.use(cors());
const {
  signup,
  login,
  uploadImage,
  addUserDetails,
  getAuthenticatedUser
} = require("./handler/users");
const {
  getAllAdmins,
  LogInAdmin,
  SignUpAdmin,
  deleteAdmin
} = require("./handler/Admin");
const { getAllOrders, postOrders, deleteOrder } = require("./handler/Orders");
const { getAllCategories, getOneCategory } = require("./handler/Style");
const {
  getAllProducts,
  creatNewProduct,
  uploadProductImage,
  deleteProduct,
  deleteImage,
  updateProducts,
  getOneProduct
} = require("./handler/AllProducts");
//get Cart
const {
  getCart,
  addCart,
  removeCart,
  getOneCartProduct
} = require("./handler/Cart");

// users routes
app.post("/logIn", login);
app.post("/signUp", signup);
app.post("/uploadProfilePic", FBAuth, uploadImage);
app.post("/addUserDetails", FBAuth, addUserDetails);
app.get("/getAuthUserDetail", FBAuth, getAuthenticatedUser);
// Products Routs
app.get("/getProducts", getAllProducts);
app.get("/getOneProducts/:allProductsId", getOneProduct);
app.post("/creatNewProducts", creatNewProduct);
app.post("/uploadProductImage", uploadProductImage);
app.delete("/deleteProduct/:allProductsId", deleteProduct);
app.delete("/deleteImage", deleteImage);
app.get("/updateProducts/:allProductsId", updateProducts);
//Cart
app.get("/getCart", getCart);
app.get("/getOneCart/:ProductId", getOneCartProduct);
app.post("/addCart", addCart);
app.delete("/removeCart/:CartId", removeCart);
//Orders
app.get("/getOrders", getAllOrders);
app.post("/newOrder", postOrders);
app.delete("/deleteOrder", deleteOrder);
//Style
app.get("/getAllCategories", getAllCategories);
app.get("/getOnCategory/:CategoriesId", getOneCategory);
//Admin
app.get("/getAllAdmins", getAllAdmins);
app.post("/adminLogIn", LogInAdmin);
app.post("/adminSignUp", SignUpAdmin);
app.delete("/deleteAdmin/:adminId", deleteAdmin);
exports.api = functions.region("asia-east2").https.onRequest(app);
