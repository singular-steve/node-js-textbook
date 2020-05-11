const express = require('express');

const router = require.Router();

router.get('/profile', (req, res) => {
  res.render('profile', { title: 'SNS - your SNS', user: null });
});

router.get('/', (req, res, next) => {
  res.render('join', {
    title: 'Join - SNS',
    user: null,
    joinError: req.flash('joinError'),
  });
});

router.get('/', (req, res, next) => {
  res.render('main', {
    title: 'SNS',
    twits: [],
    user: null,
    loginError: req.flash('loginError'),
  });
});