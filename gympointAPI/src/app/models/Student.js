import Sequelize, { Model } from 'sequelize';

class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        age: Sequelize.NUMBER,
        weight: Sequelize.NUMBER,
        height: Sequelize.NUMBER,
      },
      { sequelize }
    );
    return this;
  }
}

export default Student;
