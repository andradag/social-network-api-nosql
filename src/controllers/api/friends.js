const { User } = require("../../models");

const addNewFriendToUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const newFriend = await User.findByIdAndUpdate(userId, {
      $push: { friends: { _id: id } },
    });

    return res.json({ success: true, data: newFriend });
  } catch (error) {
    console.log(`[ERROR]: Failed to create friend for user | ${error.message}`);
    return res
      .status(500)
      .json({ success: false, error: "Failed to create friend for user" });
  }
};

const deleteUserFriend = async (req, res) => {
  try {
    const deleteFriend = await User.findByIdAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    );

    return res.json({ success: true, data: deleteFriend });
  } catch (error) {
    console.log(`[ERROR]: Failed to delete friend | ${error.message}`);
    return res
      .status(500)
      .json({ success: false, error: "Failed to delete friend" });
  }
};

module.exports = { addNewFriendToUser, deleteUserFriend };
