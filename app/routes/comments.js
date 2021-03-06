"use strict";


const express = require('express');
const router = express.Router();
const knex = require('../../db/knex');

router.get('/:post_id/comments', (req, res, next) => {
  knex('comments')
    .where({
      post_id: req.params.post_id
    })
    .then(comments => res.json(comments))
    .catch(err => next(err));
});

router.post('/:post_id/comments', (req, res, next) => {
  knex('comments')
    .insert({
      content: req.body.content,
      post_id: req.body.post_id
    })
    .where({
      post_id: req.body.post_id
    })
    .returning('*')
    .then(comments => res.json(comments[0]))
    .catch(err => next(err));
});

router.patch('/:post_id/comments/:id', (req, res, next) => {
  knex('comments')
    .update({
      content: req.body.content
    })
    .where({
      post_id: req.params.post_id,
      id: req.params.id
    })
    .returning('*')
    .then(comments => res.json(comments[0]))
    .catch(err => next(err));
});

router.delete('/:post_id/comments/:id', (req, res, next) => {
  knex('comments')
    .del()
    .where({
      post_id: req.params.post_id,
      id: req.params.id
    })
    .then(() => res.end())
    .catch(err => next(err));
});

module.exports = router;
