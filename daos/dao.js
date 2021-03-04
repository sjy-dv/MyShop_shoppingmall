class Dao {}

Dao.prototype.create = async (model, body) => {
  return await model.create(body);
};

Dao.prototype.findById = async (model, id) => {
  return await model.findOne({ userid: id });
};

Dao.prototype.updateById = async (model, body, idx) => {
  try {
    return await model.update(body, { where: { idx } });
  } catch (err) {
    return err;
  }
};
Dao.prototype.destroyById = async (model, idx) => {
  try {
    return await model.destroy({ where: { idx } });
  } catch (err) {
    return err;
  }
};

module.exports = Dao;
