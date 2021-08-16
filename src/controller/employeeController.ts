import Pool from '../dbconfig/dbconnector';
import log from '../logHandler';

class EmployeeController {

    public async getEmployeeDetails(req,res){
        
        try {
            const client = await Pool.connect();

            const sql = "SELECT * from Employee";
            const { rows }  = await client.query(sql);
            const employeeInformation = rows;

            client.release();
            log.info("Getting the data from Employee");
            res.send(employeeInformation);
        }
        catch(error){
            log.error('Can not get the employee information')
            res.status(400).send(error)
        }
    }

    public async getEmployeeDetailsbyId(req,res){
        
        try {

            const id = parseInt(req.params.employeeId);
            const client = await Pool.connect();

            const sql = `SELECT * from Employee where employee_id=${id}`;
            const { rows }  = await client.query(sql);
            const employeeInformation = rows;

            client.release();
            log.info("Getting the data from Employee");
            res.send(employeeInformation);
        }
        catch(error){
            log.error('Can not get the employee information')
            res.status(400).send(error)
        }
    }



    public async postEmployee(req,res){
        try{
            const {name,department_id} = req.body;
            // console.log(name,department_id);
            const client = await Pool.connect();

            // const sql = "Update Employee set Name=Name and department_id=department_id where employee_id=id"
            let sql = `INSERT INTO Employee(name,department_id) VALUES('${name}',${department_id});`
            await client.query(sql); 

            sql = "SELECT * from Employee";
            const { rows }  = await client.query(sql);
            const employeeInformation = rows;

            client.release();
            log.debug('Employee Added')
            res.status(201).send(employeeInformation)

        }
        catch (error){
            log.error('Error In Post request in employee')
            // log.error('Can Not Connect with DB')
            // console.log('error state')
            res.status(400).send(error)
        }
    }

    public async updateEmployee(req,res){
        try{
            const id = parseInt(req.params.employeeId);
            const {name,department_id} = req.body;
            // console.log(name,department_id);
            const client = await Pool.connect();
            let sql = `Update Employee set name='${name}', department_id=${department_id} where employee_id=${id}`

            await client.query(sql); 

            sql = `SELECT * from Employee where employee_id=${id}`;
            const { rows }  = await client.query(sql);
            const employeeInformation = rows;


            client.release();
            log.warn('Updated Employee')
            res.status(201).send(employeeInformation)

        }
        catch(error){
            log.error(`Error in updating the employee details with employee id:${req.params.employeeId}`);
            res.status(400).send(error)
        }

    }

    public async deleteEmployee(req,res){
        try{
            const id = parseInt(req.params.employeeId);
            
            const client = await Pool.connect();
            let sql = `DELETE FROM Employee where employee_id=${id}`

            await client.query(sql); 

            sql = "SELECT * from Employee";
            const { rows }  = await client.query(sql);
            const employeeInformation = rows;

            client.release();
            log.warn('Employee Deleted')
            res.status(201).send(employeeInformation);

        }
        catch(error){
            log.error(`Error in deleting the employee details with employee id:${req.params.employeeId}`);
            res.status(400).send(error)
        }

    }
}

export default EmployeeController;