INSERT INTO department (name)
VALUES ('John Smith'), ('Jane Smith'), ('Ivan Ivanov'), ('Sergey Ilyenkov'), ('Jane Doe'), ('John Doe');

INSERT INTO role (title, salary, department_id)
VALUES ('Engineer', 95000, 1), ('Senior Engineer', 125000, 2), ('Manager', 150000, 3), ('Manager', 150000, 4), ('DBA', 105000, 5), ('Analyst', 100000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Smith', 1, 3), ('Jane', 'Smith', 2, 3), ('Ivan', 'Ivanov', 3, NULL), ('Sergey', 'Ilyenkov', 4, NULL), ('Jane', 'Doe', 5, 4), ('John', 'Doe', 6, 4);