const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/auth");

const router = express.Router();

// CREATE TASK
router.post("/create", auth, async (req, res) => {
  try {
    const task = new Task({
      title: req.body.title,
      description: req.body.description,
      assignedTo: req.user.id, // 🔥 auto user from token
      teamId: req.body.teamId
    });

    await task.save();

    res.json({
      message: "Task created successfully",
      task
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

// GET TASKS BY TEAM
router.get("/team/:teamId", async (req, res) => {
  try {
    const tasks = await Task.find({ teamId: req.params.teamId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE TASK STATUS
router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(task);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;