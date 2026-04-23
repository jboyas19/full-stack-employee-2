import client from "../client.js";

export async function getEmployees() {
  const { rows } = await client.query("SELECT * FROM employees ORDER BY id;");
  return rows;
}

export async function getEmployee(id) {
  const { rows: [employee] } = await client.query(
    "SELECT * FROM employees WHERE id = $1;",
    [id]
  );
  return employee;
}

export async function createEmployee({ name, birthday, salary }) {
  const { rows: [employee] } = await client.query(
    `INSERT INTO employees(name, birthday, salary)
     VALUES($1, $2, $3)
     RETURNING *;`,
    [name, birthday, salary]
  );
  return employee;
}

export async function deleteEmployee(id) {
  const { rows: [employee] } = await client.query(
    "DELETE FROM employees WHERE id = $1 RETURNING *;",
    [id]
  );
  return employee;
}

/* 🔥 THIS IS THE FIX */
export async function updateEmployee(employee) {
  if (!employee || !employee.id) return;

  const { id, name, birthday, salary } = employee;

  const { rows: [updated] } = await client.query(
    `UPDATE employees
     SET name = $1, birthday = $2, salary = $3
     WHERE id = $4
     RETURNING *;`,
    [name, birthday, salary, id]
  );

  return updated;
}