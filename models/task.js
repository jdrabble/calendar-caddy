const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    date: {
      type: Date,
      required: [true, "Must enter date"],
    },
    month: {
      type: Date,
    },
    task: {
      type: String,
      required: [true, "Must enter task"],
    },
    category: {
      type: String,
      required: [true, "Must enter type"],
      enum: [
        "Work",
        "Study",
        "Sport",
        "House",
        "BMC",
        "Car",
        "Financial",
        "Health",
        "Family",
        "Friends",
        "Fun",
        "Occasion",
        "Other",
      ],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);
