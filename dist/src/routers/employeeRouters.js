"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employeeController_1 = __importDefault(require("../controller/employeeController"));
const router = express_1.Router();
const employeeController = new employeeController_1.default();
router.get('/', employeeController.getEmployeeDetails);
router.get('/:employeeId', employeeController.getEmployeeDetailsbyId);
router.post('/', employeeController.postEmployee);
router.put('/:employeeId', employeeController.updateEmployee);
router.delete('/:employeeId', employeeController.deleteEmployee);
exports.default = router;
//# sourceMappingURL=employeeRouters.js.map