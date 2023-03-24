const Permission = require('../models/permission');

const create = async (req, res) => {
  // const { type } = req.body;
  try {
    console.log('ssss');
    console.log(req.body);
    const permission = await Permission.create(req.body);
    res.status(201).json({
      message: 'create',
      data: permission,
    });
  } catch (error) {
    console.log(error);
  }
};

const update = async (req, res) => {
  // const { type } = req.body;
  try {
    const permission = await Permission.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      message: 'update',
      data: permission,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  create,
  update,
};
