const Contact = require("../model/Contact");
exports.getAllContact = (req, res) => {
  Contact.find()
    .then((contacts) => {
      res.render("./adminDasboard", { contacts, error: {} });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        message: "Error Occurred",
        adminDasboard,
      });
    });
};

exports.singleContact = (req, res) => {
  const { id } = req.params;
  Contact.findById(id)
    .then((contact) => {
      res.status(201).json(contact);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        message: "Error Occurred",
      });
    });
};

exports.postContact = (req, res) => {
  let { name, phone, email, id } = req.body;

  let error = {};
  if (!name) {
    error.name = "Please Provide a Name";
  }
  if (!phone) {
    error.phone = "Please Provide a Phone Number";
  }
  if (!email) {
    error.email = "Please Provide an Email";
  }
  let isError = Object.keys(error).length > 0;

  if (isError) {
    Contact.find()
      .then((contacts) => {
        res.render("./adminDasboard", { contacts, error });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({
          message: "Error Occurred",
        });
      });
  } else {
    if (id) {
      Contact.findOneAndUpdate({ _id: id }, { $set: { name, email, phone } })
        .then(() => {
          Contact.find().then((contacts) => {
            res.render("./adminDasboard", { contacts, error: {} });
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json({
            message: "Error Occurred",
          });
        });
    } else {
      let contact = new Contact({
        name,
        phone,
        email,
      });
      contact
        .save()
        .then(() => {
          Contact.find().then((contacts) => {
            res.render("./adminDasboard", { contacts, error: {} });
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json({
            message: "Error Occurred",
          });
        });
    }
  }
};

exports.updateContact = (req, res) => {
  let { name, phone, email } = req.body;
  let { id } = req.params;
  if (id) {
    Contact.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          name,
          phone,
          email,
        },
      }
    )
      .then(() => {
        Contact.find().then((contacts) => {
          res.render("./adminDasboard", { contacts, error: {} });
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({
          message: "Error Occurred",
        });
      });
  }
};

exports.deletContact = (req, res) => {
  let { id } = req.params;
  Contact.findOneAndDelete({ _id: id })
    .then(() => {
      Contact.find().then((contacts) => {
        res.render("./adminDasboard", { contacts, error: {} });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        message: "Error Occurred",
      });
    });
};
