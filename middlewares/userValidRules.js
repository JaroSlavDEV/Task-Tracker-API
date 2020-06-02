const { body, param } = require('express-validator');
const Database = require('../database/DB');

const db = new Database();

const userValidRulesPOST = () => {
  return [
    body('first_name')
      .notEmpty()
      .withMessage('Field is required.')
      .isLength({ min: 2, max: 26 })
      .withMessage('Length of the field must be 2-26 characters.'),

    body('last_name')
      .notEmpty()
      .withMessage('Field is required.')
      .isLength({ min: 2, max: 26 })
      .withMessage('Length of the field must be 2-26 characters.')
  ];
};

const userValidRulesPUT = () => {
  return [
    body('first_name')
      .optional()
      .notEmpty()
      .withMessage('Field is required.')
      .isLength({ min: 2, max: 26 })
      .withMessage('Length of the field must be 2-26 characters.'),

    body('last_name')
      .optional()
      .notEmpty()
      .withMessage('Field is required.')
      .isLength({ min: 2, max: 26 })
      .withMessage('Length of the field must be 2-26 characters.')
  ];
};

const userValidRulesID = () => {
  return [
    param('id')
      .custom(async value => {
        const sql = `SELECT COUNT(*) FROM users WHERE user_id = ${value}`;
        const result = await db.query(sql);
        const count = Object.values(result[0])[0];

        if (count === 1) return true;
        throw new Error(`User with this id isn't exist.`);
      })
  ];
}

module.exports = {
  userValidRulesPOST,
  userValidRulesPUT,
  userValidRulesID
};
