const { Thoughts } = require("../../models");

// * `POST` to create a reaction stored in a single thought's `reactions` array field
const addReactionForThought = async (req, res) => {
  try {
    const { id } = req.params;
    const { reactionBody, username } = req.body;

    const updatedThought = await Thoughts.findByIdAndUpdate(
      id,
      {
        $push: { reactions: { reactionBody, username } },
      },
      { new: true }
    );

    return res.json({ success: true, data: updatedThought });
  } catch (error) {
    console.log(`[ERROR]: Failed to create reaction | ${error.message}`);
    return res
      .status(500)
      .json({ success: false, error: "Failed to create reaction" });
  }
};
// * `DELETE` to pull and remove a reaction by the reaction's `reactionId` value
const deleteReactionFromThought = async (req, res) => {
  try {
    const { reactionId, id } = req.params;

    const thought = await Thoughts.findByIdAndUpdate(id, {
      $pull: { reactions: { reactionId } },
    });

    return res.json({ success: true, data: thought });
  } catch (error) {
    console.log(`[ERROR]: Failed to delete reaction | ${error.message}`);
    return res
      .status(500)
      .json({ success: false, error: "Failed to delete reaction" });
  }
};

module.exports = { addReactionForThought, deleteReactionFromThought };
