INSERT INTO department
  (department_name)
VALUES
  ('engineer'),
  ('analitics'),
  ('legal');
  

  INSERT INTO role
  (title, salary, department_id)
VALUES
  ('CEO', 1.1, 1),
  ('assistant', 10.1, 2),
  ('assistant', 100000.1, 3),
  ('lawyer', 100000000.1, 3);




  INSERT INTO employee
  (first_name, last_name, role_id, manager_id)
VALUES
  ('Ronald', 'Firbank', 1, NULL),
  ('Virginia', 'Woolf', 1, 1), 
  ('Piers', 'Gaveston', 1, 1), 
  ('Charles', 'LeRoi', 2, 3); 

--   ('Ronald', 'Firbank', 1, 1), -- role: CEO ; Manager: Ronald
--   ('Virginia', 'Woolf', 1, 1), -- role: CEO ; Manager: Ronald
--   ('Piers', 'Gaveston', 1, 1), -- role: CEO ; Manager: Ronald
--   ('Charles', 'LeRoi', 2, 3); -- role: assistant ; Manager: Piers
  