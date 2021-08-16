import express, { Router } from 'express';
import DepartmentController from '../controller/departmentController';

const departmentRouters  = Router();
const departmentController = new DepartmentController();

departmentRouters.get('/', departmentController.getDepartmentdetails);
departmentRouters.get('/:departmentId', departmentController.getDepartmentdetailsbyId);
departmentRouters.post('/',departmentController.postDepartment);
departmentRouters.put('/:departmentId',departmentController.updateDepartment);
departmentRouters.delete('/:departmentId',departmentController.deleteDepartment);

export default departmentRouters;