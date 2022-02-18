const { Router } = require("express");

const {
  addNewReactionToThought,
  removeReactionFromThought,
} = require("../../controllers/api/reactions");

const router = Router({ mergeParams: true });

router.post("/", addNewReactionToThought);
router.delete("/:reactionId", removeReactionFromThought);

module.exports = router;
