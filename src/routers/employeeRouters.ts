import express, { Router } from 'express';
import EmployeeController from '../controller/employeeController';

const router  = Router();
const employeeController = new EmployeeController();

router.get('/', employeeController.getEmployeeDetails);
router.get('/:employeeId', employeeController.getEmployeeDetailsbyId);
router.post('/',employeeController.postEmployee);
router.put('/:employeeId',employeeController.updateEmployee);
router.delete('/:employeeId',employeeController.deleteEmployee);

export default router;