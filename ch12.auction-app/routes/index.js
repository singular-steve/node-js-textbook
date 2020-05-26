const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { Good, Auction, User } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

router.get('/', async (req, res, next) => {
  try {
    const goods = await Good.findAll({ where: { soldId: null }});
    res.render('main', {
      title: 'Auction',
      goods,
      loginError: req.flash('loginError'),
    });
  } catch(error) {
    console.error(error);
    next(error);
  }
});

router.get('/join', isNotLoggedIn, (req, res, next) => {
  res.render('join', {
    title: 'Register',
    joinError: req.flash('joinError'),
  });
});

router.get('/good', isLoggedIn, (req, res) => {
  res.render('good', { title: 'Register your goods - Auction'});
});

fs.readdir('uploads', error => {
  if (error) {
    console.error('Upload Folder is not exists. Creating upload folder!');
    fs.mkdirSync('uploads');
  }
});

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, 'uploads');
    },
    filename(req, file, callback) {
      const ext = path.extname(file.originalname);
      callback(null, path.basename(file.originalname, ext) + new Date().valueOf() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post('/good', isLoggedIn, upload.single('img'), async (req, res, next) => {
  try {
    const { name, price } = req.body;
    await Good.create({
      ownerId: req.user.id,
      name,
      img: req.file.filename,
      price,
    });
    res.redirect('/');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/good/:id', isLoggedIn, async (req, res, next) => {
  try {
    const [good, auction] = await Promise.all([
      Good.findOne({
        where: { id: req.params.id },
        include: {
          model: User,
          as: 'owner',
        },
      }),
      Auction.findAll({
        where: { goodId: req.params.id },
        include: { model: User },
        order: [['bid', 'ASC']],
      }),
    ]);
    res.render('auction', {
      title: `${good.name} - Auction`,
      good,
      auction,
      auctionError: req.flash('auctionError'),
    });
  } catch(error) {
    console.error(error);
    next(error);
  }
});

router.post('/good/:id/bid', isLoggedIn, async (req, res, next) => {
  try {
    const { bid, msg } = req.body;
    const good = await Good.findOne({
      where: { id: req.params.id },
      include: { model: Auction },
      order: [[{ model: Auction }, 'bid', 'DESC']],
    });
    if (good.price > bid) {
      return res.status(403).send('Bid more money than starting price!');
    }
    if (new Date(good.createdAt).valueOf() + (24 * 60 * 60 * 1000) < new Date()) {
      return res.status(403).send('Finished Auction');
    }
    if (good.auctions[0] && good.auctions[0].bid >= bid) {
      return res.status(403).send('Bid more than the current bid!');
    }
    const result = await Auction.create({
      bid,
      msg,
      userId: req.user.id,
      goodId: req.params.id,
    });
    req.app.get('io').to(req.params.id).emit('bid', {
      bid: result.bid,
      msg: result.msg,
      nick: req.user.nick,
    });
    return res.send('ok');
  } catch (error) {
    console.error(error);
    return next(error);
  }
})

module.exports = router;