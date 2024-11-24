const pool = require('./connection');

// View all departments
const viewDepartments = async () => {
  const { rows } = await pool.query('SELECT * FROM department');
  return rows;
};

// View all roles
const viewRoles = async () => {
  const query = `
    SELECT role.id, role.title, department.name AS department, role.salary
    FROM role
    JOIN department ON role.department_id = department.id`;
  const { rows } = await pool.query(query);
  return rows;
};

// View all employees
const viewEmployees = async () => {
  const query = `
    SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department,
           role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    JOIN role ON employee.role_id = role.id
    JOIN department ON role.department_id = department.id
    LEFT JOIN employee AS manager ON employee.manager_id = manager.id`;
  const { rows } = await pool.query(query);
  return rows;
};

// Add a department
const addDepartment = async (name) => {
  await pool.query('INSERT INTO department (name) VALUES ($1)', [name]);
};

// Add a role
const addRole = async (title, salary, department_id) => {
  await pool.query(
    'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)',
    [title, salary, department_id]
  );
};

// Add an employee
const addEmployee = async (first_name, last_name, role_id, manager_id) => {
  await pool.query(
    'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
    [first_name, last_name, role_id, manager_id]
  );
};

// Update employee role
const updateEmployeeRole = async (employee_id, role_id) => {
  await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [role_id, employee_id]);
};

module.exports = {
  viewDepartments,
  viewRoles,
  viewEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
};
