module.exports = (sequelize, DataTypes) => {
  const Board = sequelize.define(
    'shop_board',
    {
      idx: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
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
    },
    {
      freezeTableName: true,
      timestamps: true,
      comment: 'shop게시판테이블',
    }
  );
  return Board;
};
