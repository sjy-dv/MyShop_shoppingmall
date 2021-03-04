module.exports = (sequelize, DataTypes) => {
  const Basket = sequelize.define(
    'shop_basket',
    {
      p_idx: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
      comment: 'shop장바구니테이블',
    }
  );
  return Basket;
};
