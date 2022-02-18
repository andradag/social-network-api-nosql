const { Router } = require("express");
const {
  getAllThought,
  getThoughtByID,
  createThought,
  updateThoughtByID,
  deleteThoughtByID,
} = require("../../controllers/api/thoughts.js");

const router = Router();

router.get("/", getAllThought);
router.get("/:id", getThoughtByID);
router.post("/", createThought);
router.put("/:id", updateThoughtByID);
router.delete("/:id", deleteThoughtByID);

module.exports = router;
