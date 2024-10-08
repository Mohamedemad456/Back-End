const Task = require("../models/taskModel");
const User = require("../models/userModel");

// Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const Tasks = await Task.find();
    return res.status(200).json(Tasks);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get task by id
exports.getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = Task.findById(taskId);

    if (!task) {
      res.status(404).json({ message: "Task isn't Found" });
    }
    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Create Task
exports.createTask = async (req, res) => {
  const { name, description, priority, dueDate, status, assignedUserId } =
    req.body;
  const startDate = Date.now();
  const task = new Task({
    name,
    description,
    priority,
    startDate,
    dueDate,
    status,
    assignedUserId,
  });
  const user = await User.findById(assignedUserId);
  console.log(user);

  if (!user) {
    return res.status(400).json({ message: "User does not exist" });
  }

  try {
    const newTask = await task.save();
    return res.status(200).json(newTask);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Update task
exports.updateTask = async (req, res) => {
  try {
    const { name, description, priority, startDate, dueDate, status } = req.body;
    const { id } = req.params;
    let taskExists = await Task.findById(id);
    if (!taskExists) {
      return res.status(404).json({ message: "Task not Found" });
    }
      
    await Task.findByIdAndUpdate(
      id,
      { name, description, priority, startDate, dueDate, status },
      { new: true }
    );
    return res.status(200).json({message:"Task updated succesfully!"});

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found!" });
    }
    await Task.findByIdAndDelete(id);
    res.status(200).json({ message: "Task deleted succesfully!" });
  } catch (error) {
    return res.status(500).json({message:error.message});
  }
};
