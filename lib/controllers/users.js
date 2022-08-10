const authenticate = require('../middleware/authenticate');
const UserService = require('../services/UserService');
const { Router } = require('express');

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const user = await UserService.create(req.body);
      res.json(user);
    } catch(e) {
      next(e);
    }
  })
  .post('/session', async (req, res, next) => {
    
    try {
      const token = await UserService.signIn(req.body);
    
      res
        .cookie(process.env.COOKIE_NAME, token, {
          httpOnly: true,
          maxAge: ONE_DAY_IN_MS,
        })
        .json({ message: 'You have signed in!' });
    } catch(e) {
      next(e);
    }
  })
  .delete('/session', authenticate, (req, res) => {
    res
      .clearCookie(process.env.COOKIE_NAME)
      .json({ success: true, message: 'signed out successfully' });
  });
