"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbconnector_1 = __importDefault(require("../dbconfig/dbconnector"));
const logHandler_1 = __importDefault(require("../logHandler"));
class EmployeeController {
    getEmployeeDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield dbconnector_1.default.connect();
                const sql = "SELECT * from Employee";
                const { rows } = yield client.query(sql);
                const employeeInformation = rows;
                client.release();
                logHandler_1.default.info("Getting the data from Employee");
                res.send(employeeInformation);
            }
            catch (error) {
                logHandler_1.default.error('Can not get the employee information');
                res.status(400).send(error);
            }
        });
    }
    getEmployeeDetailsbyId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.employeeId);
                const client = yield dbconnector_1.default.connect();
                const sql = `SELECT * from Employee where employee_id=${id}`;
                const { rows } = yield client.query(sql);
                const employeeInformation = rows;
                client.release();
                logHandler_1.default.info("Getting the data from Employee");
                res.send(employeeInformation);
            }
            catch (error) {
                logHandler_1.default.error('Can not get the employee information');
                res.status(400).send(error);
            }
        });
    }
    postEmployee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, department_id } = req.body;
                // console.log(name,department_id);
                const client = yield dbconnector_1.default.connect();
                // const sql = "Update Employee set Name=Name and department_id=department_id where employee_id=id"
                let sql = `INSERT INTO Employee(name,department_id) VALUES('${name}',${department_id});`;
                yield client.query(sql);
                sql = "SELECT * from Employee";
                const { rows } = yield client.query(sql);
                const employeeInformation = rows;
                client.release();
                logHandler_1.default.debug('Employee Added');
                res.status(201).send(employeeInformation);
            }
            catch (error) {
                logHandler_1.default.error('Error In Post request in employee');
                // log.error('Can Not Connect with DB')
                // console.log('error state')
                res.status(400).send(error);
            }
        });
    }
    updateEmployee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.employeeId);
                const { name, department_id } = req.body;
                // console.log(name,department_id);
                const client = yield dbconnector_1.default.connect();
                let sql = `Update Employee set name='${name}', department_id=${department_id} where employee_id=${id}`;
                yield client.query(sql);
                sql = `SELECT * from Employee where employee_id=${id}`;
                const { rows } = yield client.query(sql);
                const employeeInformation = rows;
                client.release();
                logHandler_1.default.warn('Updated Employee');
                res.status(201).send(employeeInformation);
            }
            catch (error) {
                logHandler_1.default.error(`Error in updating the employee details with employee id:${req.params.employeeId}`);
                res.status(400).send(error);
            }
        });
    }
    deleteEmployee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.employeeId);
                const client = yield dbconnector_1.default.connect();
                let sql = `DELETE FROM Employee where employee_id=${id}`;
                yield client.query(sql);
                sql = "SELECT * from Employee";
                const { rows } = yield client.query(sql);
                const employeeInformation = rows;
                client.release();
                logHandler_1.default.warn('Employee Deleted');
                res.status(201).send(employeeInformation);
            }
            catch (error) {
                logHandler_1.default.error(`Error in deleting the employee details with employee id:${req.params.employeeId}`);
                res.status(400).send(error);
            }
        });
    }
}
exports.default = EmployeeController;
//# sourceMappingURL=employeeController.js.map