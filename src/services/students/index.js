import { Router } from "express";

import query from "../../utils/db/index.js";

const route = Router();

route.get("/", async (req, res, next) => {
  try {
    const dbResponse = await query(
      "SELECT * FROM students ORDER BY created_at DESC"
    );
    res.send(dbResponse);
  } catch (error) {
    res.status(500).send({ error });
  }
});

route.get("/:id", async (req, res, next) => {
  try {
    const dbResponse = await query(
      `SELECT * FROM students WHERE student_id=${req.params.id}`
    );
    res
      .status(dbResponse ? 200 : 404)
      .send(dbResponse ? dbResponse : { error: "student not found" });
  } catch (error) {
    res.status(500).send({ error });
  }
});

route.put("/:id", async (req, res, next) => {
  try {
    const { name, last_name, country, age } = req.body;
    const dbResponse = await query(
      `UPDATE  students SET name='${name}',last_name='${last_name}', country='${country}', age=${age} WHERE student_id=${req.params.id} RETURNING *`
    );
    res.send(dbResponse);
  } catch (error) {
    res.status(500).send({ error });
  }
});

route.post("/", async (req, res, next) => {
  try {
    const { name, last_name, country, age } = req.body;
    const dbResponse = await query(
      `INSERT INTO students (name,last_name,country,age) VALUES('${name}', '${last_name}', '${country}', ${age}) RETURNING *`
    );
    res.send(dbResponse);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

route.delete("/:id", async (req, res, next) => {
  try {
    const dbResponse = await query(
      `DELETE FROM students WHERE student_id=${req.params.id}`
    );
    res.send(dbResponse);
  } catch (error) {
    res.status(500).send({ error });
  }
});
export default route;
