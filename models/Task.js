const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: "",
  },
  completed: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  sharedWith: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  comments: [{
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  text: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
}],
  tags: [String],
}, {
  timestamps: true,
});

module.exports = mongoose.model("Task", taskSchema);
