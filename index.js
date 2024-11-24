const inquirer = require('inquirer');
const db = require('./db/queries');

const mainMenu = async () => {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View All Departments',
        'View All Roles',
        'View All Employees',
        'Add a Department',
        'Add a Role',
        'Add an Employee',
        'Update an Employee Role',
        'Exit',
      ],
    },
  ]);

  switch (action) {
    case 'View All Departments':
      console.table(await db.viewDepartments());
      break;
    case 'View All Roles':
      console.table(await db.viewRoles());
      break;
    case 'View All Employees':
      console.table(await db.viewEmployees());
      break;
    case 'Add a Department':
      const { deptName } = await inquirer.prompt([
        { type: 'input', name: 'deptName', message: 'Enter department name:' },
      ]);
      await db.addDepartment(deptName);
      console.log(`Added department: ${deptName}`);
      break;
    case 'Add a Role':
      const { title, salary, department_id } = await inquirer.prompt([
        { type: 'input', name: 'title', message: 'Enter role title:' },
        { type: 'input', name: 'salary', message: 'Enter role salary:' },
        { type: 'input', name: 'department_id', message: 'Enter department ID:' },
      ]);
      await db.addRole(title, salary, department_id);
      console.log(`Added role: ${title}`);
      break;
    case 'Add an Employee':
      const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
        { type: 'input', name: 'first_name', message: 'Enter first name:' },
        { type: 'input', name: 'last_name', message: 'Enter last name:' },
        { type: 'input', name: 'role_id', message: 'Enter role ID:' },
        { type: 'input', name: 'manager_id', message: 'Enter manager ID (or leave blank):', default: null },
      ]);
      await db.addEmployee(first_name, last_name, role_id, manager_id);
      console.log(`Added employee: ${first_name} ${last_name}`);
      break;
    case 'Update an Employee Role':
      const { employee_id, new_role_id } = await inquirer.prompt([
        { type: 'input', name: 'employee_id', message: 'Enter employee ID:' },
        { type: 'input', name: 'new_role_id', message: 'Enter new role ID:' },
      ]);
      await db.updateEmployeeRole(employee_id, new_role_id);
      console.log('Updated employee role.');
      break;
    case 'Exit':
      process.exit();
  }

  mainMenu();
};

// Start the application
mainMenu();
