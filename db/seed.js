import client from "./client.js";
import { createEmployee } from "./queries/employees.js";

await client.connect();

await client.query("DELETE FROM employees;");

const employees = [
  { name: "John Doe", birthday: "1990-01-01", salary: 50000 },
  { name: "Jane Smith", birthday: "1988-05-12", salary: 60000 },
  { name: "Mike Brown", birthday: "1995-03-20", salary: 55000 },
  { name: "Sara White", birthday: "1992-07-15", salary: 70000 },
  { name: "Chris Green", birthday: "1985-09-10", salary: 65000 },
  { name: "Emily Blue", birthday: "1993-11-25", salary: 52000 },
  { name: "David Black", birthday: "1991-02-18", salary: 58000 },
  { name: "Laura Gray", birthday: "1989-06-30", salary: 72000 },
  { name: "Kevin Gold", birthday: "1994-08-22", salary: 54000 },
  { name: "Anna Silver", birthday: "1996-12-05", salary: 50000 }
];

for (const emp of employees) {
  await createEmployee(emp);
}

await client.end();