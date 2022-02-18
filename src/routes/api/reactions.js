const { Router } = require("express");

const {
  addReactionForThought,
  deleteReactionFromThought,
} = require("../../controllers/api/reactions");

const router = Router({ mergeParams: true });

router.post("/", addReactionForThought);
router.delete("/:reactionId", deleteReactionFromThought);

module.exports = router;
