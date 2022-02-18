const { Router } = require("express");

const {
  addReactionForThought,
  removeReactionFromThought,
} = require("../../controllers/api/reactions");

const router = Router({ mergeParams: true });

router.post("/", addReactionForThought);
router.delete("/:reactionId", removeReactionFromThought);

module.exports = router;
