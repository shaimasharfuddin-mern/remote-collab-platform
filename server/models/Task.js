const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,

  status: {
    type: String,
    enum: ["todo", "inprogress", "done"],
    default: "todo"
  },

  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team"
  }
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);