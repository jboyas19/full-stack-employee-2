import express from "express";
import employeesRouter from "./api/employees.js";

const app = express();

app.use(express.json());

// GET /
app.get("/", (req, res) => {
  res.send("Welcome to the Fullstack Employees API.");
});

// Mount employees routes at /employees
app.use("/employees", employeesRouter);

// basic error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send({ error: "Internal server error" });
});

export default app;