const users = require("./users");
const thoughts = require("./thoughts");
const mongoose = require("mongoose");
const { User, Thoughts } = require("../models");

const init = async () => {
  await mongoose.connect("mongodb://localhost:27017/socialDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Database connection successful");
  console.log(users);
  await User.deleteMany({});
  const usersFromDB = await User.insertMany(users);

  console.log("[INFO]: Successfully seeded users");

  await Thoughts.deleteMany({});
  const thoughtsFromDb = await Thoughts.insertMany(thoughts);

  console.log("[INFO]: Successfully seeded thoughts");

  // seed thoughts for users
  const allthoughts = thoughtsFromDb.map(async (thought) => {
    const username = thought.username;

    const user = usersFromDB.find((user) => user.username === username);

    user.thoughts.push(thought._id.toString());

    await User.findByIdAndUpdate(user._id, { ...user });
  });
  await Promise.all(allthoughts);

  const friendsPromise = usersFromDB.map(async (user) => {
    const userName = user.username;
    const allUsers = usersFromDB.filter(
      (currentUser) => currentUser.username != userName
    );

    const randomFriend =
      usersFromDB[Math.floor(Math.random() * allUsers.length)];

    user.friends.push(randomFriend._id);

    await User.findByIdAndUpdate(user._id, { ...user });
  });

  await Promise.all(friendsPromise);

  await mongoose.disconnect();
};

init();
