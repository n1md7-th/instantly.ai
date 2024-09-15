import {DB}  from "../db/index.js";

export default async function routes(fastify, options) {
  fastify.get('/ping', async (request, reply) => {
    return 'pong\n';
  });
  fastify.post('/send', async (request, reply) => {
    const email = request.body;

    if(!email.to){
      reply.code(400);

      return {
        message: 'Missing required field "to"'
      }
    }

    await DB.addEmail(email);

    return {
      to: email.to,
      cc: email.cc,
      bcc: email.bcc,
      subject: email.subject,
      body: email.body,
      createdAt: new Date().toLocaleDateString(),
      updatedAt: new Date().toLocaleDateString()
    };
  });
  fastify.get('/sent', async (request, reply) => {
    const search = request.query.search;

    const emails = await DB.getEmails();

    return emails.filter(email => {
      return email.to?.includes(search) ||
        email.subject?.includes(search) ||
        email.body?.includes(search) ||
        email.cc?.includes(search) ||
        email.bcc?.includes(search);
    }).map(email => {
      return {
        to: email.to,
        cc: email.cc,
        bcc: email.bcc,
        subject: email.subject,
        body: email.body,
        createdAt: new Date(email.createdAt).toLocaleDateString(),
        updatedAt: new Date(email.updatedAt).toLocaleDateString()
      };
    })
  });
}
