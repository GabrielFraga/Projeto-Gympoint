import Mail from '../../lib/Mail';

class AnswerHelpMail {
  get key() {
    return 'AnswerHelpMail';
  }

  async handle(data) {
    const { student, helpOrder } = data;
    // console.log(`NOME DO ESTUDANTE${student.name}`);
    await Mail.sendMail({
      to: `${student.name} <${student.mail}>`,
      subject: 'Resposta ao seu pedido de auxílio',
      template: 'answer',
      context: {
        student: student.name,
        question: helpOrder.question,
        answer: helpOrder.answer,
      },
    });
  }
}
export default new AnswerHelpMail();
