const express = require('express');
const Database = require('../database/DB');
const resServerError = require('../shared/resServerError');
const {
  taskValidRulesPOST,
  taskValidRulesPUT,
  taskValidRulesID,
  taskValidRulesQuery
} = require('../middlewares/taskValidRules');
const validate = require('../middlewares/validate');

const db = new Database();
const router = express.Router();

const table = 'tasks';

router.get('/', 
  taskValidRulesQuery(),
  validate,
  async (req, res) => {
  const filter = req.query.status ? `WHERE status = '${req.query.status}'` : '';
  const sort = req.query.sort ? `ORDER BY id ${req.query.sort}` : '';

  const sql = `SELECT * FROM ${table} ${filter} ${sort}`;

  try {
    const tasks = await db.query(sql);

    res.status(200).send({
      tasks
    });

  } catch (e) {
    resServerError(res, e);
  }
});

router.post('/',
  taskValidRulesPOST(),
  validate,
  async (req, res) => {
    const task = { ...req.body };
    const sql = `INSERT INTO ${table} SET ?`;

    try {
      await db.query(sql, task);

      res.status(201).end();

    } catch (e) {
      resServerError(res, e);
    }
});

router.put('/:id', 
  taskValidRulesID(),
  taskValidRulesPUT(),
  validate,
  async (req, res) => {
  const taskId = req.params.id;
  const task = { ...req.body };
  const sql = `UPDATE ${table} SET ? WHERE id = ${taskId}`;

  try {
    await db.query(sql, task);

    res.status(200).end();

  } catch (e) {
    resServerError(res, e);
  }
});

router.patch('/status/:id',
  taskValidRulesID(),
  taskValidRulesPUT(),
  validate,
  async (req, res) => {
  const taskId = req.params.id;
  const status = req.body.status;
  const sql = `UPDATE ${table} SET status = '${status}' WHERE id = ${taskId}`;

  try {
    await db.query(sql);

    res.status(200).end();

  } catch (e) {
    resServerError(res, e);
  }
});

router.patch('/user/:id', 
  taskValidRulesID(),
  taskValidRulesPUT(),
  validate,
  async (req, res) => {
  const taskId = req.params.id;
  const userId = req.body.user_id;
  const sql = `UPDATE ${table} SET user_id = '${userId}' WHERE id = ${taskId}`;

  try {
    await db.query(sql);

    res.status(200).end();

  } catch (e) {
    resServerError(res, e);
  }
});

router.delete('/:id', 
  taskValidRulesID(),
  validate,
  async (req, res) => {
  const taskId = req.params.id;
  const sql = `DELETE FROM ${table} WHERE id = ${taskId}`;

  try {
    await db.query(sql);

    res.status(200).end();

  } catch (e) {
    resServerError(res, e);
  }
});

module.exports = router;
