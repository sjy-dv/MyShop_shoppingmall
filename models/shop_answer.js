module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define(
    'shop_answer',
    {
      idx: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      answered: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
      comment: 'shop답변테이블',
    }
  );
  return Answer;
};
