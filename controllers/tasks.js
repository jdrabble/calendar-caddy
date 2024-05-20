const Task = require("../models/task");
const dayjs = require("dayjs");

module.exports = {
  index,
  new: newTask,
  create,
  show,
  update,
  delete: deleteTask,
  search,
};

async function index(req, res) {
  const task = await Task.find({}).sort({ date: 1 });

  res.render("tasks/index", {
    task,
    dayjs: dayjs,
    message: "",
  });
}

async function newTask(req, res) {
  const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
  res.render("tasks/new", { task, dayjs: dayjs, message: "" });
}

async function create(req, res) {
  try {
    if (req.body.date !== "") {
      req.body.month = dayjs(req.body.date).format("YYYY-MM");
    }

    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    const task = await Task.create(req.body);
    await task.save();
    res.redirect("/tasks");
  } catch (error) {
    res.render("tasks/new", {
      dayjs: dayjs,
      message: error,
    });
  }
}

async function show(req, res) {
  const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
  if (!task) {
    return res.redirect("/");
  } else if (task.user._id.toString() === req.user.id);
  {
    res.render("tasks/show", { task, dayjs: dayjs, message: "" });
  }
}

async function update(req, res) {
  const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
  const taskUpdate = await Task.findOne({
    _id: req.params.id,
    user: req.user._id,
  });
  try {
    taskUpdate.date = req.body.date;
    if (req.body.date !== "") {
      taskUpdate.month = dayjs(req.body.date).format("YYYY-MM");
    }
    taskUpdate.task = req.body.task;
    taskUpdate.category = req.body.category;
    await taskUpdate.save();

    res.redirect("/tasks");
  } catch (err) {
    res.render("tasks/show", {
      task,
      dayjs: dayjs,
      message: err.message,
    });
  }
}

async function deleteTask(req, res) {
  await Task.deleteOne({ _id: req.params.id, user: req.user._id });
  res.redirect("/tasks");
}

async function search(req, res) {
  for (let key in req.query) {
    if (req.query[key] === "") delete req.query[key];
  }
  console.log(req.query);
  try {
    const task = await Task.find(req.query).sort({
      date: 1,
    });
    if (task.length < 1) {
      res.render("tasks/index", {
        task,
        dayjs,
        message: "No tasks found",
      });
    }
    res.render("tasks/index", {
      task,
      dayjs: dayjs,
      message: "",
    });
  } catch (err) {
    res.redirect("back");
  }
}
