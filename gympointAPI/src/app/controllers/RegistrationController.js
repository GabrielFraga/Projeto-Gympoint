import * as Yup from 'yup';
import { addMonths, parseISO } from 'date-fns';
import Registration from '../models/Registration';
import Plan from '../models/Plan';
import Student from '../models/Student';
import Queue from '../../lib/Queue';
import RegistrationMail from '../jobs/RegistrationMail';

class RegistrationController {
  async index(req, res) {
    const { id } = req.query;
    if (!id) {
      const registrations = await Registration.findAll({
        include: [
          {
            model: Student,
            attributes: ['name'],
          },
          {
            model: Plan,
            attributes: ['title'],
          },
        ],
      });
      return res.json({ registrations });
    }

    const registration = await Registration.findAll({
      where: {
        id,
      },
      include: [
        {
          model: Student,
          attributes: ['name'],
        },
        {
          model: Plan,
          attributes: ['title'],
        },
      ],
    });
    return res.json({ registration });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(40).json({ error: 'validation fails' });
    }

    const { student_id, plan_id, start_date } = req.body;

    const plan = await Plan.findByPk(plan_id);

    if (!plan) {
      return res.status(400).json({ error: 'plan does not exists' });
    }

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(400).json({ error: 'student does not exists' });
    }
    const startDate = parseISO(start_date);
    const end_date = addMonths(startDate, plan.duration);
    const price = plan.total_price;

    const registration = await Registration.create({
      student_id,
      plan_id,
      start_date: startDate,
      end_date,
      price,
    });

    await Queue.add(RegistrationMail.key, {
      student,
      plan,
      price,
      startDate,
      end_date,
    });

    return res.json(registration);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      plan_id: Yup.number(),
      start_date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' });
    }

    const registration = await Registration.findByPk(req.params.id);

    if (!registration) {
      return res.status(400).json({ error: `registry does not exists` });
    }

    const { plan_id, start_date } = req.body;

    if (plan_id) {
      const plan = await Plan.findByPk(plan_id);

      if (!plan) {
        return res.status(400).json({ error: 'plan does not exists' });
      }
      const price = plan.total_price;

      await registration.update({
        plan_id,
        price,
      });
    }

    if (start_date) {
      const plan = await Plan.findByPk(registration.plan_id);
      const price = plan.total_price;
      const startDate = parseISO(start_date);
      const end_date = addMonths(startDate, plan.duration);

      await registration.update({
        start_date: startDate,
        end_date,
        price,
      });
    }
    return res.json(registration);
  }

  async delete(req, res) {
    const registration = await Registration.findByPk(req.params.id);
    if (!registration) {
      res.status(404).json({ error: 'registry not found' });
    }
    await registration.destroy();
    const registrations = await Registration.findAll({
      order: ['createdAt'],
    });
    return res.json({
      registrations,
    });
  }
}
export default new RegistrationController();
