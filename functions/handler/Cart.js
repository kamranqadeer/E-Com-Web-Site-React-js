const { db } = require("../uniti/admin");
//get all cart
exports.getCart = (req, res) => {
  db.collection("Cart")
    .get()
    .then(data => {
      let order = [];
      data.forEach(doc => {
        order.push({
          CartId: doc.id,
          ...doc.data()
        });
      });
      return res.json(order);
    })
    .catch(err => console.error(err));
};
//adding cart
exports.addCart = (req, res) => {
  const creatNewProduct = {
    ProductId:req.body.ProductId,
    UserId: req.body.UserId,
    Category: req.body.Category,
    Title: req.body.Title,
    Size: req.body.Size,
    Rating: req.body.Rating,
    Amount: req.body.Amount,
    ProductionBy: req.body.ProductionBy,
    ImageUrl: req.body.ImageUrl,
    Discription: req.body.Discription,
    Discount:req.body.Discount,
    Style:req.body.Style
  };
  db.collection("Cart")
    .add(creatNewProduct)
    .then(doc => {
      res.json({ message: "New product is created id is =" + doc.id });
    })
    .catch(err => {
      res.status(500).json({ error: "something is wrong" });
      console.error(err);
    });
};
//delete cart
exports.removeCart = (req, res) => {
  const document = db.doc(`/Cart/${req.params.CartId}`);
  document
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Product not found" });
      } else {
        return document.delete();
      }
    })
    .then(() => {
      res.json({ message: "Remove from cart" });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};
// fetch One Cart Product
exports.getOneCartProduct = (req, res) => {
  let CartData = {};
  db.doc(`/Cart/${req.params.CartId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: 'Product not found' });
      }
      CartData = doc.data();
      CartData.CartId = doc.id;
      return db
        .collection('Cart')
        .where('CartId', '==', req.params.CartId)
        .get();
    })
    .then(() => {
      return res.json(CartData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};
