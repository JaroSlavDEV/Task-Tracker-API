const { body, param, query } = require('express-validator');
const Database = require('../database/DB');

const db = new Database();

const taskValidRulesPOST = () => {
  return [
    body('title')
      .notEmpty()
      .withMessage('Field is required.')
      .isLength({ min: 5, max: 50 })
      .withMessage('Length of the field must be 5-50 characters.'),

    body('description')
      .notEmpty()
      .withMessage('Field is required.')
      .isLength({ min: 5, max: 250 })
      .withMessage('Length of the field must be 2-250 characters.'),

    body('status')
      .notEmpty()
      .withMessage('Field is required.')
      .custom(value => {
        const status = ["View", "In Progress", "Done"];
        if (!status.includes(value))
          throw new Error(`Field must have one of the next value: ${status.join(', ')}.`);
        return true;
      }),

    body('user_id')
      .notEmpty()
      .withMessage('Field is required.')
      .custom(async value => {
        const sql = `SELECT COUNT(*) FROM users WHERE user_id = ${value}`;
        const result = await db.query(sql);
        const count = Object.values(result[0])[0];

        if (count === 1) return true;
        throw new Error(`Field must have the value of existing user.`);
      })
  ];
};

const taskValidRulesPUT = () => {
  return [
    body('title')
      .optional()
      .notEmpty()
      .withMessage('Field is required.')
      .isLength({ min: 5, max: 50 })
      .withMessage('Length of the field must be 5-50 characters.'),

    body('description')
      .optional()
      .notEmpty()
      .withMessage('Field is required.')
      .isLength({ min: 5, max: 250 })
      .withMessage('Length of the field must be 2-250 characters.'),

    body('status')
      .optional()
      .notEmpty()
      .withMessage('Field is required.')
      .custom(value => {
        const status = ["View", "In Progress", "Done"];
        if (!status.includes(value))
          throw new Error(`Field must have one of the next value: ${status.join(', ')}.`);
        return true;
      }),

    body('user_id')
      .optional()
      .notEmpty()
      .withMessage('Field is required.')
      .custom(async value => {
        const sql = `SELECT COUNT(*) FROM users WHERE user_id = ${value}`;
        const result = await db.query(sql);
        const count = Object.values(result[0])[0];

        if (count === 1) return true;
        throw new Error(`Field must have the value of existing user.`);
      })
  ];
};

const taskValidRulesID = () => {
  return [
    param('id')
      .custom(async value => {
        const sql = `SELECT COUNT(*) FROM tasks WHERE id = ${value}`;
        const result = await db.query(sql);
        const count = Object.values(result[0])[0];

        if (count === 1) return true;
        throw new Error(`Task with this id isn't exist.`);
      })
  ];
}

const taskValidRulesQuery = () => {
  return [
    query('sort')
      .optional()
      .custom(async value => {
        const status = ["ASC", "DESC"];
        if (!status.includes(value))
          throw new Error(`Sort by id must have one of the next value: ${status.join(', ')}.`);
        return true;
      }),

    query('status')
      .optional()
      .custom(async value => {
        const status = ["View", "In Progress", "Done"];
        if (!status.includes(value))
          throw new Error(`Filter by status must have one of the next value: ${status.join(', ')}.`);
        return true;
      })
  ];
}

module.exports = {
  taskValidRulesPOST,
  taskValidRulesPUT,
  taskValidRulesID,
  taskValidRulesQuery
};
