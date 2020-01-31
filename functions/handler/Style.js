const { db } = require("../uniti/admin");
//get all Catagories
exports.getAllCategories = (req, res) => {
  db.collection("Categories")
    .get()
    .then(data => {
      let order = [];
      data.forEach(doc => {
        order.push({
          CategoriesId: doc.id,
          ...doc.data()
        });
      });
      return res.json(order);
    })
    .catch(err => console.error(err));
};
// fetch One Catagory
exports.getOneCategory = (req, res) => {
  let CategoriesData = {};
  db.doc(`/Categories/${req.params.CategoriesId}`)
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Category not found" });
      }
      CategoriesData = doc.data();
      CategoriesData.CategoriesId = doc.id;
      return db
        .collection("Cart")
        .where("CategoriesId", "==", req.params.CategoriesId)
        .get();
    })
    .then(() => {
      return res.json(CategoriesData);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};
