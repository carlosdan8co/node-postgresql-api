import {Router} from 'express';
const router= Router();

import {createTask,getTasks,updateTask,getTasksByProject,getOneTask,deleteTask} from '../controllers/task.controller';

router.get('/',getTasks);
router.get('/:id',getOneTask);
// /api/tasks/project/:projectId
router.get('/project/:projectId',getTasksByProject);
router.post('/',createTask);
router.put('/:id',updateTask);
router.delete('/:id',deleteTask);

export default router;