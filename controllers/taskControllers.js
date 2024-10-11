const Task = require("../models/taskModel");
const User = require("../models/userModel");
const WorkSpace = require("../models/WorkSpaceModel");
const workSpace = require('../models/WorkSpaceModel');

const priorityLevels = {
  "Low":1,
  "Medium":2,
  "Hard":3,
  "Critical":4
};

const statusLevels = {
  "Pending":1,
  "In Progress":2,
  "Completed":3,
  "Paused":4,
  "Cancelled":5
}
// Get all tasks
exports.getTasks = async (req, res) => {
  const {sortingOption, sorting} = req.body;
  if(sortingOption){
    switch (sortingOption) {
      case "priority":
        {
          try {
            const tasks = await Task.find().populate("categoryId");
        

              // Sort the tasks on the application side after fetching them
              tasks.sort((a, b) => {
                const sortDirection = sorting === "asc" ? 1 : -1;
                return sortDirection * (priorityLevels[a.priority] - priorityLevels[b.priority]);
              });
        
            return res.json(tasks);
          } catch (error) {
            return res.status(500).json({ message: error.message });
          }
        }
        case "status":
          {
            try {
              const tasks = await Task.find().populate("categoryId");
          
  
                // Sort the tasks on the application side after fetching them
                tasks.sort((a, b) => {
                  const sortDirection = sorting === "asc" ? 1 : -1;
                  return sortDirection * (statusLevels[a.status] - statusLevels[b.status]);
                });
          
              return res.json(tasks);
            } catch (error) {
              return res.status(500).json({ message: error.message });
            }
          }
        case "category":
          {
            try {
              const tasks = await Task.find().populate("categoryId");
    
              // Sort tasks by category name alphabetically
              tasks.sort((a, b) => {
                const sortDirection = sorting === "asc" ? 1 : -1;
                return sortDirection * a.categoryId.name.localeCompare(b.categoryId.name);
              });
    
              return res.json(tasks);
            } catch (error) {
              return res.status(500).json({ message: error.message });
            }
          }
          }
          }
  else{
  try {
    const Tasks = await Task.find().populate("categoryId");
    return res.status(200).json(Tasks);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}};

// Get task by id
exports.getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = Task.findById(taskId).populate("categoryId");

    if (!task) {
      res.status(404).json({ message: "Task isn't Found" });
    }
    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get Task By cateogry

exports.getTasksByCategoryId = async(req,res)=>{
  try {
    const categoryId = req.params.categoryId;
    const tasks = await Task.find({categoryId:categoryId}).populate("categoryId");

    if(tasks.length === 0){
      return res.status(404).json({message:"Task Not Found"});
    }
    return res.json(tasks);
  } catch (error) {
    return res.status(500).json({message:error.message});
  }
}

// Create Task
exports.createTask = async (req, res) => {
  const { name, description, priority, dueDate, status, assignedUserId, categoryId, workSpaceId } =
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
    categoryId
  });
  const user = await User.findById(assignedUserId);

  if (!user) {
    return res.status(400).json({ message: "User does not exist" });
  }
  
  const workspace = await WorkSpace.findById(workSpaceId);
  if(!workspace){
    return res.status(400).json({ message: "workspace does not exist" });
  }

  try {
    const newTask = await task.save();
    workspace.tasks.push(task._id);
    await workspace.save();
    return res.status(200).json(newTask);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Update task
exports.updateTask = async (req, res) => {
  try {
    const { name, description, priority, startDate, dueDate, status, categoryId } = req.body;
    const { id } = req.params;
    let taskExists = await Task.findById(id);
    if (!taskExists) {
      return res.status(404).json({ message: "Task not Found" });
    }
      
    await Task.findByIdAndUpdate(
      id,
      { name, description, priority, startDate, dueDate, status, categoryId },
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
    const { taskId, workSpaceId } = req.params;
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found!" });
    }

    const workspace = await WorkSpace.findById(workSpaceId);
    if (!workspace) {
      return res.status(404).json({ message: "WorkSpace not found!" });
    }

    await Task.findByIdAndDelete(taskId);
    // remove taskid from the workspace
    workspace.tasks = workspace.tasks.filter((task) => task.toString() !== taskId);
    await workspace.save();

    res.status(200).json({ message: "Task deleted succesfully!" });
  } catch (error) {
    return res.status(500).json({message:error.message});
  }
};



