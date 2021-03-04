module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define(
    'shop_favorites',
    {
      p_idx: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
      comment: 'shop찜테이블',
    }
  );
  return Favorite;
};
