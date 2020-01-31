const { admin, db } = require("../uniti/admin");
const config = require("../uniti/config");
const BusBoy = require("busboy");
const path = require("path");
const os = require("os");
const fs = require("fs");
//get all products
exports.getAllProducts = (req, res) => {
  db.collection("allProducts")
    .get()
    .then(data => {
      let order = [];
      data.forEach(doc => {
        order.push({
          ProductsId: doc.id,
          ...doc.data()
        });
      });
      return res.json(order);
    })
    .catch(err => console.error(err));
};
// fetch One Product
exports.getOneProduct = (req, res) => {
  let ProductData = {};
  db.doc(`/allProducts/${req.params.allProductsId}`)
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Product not found" });
      }
      ProductData = doc.data();
      ProductData.allProductsId = doc.id;
      return db
        .collection("Cart")
        .where("allProductsId", "==", req.params.allProductsId)
        .get();
    })
    .then(() => {
      return res.json(ProductData);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};
//post orders
exports.creatNewProduct = (req, res) => {
  const creatNewProduct = {
    Category: req.body.Category,
    Title: req.body.Title,
    Size: req.body.Size,
    Rating: req.body.Rating,
    Amount: req.body.Amount,
    ProductionBy: req.body.ProductionBy,
    ImageUrl: req.body.ImageUrl,
    Discription: req.body.Discription,
    UserId: req.body.UserId,
    Status: req.body.Status,
    Style:req.body.Style,
    Discount:req.body.Discount
  };
  db.collection("allProducts")
    .add(creatNewProduct)
    .then(doc => {
      res.json({ message: "New product is created id is =" + doc.id });
    })
    .catch(err => {
      res.status(500).json({ error: "something is wrong" });
      console.error(err);
    });
};
// Upload a Product image for user
exports.uploadProductImage = (req, res) => {
  const busboy = new BusBoy({ headers: req.headers });
  let imageToBeUploaded = {};
  let imageFileName;

  busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
    console.log(fieldname, file, filename, encoding, mimetype);
    if (mimetype !== "image/jpeg" && mimetype !== "image/png") {
      return res.status(400).json({ error: "Wrong file type submitted" });
    }
    // my.image.png => ['my', 'image', 'png']
    const imageExtension = filename.split(".")[filename.split(".").length - 1];
    // 32756238461724837.png
    imageFileName = `${Math.round(
      Math.random() * 1000000000000
    ).toString()}.${imageExtension}`;
    const filepath = path.join(os.tmpdir(), imageFileName);
    imageToBeUploaded = { filepath, mimetype };
    file.pipe(fs.createWriteStream(filepath));
  });
  busboy.on("finish", () => {
    admin
      .storage()
      .bucket()
      .upload(imageToBeUploaded.filepath, {
        resumable: false,
        metadata: {
          metadata: {
            contentType: imageToBeUploaded.mimetype
          }
        }
      })
      .then(() => {
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`;
        return res.json(imageUrl);
      })
      .catch(err => {
        console.error(err);
        return res.status(500).json({ error: "something went wrong" });
      });
  });
  busboy.end(req.rawBody);
};
// Delete a Product
exports.deleteProduct = (req, res) => {
  const document = db.doc(`/allProducts/${req.params.allProductsId}`);
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
      res.json({ message: "Product deleted successfully" });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};
//Updating Products
exports.updateProducts = (req, res) => {
  let screamData = {};
  db.doc(`/allProducts/${req.params.allProductsId}`)
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Scream not found" });
      }
      screamData = doc.data();
      screamData.screamId = doc.id;
      return db
        .collection("allProducts")
        .orderBy("desc")
        .where("allProductsId", "==", req.params.allProductsId)
        .get();
    })
    .then(data => {
      screamData.comments = [];
      data.forEach(doc => {
        screamData.comments.push(doc.data());
      });
      return res.json(screamData);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};
//Delete a Product url
exports.deleteImage = (req, res) => {};
