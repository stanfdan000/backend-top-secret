const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const { Secret } = require('../models/Secret');

module.exports = Router()
  .get('/', authenticate, async (req, res, next) => {
    try {
      const allSecrets = await Secret.getAll();
      const secrets = allSecrets.map((secrets) => 
        ({ title: secrets.title,
          description: secrets.description,
          created_at: secrets.created_at }));
      res.json(secrets);
    } catch(error) {
      next(error);
    } 
  })

  .post('/', authenticate, async (req, res, next) => {
    try {
      const secrets =  await Secret.insert(req.body);
      res.json(secrets);
    } catch(error) {
      next(error);
    }
  });
