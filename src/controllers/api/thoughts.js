const { Thoughts } = require("../../models");

const getAllThought = async (req, res) => {
  try {
    const thoughts = await Thoughts.find({}).populate("reactions");
    return res.json({ success: true, data: thoughts });
  } catch (error) {
    console.log(
      `[ERROR]: Failed to get all thoughts from DB | ${error.message}`
    );
    return res
      .status(500)
      .json({ success: false, error: "Failed to get all thoughts" });
  }
};
const getThoughtByID = async (req, res) => {
  try {
    const { id } = req.params;
    const thought = await Thoughts.findById(id).populate("reactions");
    return res.json({ success: true, data: thought });
  } catch (error) {
    console.log(`[ERROR]: Failed to get user by ID | ${error.message}`);
    return res
      .status(500)
      .json({ success: false, error: "Failed to get thoughts by ID" });
  }
};
const createThought = async (req, res) => {
  try {
    const { thoughtText, username, userId } = req.body;
    const thought = await Thoughts.create({ thoughtText, username, userId });
    return res.json({ success: true, data: thought });
  } catch (error) {
    console.log(`[ERROR]: Failed to create user | ${error.message}`);
    return res
      .status(500)
      .json({ success: false, error: "Failed to create thought in the DB" });
  }
};
const updateThoughtByID = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const thoughts = await Thoughts.findByIdAndUpdate(
      id,
      { ...body },
      { new: true }
    );

    return res.json({ success: true, data: thoughts });
  } catch (error) {
    console.log(`[ERROR]: Failed to update thought by ID | ${error.message}`);
    return res
      .status(500)
      .json({ success: false, error: "Failed to update user" });
  }
};

const deleteThoughtByID = async (req, res) => {
  try {
    const { id } = req.params;
    const thought = await Thoughts.findByIdAndDelete(id);
    return res.json({ success: true, data: thought });
  } catch (error) {
    console.log(`[ERROR]: Failed to delete thought from DB | ${error.message}`);
    return res
      .status(500)
      .json({ success: false, error: "Failed to delete thought from DB" });
  }
};

module.exports = {
  getAllThought,
  getThoughtByID,
  createThought,
  updateThoughtByID,
  deleteThoughtByID,
};
