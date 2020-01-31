const { db } = require("../uniti/admin");

//get all products
exports.getAllAdmins = (req, res) => {
  db.collection("admin")
    .get()
    .then(data => {
      let admin = [];
      data.forEach(doc => {
        admin.push({
          AdminId: doc.id,
          ...doc.data()
        });
      });
      return res.json(admin);
    })
    .catch(err => console.error(err));
};
// AdminLogin
exports.LogInAdmin = (req, res) => {
  const LogInAdmin = {
    Email: req.body.Email,
    Password: req.body.Password
  };
  let AdminData={};
  db.doc(`/admin/${LogInAdmin.Email}`)
    .get()
    .then(doc => {
      AdminData=doc.data();
      if (!doc.exists) {
        return res.status(400).json({ handle: "Unknown User: wrong email" });
      } else {
      if (AdminData.Password != `${LogInAdmin.Password}`) {
          return res
            .status(400)
            .json({ handle: "Unknown User: wrong password" });
        } else {
          return res.status(201).json(LogInAdmin.Email);
        }
      }
    })
    .catch(err => {
      res.status(500).json({ error: "something is wrong" });
      console.error(err);
    });
};
//SignUp
exports.SignUpAdmin = (req, res) => {
  const NewAdmin = {
    Email: req.body.Email,
    Name: req.body.Name,
    Password: req.body.Password,
    Status: req.body.Status,
    ContactNumber: req.body.ContactNumber,
    Address: req.body.Address,
    CreatedAt: new Date().toISOString()
  };
  db.doc(`/admin/${NewAdmin.Email}`)
    .get()
    .then(doc => {
      if (doc.exists) {
        return res.status(400).json({ handle: "this Email is already taken" });
      } else {
        db.doc(`/admin/${NewAdmin.Email}`)
          .set(NewAdmin)
          .catch(err => {
            res.status(500).json({ error: "something is wrong" });
            console.error(err);
          });
        return res.status(201).json(NewAdmin.Email);
      }
    })
    .catch(err => {
      res.status(500).json({ error: "something is wrong" });
      console.error(err);
    });
};
// Delete a Admin
exports.deleteAdmin = (req, res) => {
  const document = db.doc(`/admin/${req.params.adminId}`);
  document
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: "admin not found" });
      } else {
        return document.delete();
      }
    })
    .then(() => {
      res.json({ message: "Admin deleted successfully" });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};
