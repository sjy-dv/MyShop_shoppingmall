module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define(
    'shop_payment',
    {
      idx: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      p_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      p_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      pg_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      buyer: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
      comment: 'shop 구매내역',
    }
  );
  return Payment;
};
