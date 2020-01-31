const { db } = require("../uniti/admin");
//get orders
exports.getAllOrders = (req, res) => {
  db.collection("Orders")
    .get()
    .then(data => {
      let order = [];
      data.forEach(doc => {
        order.push({
          OrdersId: doc.id,
          ...doc.data()
        });
      });
      return res.json(order);
    })
    .catch(err => console.error(err));
};
//post orders
exports.postOrders = (req, res) => {
  const creatOrder = {
    TotalAmount: req.body.TotalAmount,
    ProductIds: req.body.ProductIds,
    Quantity: req.body.Quantity,
    Name: req.body.Name,
    ContactNumber: req.body.ContactNumber,
    Address: req.body.Address,
    Email: req.body.Email,
    UserId:req.body.UserId
  };
  db.collection("Orders")
    .add(creatOrder)
    .then(doc => {
      res.json(doc.id);
    })
    .catch(err => {
      res.status(500).json({ error: "something is wrong" });
      console.error(err);
    });
};
// Delete a Order
exports.deleteOrder = (req, res) => {
  const document = db.doc(`/Orders/${req.params.OrdersId}`);
  document
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Order not found" });
      } else {
        return document.delete();
      }
    })
    .then(() => {
      res.json({ message: "Order deleted successfully" });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};
