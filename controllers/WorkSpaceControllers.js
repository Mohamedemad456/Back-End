const Task = require('../models/taskModel');
const WorkSpace = require('../models/WorkSpaceModel');


exports.getWorkSpace = async (req,res) =>{

    try {
        const workSpaces = await WorkSpace.find().populate("tasks").populate({
            path: 'tasks', // Populate tasks array in the workspace
            populate: {
                path: 'categoryId', // Populate the categoryId inside each task
                model: 'Category' // Model to populate from
            }
        });
        if(!workSpaces){
            return res.status(404).json({message:"No workspaces Found"});
        }

        return res.status(200).json(workSpaces);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};


exports.getWorkSpaceById = async(req,res)=>{
    try {
        const workSpaceId = req.params.id;
        const workspace = WorkSpace.findById(workSpaceId);
        if(!workspace){
            return res.status(404).json({message:"No workspace Found"});
        }
        return res.status(200).json(workspace);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}


exports.createWorkspace = async(req,res)=>{
    try {
        const {name, userId,tasks}= req.body;
        const createdAt = Date.now();
        const workspace = new WorkSpace({name,createdAt,tasks,userId});

        const newWorkSpace = await workspace.save();
        return res.status(200).json(newWorkSpace);

    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}



exports.deleteWorkSpace = async(req,res)=>{
    try {
        const workSpaceId = req.params.id;
        const workspace = await WorkSpace.findById(workSpaceId);
        if(!workspace){
            return res.status(404).json({message:"No workspace Found"});
        }

        if(workspace.tasks.length !== 0){
            workspace.tasks.map(async(taskId)=>{
                await Task.findByIdAndDelete(taskId);
            })
        }
        await WorkSpace.findByIdAndDelete(workSpaceId);
        return res.status(200).json({message:"WorkSpace Deleted Succesfully"});
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}