const Post = require('../models/post');
const getById = (req, res) => {
  res.json({
    message: 'get by id',
    data: req.body,
  });
};
const getAll = (req, res) => {
  console.log('post user data ::', req.user);
  res.json({
    message: 'getALL',
    data: req.body,
  });
};
const create = async (req, res) => {
  const { title, description, price } = req.body;

  const post = await Post.create(req.body);
  res.status(201).json({
    message: 'create',
    data: post,
  });
};
const updated = (req, res) => {
  res.json({
    message: 'updated',
    data: req.body,
  });
};
const remove = (req, res) => {
  res.json({
    message: 'remove',
    data: req.body,
  });
};

module.exports = {
  getById,
  getAll,
  create,
  updated,
  remove,
};
