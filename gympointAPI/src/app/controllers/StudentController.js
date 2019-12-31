import * as Yup from 'yup';
import { Op } from 'sequelize'; // biblioteca de operadores
import Student from '../models/Student';

class StudentController {
  async index(req, res) {
    const { user } = req.query;
    const { id } = req.query;

    if (!user && !id) {
      const students = await Student.findAll();
      return res.json({ students });
    }

    if (user) {
      const students = await Student.findAll({
        where: {
          name: { [Op.like]: `%${user}%` },
        },
      });
      return res.json({ students });
    }

    const student = await Student.findByPk(id);
    return res.json({ student });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      age: Yup.number().required(),
      weight: Yup.number().required(),
      height: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' });
    }

    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (studentExists) {
      return res.status(400).json({ error: 'student already exists' });
    }

    const { id, name, email, weight, height } = await Student.create(req.body);

    return res.json({
      id,
      name,
      email,
      weight,
      height,
    });
  }

  async getOne(req, res) {
    const student = await Student.findByPk(req.params.id);
    return res.json({ student });
  }

  async delete(req, res) {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      res.status(404).json({ error: 'user not found' });
    }
    await student.destroy();
    const students = await Student.findAll();
    return res.json({
      students,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string(),
      age: Yup.number(),
      weight: Yup.number(),
      height: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' });
    }

    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(401).json({ error: 'user does not exists' });
    }

    if (req.body.email && req.body.email !== student.email) {
      const emailInUse = await Student.findOne({
        where: { email: req.body.email },
      });

      if (emailInUse) {
        return res
          .status(400)
          .json({ error: 'email already in use by another user' });
      }
    }
    const { id, email, age, height, weight } = await student.update(req.body);

    return res.json({
      id,
      email,
      age,
      height,
      weight,
    });
  }
}
export default new StudentController();
