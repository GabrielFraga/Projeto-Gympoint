import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class RegistrationMail {
  get key() {
    return 'RegistrationMail';
  }

  async handle(data) {
    const { student, plan, price, startDate, end_date } = data;
    await Mail.sendMail({
      to: `${student.name} <${student.email}> `,
      subject: 'Matricula realizada',
      template: 'registration',
      context: {
        student: student.name,
        plan: plan.title,
        price,
        start_date: format(startDate, "dd 'de' MMMM 'de' yyyy", {
          locale: pt,
        }),
        end_date: format(end_date, "dd 'de' MMMM 'de' yyyy", {
          locale: pt,
        }),
      },
    });
  }
}
export default new RegistrationMail();
