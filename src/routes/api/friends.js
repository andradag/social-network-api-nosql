const { Router } = require("express");
const {
  deleteUserFriend,
  addNewFriendToUser,
} = require("../../controllers/api/friends");

const router = Router({ mergeParams: true });

router.post("/", addNewFriendToUser);
router.delete("/:friendId", deleteUserFriend);

module.exports = router;
