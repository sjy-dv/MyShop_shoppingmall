module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'shop_comment',
    {
      idx: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      writer: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      b_idx: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
      comment: 'shop댓글테이블',
    }
  );
  return Comment;
};
