import Pool from '../dbconfig/dbconnector';
import log from '../logHandler';

class DepartmentController {

    public async getDepartmentdetails(req,res){
        try {
            const client = await Pool.connect();

            const sql = "SELECT * from Departments";
            const { rows }  = await client.query(sql);
            const departmentInformation = rows;

            client.release();
            log.info("Getting the data from Departments");
            res.send(departmentInformation);
        }
        catch(error){
            log.error('Can not get the department information')
            res.status(400).send(error)
        }
    }

    public async getDepartmentdetailsbyId(req,res){
        try {

            const id = parseInt(req.params.departmentId);
            const client = await Pool.connect();

            const sql = `SELECT * from Departments where id=${id}`;
            const { rows }  = await client.query(sql);
            const departmentInformation = rows;

            client.release();
            log.info("Getting the data from Departments");
            res.send(departmentInformation);
        }
        catch(error){
            log.error('Can not get the department information')
            res.status(400).send(error)
        }
    }

    public async postDepartment(req,res){
        try{
            
            const client = await Pool.connect();
            const {department_name} = req.body;
            // console.log(department_name)

            let sql = `INSERT INTO DEPARTMENTS(Name) VALUES('${department_name}')`;
            await client.query(sql); 

            sql = "SELECT * from Departments";
            const { rows }  = await client.query(sql);
            const departmentInformation = rows;

            client.release();
            log.debug('Department added');
            res.status(201).send(departmentInformation);

        }
        catch(error){
            log.error('Can not insert values into Departments')
            res.status(400).send(error)
        }
    }

    public async updateDepartment(req,res){
        try{

            const id = parseInt(req.params.departmentId);
            // console.log(id);
            const client = await Pool.connect();
            const {department_name} = req.body;
            let sql = `UPDATE DEPARTMENTS set name='${department_name}' where id=${id}`;
            await client.query(sql); 

            sql = `SELECT * from Departments where id=${id}`;
            const { rows }  = await client.query(sql);
            const departmentInformation = rows;

            client.release();
            log.warn('Department Updated');
            res.status(201).send(departmentInformation);


        }
        catch(error){
            log.error(`Can not update values of ${req.params.departmentId} in Departments`);
            res.status(400).send(error)
        }
    }

    public async deleteDepartment(req,res){
        try{

            const id = parseInt(req.params.departmentId);
            const client = await Pool.connect();
            let sql = `DELETE from DEPARTMENTS where id=${id}`;
            await client.query(sql);

            sql = "SELECT * from Departments";
            const { rows }  = await client.query(sql);
            const departmentInformation = rows;


            client.release();
            log.info('Department deleted');
            log.warn('Employee with same department_id will be set to null');
            res.status(201).send(departmentInformation);

        }
        catch(error){
            log.error(`Can not delete the ${req.params.departmentId} in Departments`);
            res.status(400).send(error)
        }
    }





}

export default DepartmentController;