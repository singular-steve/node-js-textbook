var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:id', (req, res) => {
  console.log(req.params, req.query); // /users/1234?limit=5&skip=10 => { id: '1234' } { limit: '5', skip: '10' }
})

// connect-flash 테스트 코드
router.get('/flash', (req, res) => {
  req.session.message = 'session message';
  req.flash('message', 'flash message');
  res.redirect('/users/flash/result');
});

router.get('/flash/result', (req, res) => {
  res.send(`${req.session.message}: ${req.flash('message')}`);
});

module.exports = router;
