const express = require("express");
const Team = require("../models/Team");

const router = express.Router();

// CREATE TEAM
router.post("/create", async (req, res) => {
  try {
    const { name, members } = req.body;

    const team = new Team({
      name,
      members
    });

    await team.save();

    res.json({
      message: "Team created successfully",
      team
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;