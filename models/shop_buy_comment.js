module.exports = (sequelize, DataTypes) => {
  const Buy_Comment = sequelize.define(
    'shop_buy_comment',
    {
      idx: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      writer: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      p_idx: {
        type: DataTypes.INTEGER,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
      comment: 'shop후기테이블',
    }
  );
  return Buy_Comment;
};
