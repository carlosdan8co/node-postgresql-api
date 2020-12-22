import Project from '../models/Project';

export async function getProjects(req,res){
    try{
        const projects= await Project.findAll()
        res.json({
            data:projects
        });
    }catch(e){
        res.status(500).json({
            message:"Unable to locate projects",
            data:{}
        }); 
    }
    
};

export async function createProject(req,res){
    const {name, priority, description, deliverydate}= req.body;
    try{
        let newProject =await Project.create({
            name,
            priority,
            description,
            deliverydate
        },{
            fields:['name','priority','description','deliverydate']
        });
        if(newProject){
            res.json({
                "message":"Project created successfully",
                data:newProject
            });
        }
    }catch(e){
        res.status(500).json({
            message:"Unable to create project",
            data:{}
        });
    }
    console.log(req.body);
  //  res.send('Recieved');
};

export async function getOneProject(req,res){
    const {id}=req.params;
    try{
        const project = await Project.findOne({
            where:{
                id
            }
        });
        res.json(project);
    }catch(e){
        res.json(e);
    }
};

export async function deleteProject(req,res){
    const {id}=req.params;
    try{
        const deleteRowCount= await Project.destroy({
            where:{
                id
            }
        });
        res.json({
            message:'Project deleted successfully',
            count:deleteRowCount
        })
    }catch(e){
        res.status(500).json({
            message:`Unable to delete project ${id}`,
            data:{e}
        });
    }
    
};

export async function updateProject(req,res){
    const {id}= req.params;
    const{name,priority,description,deliverydate}= req.body;
    try{
        const projects= await Project.findAll({
            attributes:['id','priority','description','deliverydate'],
            where:{
                id
            }
        });
        if(projects.length>0){
            projects.forEach(async project=>{
                await project.update({
                    name,
                    priority,
                    description,
                    deliverydate
                });
            })
        }
        return res.json({
            message:"Project Updated Successfully",
            data:projects
        })
    }catch(e){
        console.log(e);
        res.status(500).json({
            message:`Unable to update project ${id}`,
            data:e
        })
    }
}