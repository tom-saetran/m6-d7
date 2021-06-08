import { Router } from "express";

import Model from "../../utils/model/index.js";

import query from "../../utils/db/index.js";

const route = Router();

const Tutors = new Model("tutors", "tutor_id");

route.get("/", async (req, res, next) => {
  try {
    const dbResponse = await Tutors.find(req.query);
    res.send(dbResponse);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

route.get("/:id", async (req, res, next) => {
  try {
    const dbResponse = await Tutors.findById(req.params.id);
    res.send(dbResponse);
  } catch (error) {
    res.status(error.code || 500).send({ error: error.message });
  }
});

route.get("/:id/module", async (req, res, next) => {
  try {
    const dbResponse = await query(`SELECT 
    relation.module_id,
    m.name AS module_name ,
    relation.tutor_id,
    t.name AS tutor_name,
    t.last_name AS tutor_last_name
      FROM tutor_modules 
      AS relation
      INNER JOIN tutors AS t ON relation.tutor_id=t.tutor_id 
      INNER JOIN modules AS m ON relation.module_id=m.module_id
      WHERE t.tutor_id=${req.params.id}
  `);
    res.send(dbResponse);
  } catch (error) {
    res.status(error.code || 500).send({ error: error.message });
  }
});

route.post("/:tutor_id/module/:module_id", async (req, res, next) => {
  try {
    const { tutor_id, module_id } = req.params;
    const dbResponse = await query(
      `INSERT INTO tutor_modules(tutor_id,module_id) VALUES('${tutor_id}','${module_id}')`
    );
    res.send(dbResponse);
  } catch (error) {
    res.status(error.code || 500).send({ error: error.message });
  }
});

route.delete("/:tutor_id/module/:module_id", async (req, res, next) => {
  try {
    const { tutor_id, module_id } = req.params;
    const dbResponse = await query(
      `DELETE FROM tutor_modules WHERE tutor_id=${tutor_id} AND module_id=${module_id}`
    );
    res.send(dbResponse);
  } catch (error) {
    res.status(error.code || 500).send({ error: error.message });
  }
});

route.put("/:id", async (req, res, next) => {
  try {
    const dbResponse = await Tutors.update(req.params.id, req.body);
    res.send(dbResponse);
  } catch (error) {
    res.status(500).send({ error });
  }
});

route.post("/", async (req, res, next) => {
  try {
    const dbResponse = await Tutors.create(req.body);
    res.send(dbResponse);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

route.delete("/:id", async (req, res, next) => {
  try {
    const dbResponse = await Tutors.deleteById(req.params.id);
    res.send(dbResponse);
  } catch (error) {
    res.status(500).send({ error });
  }
});
export default route;
