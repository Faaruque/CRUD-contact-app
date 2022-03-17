const router = require("express").Router();
const {
  getAllContact,
  singleContact,
  postContact,
  updateContact,
  deletContact,
} = require("../controller/contactController");

router.get("/", getAllContact);
router.get("/:id", singleContact);
router.get("/delete/:id", deletContact);
router.post("/", postContact);
router.put("/:id", updateContact);

module.exports = router;
