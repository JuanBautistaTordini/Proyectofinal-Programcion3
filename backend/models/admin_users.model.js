module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define('Reservation', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    package_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    reservation_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    date_created: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'reservations',
    timestamps: false
  });

  return Reservation;
};
