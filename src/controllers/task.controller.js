import Task from '../models/Tasks';

export async function createTask(req,res){
    const {name,done,projectId}=req.body;
    try{
        const newTask = await Task.create({
            name,
            done,
            projectId
            },{
                fields:['name','done','projectId']
        });
        if(newTask){
            res.json({
                "message":"Task created successfully",
                data:newTask
            });
        }
    }catch(e){ 
        console.error(e);
        res.status(500).json({
        message:"Unable to create task",
        data:{e}
    });
    }
}

export async function getTasks(req,res){
    try{
        const tasks= await Task.findAll({
            attributes:['id','projectId','name','done'],
            order:[
                ['id','DESC']
            ]
        })
        res.json({tasks});
    }catch(e){
        console.error(e);
        res.status(500).json({
            message:"Unable to locate tasks",
            data:{}
        }); 
    }
    
}

export async function getOneTask(req,res){
    const {id}=req.params;
    const task=await Task.findOne({
        where:{id},
        attributes:['id','projectId','name','done']
    });
    res.json({task});
}

export async function updateTask(req,res){
    const {id}=req.params;
    const{projectId, name, done}=req.body;
    try{
        const task=await Task.findOne({
            attributes:['name','projectId','done','id'],
            where:{id}
        })
        if(task){
            const updatedTask=await Task.update({
                name,
                done,
                projectId},{
                    where:{id}
                })
                res.json({
                    message:'Task Updated',
                    updatedTask
                })
        }else{
            res.status(500).json({
                message:"Unable to update task",
                data:{}
            });
        }
    }catch(e){
        console.error(e);
        res.status(500).json({
            message:"Unable to update task",
            data:{}
        }); 
    }
}

export async function deleteTask(req,res){
    const {id}=req.params;
    try{
        const totalRowsDeleted=await Task.destroy({
            where:{
                id
            }
        });
        res.json({
            message:"Task deleted successfully",
            count: totalRowsDeleted
        })
    }catch(e){
        console.error(e);
        res.status(500).json({
        message:"Unable to delete task",
        data:{e}
        })
    }
}

export async function getTasksByProject(req,res){
    const {projectId}=req.params;
    console.log(projectId);
    const tasks=await Task.findAll({
        attributes:['id','done','name','projectId'],
        where:{projectId}
   });
   res.json({tasks});
}