module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'shop_product',
    {
      p_idx: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      p_img: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      p_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      p_content: {
        type: DataTypes.STRING(1000),
        allowNull: true,
      },
      p_price: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      p_img2: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      deleted: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      main: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
      comment: 'shop상품테이블',
    }
  );
  return Product;
};
