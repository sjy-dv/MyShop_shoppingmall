module.exports = (sequelize, DataTypes) => {
  const Ask = sequelize.define(
    'shop_ask',
    {
      idx: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      answered: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
      comment: 'shop질문테이블',
    }
  );
  return Ask;
};
