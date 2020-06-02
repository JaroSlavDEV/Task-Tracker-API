const express = require('express');
const Database = require('../database/DB');
const resServerError = require('../shared/resServerError');
const {
  userValidRulesPOST,
  userValidRulesPUT,
  userValidRulesID
} = require('../middlewares/userValidRules');
const validate = require('../middlewares/validate');

const db = new Database();
const router = express.Router();

const table = 'users';

router.get('/', async (req, res) => {
  const sql = `SELECT * FROM ${table}`;

  try {
    const users = await db.query(sql);

    res.status(200).send({
      users
    });

  } catch (e) {
    resServerError(res, e);
  }
});

router.post('/',  
  userValidRulesPOST(),
  validate,
  async (req, res) => {
  const sql = `INSERT INTO ${table} SET ?`;

  try {
    const user = { ...req.body };
    await db.query(sql, user);

    res.status(201).end();

  } catch (e) {
    resServerError(res, e);
  }
});

router.put('/:id',
  userValidRulesID(),
  userValidRulesPUT(),
  validate,
  async (req, res) => {
  const userId = req.params.id;
  const user = { ...req.body };
  const sql = `UPDATE ${table} SET ? WHERE user_id = ${userId}`;

  try {
    await db.query(sql, user);

    res.status(200).end();

  } catch (e) {
    resServerError(res, e);
  }
});

router.delete('/:id', 
  userValidRulesID(),
  validate,
  async (req, res) => {
  const userId = req.params.id;
  const sql = `DELETE FROM ${table} WHERE user_id = ${userId}`;

  try {
    await db.query(sql);

    res.status(200).end();

  } catch (e) {
    resServerError(res, e);
  }
});

module.exports = router;
