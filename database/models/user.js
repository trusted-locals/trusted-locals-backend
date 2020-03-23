'use strict';
var bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    token: DataTypes.STRING,
    email: DataTypes.STRING,
    country: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User.beforeSave((user, options) => {
    if (user.changed('password')) {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    }
  });
  User.prototype.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
  };
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Post, {
      foreignKey: 'userId',
      as: 'posts',
      onDelete: 'CASCADE',
    });

    User.hasMany(models.Comment, {
      foreignKey: 'userId',
      as: 'comments',
      onDelete: 'CASCADE',
    });
  };
  return User;
};