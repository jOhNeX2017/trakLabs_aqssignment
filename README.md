# trakLabs_assignment


<!-- npm install typescript tslint --save-dev -->

# Packages used:
tslog\
tslint\
pg\
express

First of all install all the dependencies by following command - 

### 'npm install'
        or
### 'yarn'   

Now after this run the following command to create run the tslint so that it can be converted into js. 

### 'npm run build'
        or
### 'yarn build' 

After this all things are set we can run the project by the command 

### 'npm start' 
     or
### 'yarn start' 
We will get the result at \
http://localhost:4000/employee \
http://localhost:4000/departments 


Endpoint present in the projects -\
For Employee\
http://localhost:4000/employee                              - GET, POST request\
http://localhost:4000/employee/:employeeId                  - GET, PUT, DELETE request\


For Departments
http://localhost:4000/departments                           - GET, POST request
http://localhost:4000/departments/:departmentId             - GET, PUT, DELETE request


Before running the please create following table in postgresql-

Create Table employee (
name VARCHAR(255) not null,
employee_id int GENERATED ALWAYS AS IDENTITY,
department_id int,
PRIMARY KEY(employee_id),
CONSTRAINT fk_departments
        FOREIGN KEY (department_id)
                References DEPARTMENTS(id)
                ON DELETE SET NULL
);



