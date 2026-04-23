import express from "express";
const router = express.Router();

import {
  getEmployees,
  getEmployee,
  createEmployee,
  deleteEmployee,
  updateEmployee
} from "../db/queries/employees.js";

// GET /employees
router.get("/", async (req, res, next) => {
  try {
    const employees = await getEmployees();
    res.send(employees);
  } catch (err) {
    next(err);
  }
});

// POST /employees
router.post("/", async (req, res, next) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).send({ error: "Request body required" });
    }

    const { name, birthday, salary } = req.body;

    if (!name || !birthday || salary === undefined) {
      return res.status(400).send({ error: "Missing required field" });
    }

    const employee = await createEmployee({ name, birthday, salary });
    res.status(201).send(employee);
  } catch (err) {
    next(err);
  }
});

// GET /employees/:id
router.get("/:id", async (req, res, next) => {
  try {
    const employee = await getEmployee(req.params.id);

    if (!employee) {
      return res.status(404).send({ error: "Employee not found" });
    }

    res.status(200).send(employee);
  } catch (err) {
    next(err);
  }
});

// DELETE /employees/:id
router.delete("/:id", async (req, res, next) => {
  try {
    const employee = await deleteEmployee(req.params.id);

    if (!employee) {
      return res.status(404).send({ error: "Employee not found" });
    }

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

// PUT /employees/:id
router.put("/:id", async (req, res, next) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).send({ error: "Request body required" });
    }

    const { name, birthday, salary } = req.body;

    if (!name || !birthday || salary === undefined) {
      return res.status(400).send({ error: "Missing required field" });
    }

    const existingEmployee = await getEmployee(req.params.id);

    if (!existingEmployee) {
      return res.status(404).send({ error: "Employee not found" });
    }

    const updatedEmployee = await updateEmployee({
      id: req.params.id,
      name,
      birthday,
      salary,
    });

    res.status(200).send(updatedEmployee);
  } catch (err) {
    next(err);
  }
});

export default router;