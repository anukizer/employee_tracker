INSERT INTO department (name) VALUES ('Engineering'), ('HR'), ('Sales');

INSERT INTO role (title, salary, department_id)
VALUES
('Software Engineer', 80000, 1),
('HR Manager', 70000, 2),
('Sales Associate', 50000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Alice', 'Johnson', 1, NULL),
('Bob', 'Smith', 2, 1),
('Charlie', 'Brown', 3, 1);
