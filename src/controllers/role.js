const Role = require('../models/role');

const create = async (req, res) => {
  // const { type } = req.body;
  const role = await Role.create(req.body);
  res.status(201).json({
    message: 'create',
    data: role,
  });
};

module.exports = {
  create,
};
