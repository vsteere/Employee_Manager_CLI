INSERT INTO department (name)
VALUES ('Production'), ('Design'), ('Administration'), ('Logistics');

INSERT INTO role (title, salary, department_id)
VALUES ('Engineer', 95000, 1), ('Senior Engineer', 125000, 2), ('Manager', 150000, 1), ('Manager', 150000, 2), ('DBA', 105000, 3), ('Analyst', 100000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Smith', 1, 3), ('Jane', 'Smith', 2, 3), ('Ivan', 'Ivanov', 3, NULL), ('Sergey', 'Ilyenkov', 4, NULL), ('Jane', 'Doe', 5, 4), ('John', 'Doe', 6, 4);