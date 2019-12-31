import { subDays, isAfter } from 'date-fns';
import Checkin from '../models/Checkin';
import Student from '../models/Student';

class CheckinController {
  async index(req, res) {
    const studentExists = await Student.findByPk(req.params.id);

    if (!studentExists) {
      res.status(404).json({ error: 'Student not found' });
    }

    const checkins = await Checkin.findAll({
      where: { student_id: req.params.id },
      order: [['createdAt', 'DESC']],
    });

    return res.json(checkins);
  }

  async store(req, res) {
    const checkins = await Checkin.findAll({
      where: { student_id: req.params.id },
      order: [['createdAt', 'DESC']],
      limit: 5,
    });

    let numberOfCheckins = 0;

    checkins.forEach(({ createdAt }) => {
      if (isAfter(createdAt, subDays(new Date(), 7))) {
        numberOfCheckins += 1;
      }
    });

    if (numberOfCheckins >= 5) {
      return res
        .status(401)
        .json({ error: 'number of checkins has exceeded the limit per week' });
    }

    const checkin = await Checkin.create({ student_id: req.params.id });

    return res.json({ checkin });
  }
}

export default new CheckinController();
