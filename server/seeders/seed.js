const db = require("../config/connection");
const { User, Skill } = require("../models");
const userSeed = require("./userseed.json");
const skillSeed = require("./skillSeed.json");
db.once("open", async () => {
  try {
    await Skill.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeed);
    for (let i = 0; i < skillSeed.length; i++) {
      const { _id, skillCreator } = await Skill.create(skillSeed[i]);
      const user = await User.findOneAndUpdate(
        { email: skillCreator },
        {
          $addToSet: {
            skills: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("all done!");
  process.exit(0);
});
