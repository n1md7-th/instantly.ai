import knex from 'knex';

const db = knex({
  client: 'sqlite3', // or 'better-sqlite3'
  connection: {
    filename: './db.sqlite',
  },
  migrations: {
    tableName: 'migrations',
    directory: './src/db/migrations',
    loadExtensions: ['.cjs'],
  },
});

db.migrate.latest().then(() => {
  console.info('Migrated');
}).then(() => {
  db('emails').select().then((emails) => {
    if(emails.length === 0){
      return Promise.all(getSeeds().map((seed) => {
        return db('emails').insert(seed);
      })).then(() => {
        console.info('Seeded emails table');
      });
    }
  })
})

export class DB {
  static async addEmail(email) {
    email.createdAt = new Date().toLocaleDateString();
    return db('emails').insert(email);
  }

  static async getEmails() {
    return db('emails').select().orderBy('createdAt', 'desc');
  }
}


function getSeeds(){
  return [
    {
      to: 'john.doe@mail.com',
      cc: 'john.doe+1@mail.com',
      bcc: 'john.doe+2@mail.com',
      subject: 'Financial updates',
      body: 'Hi John, here are the financial updates for this quarter. Let me know if you have any questions.',
      createdAt: '12.12.2021'
    },
    {
      to: 'jane.smith@mail.com',
      cc: 'jane.smith+1@mail.com',
      bcc: 'jane.smith+2@mail.com',
      subject: 'Meeting Recap',
      body: 'Hi Jane, thanks for your time today. Attached is the meeting recap. Please review and send your feedback.',
      createdAt: '31.12.2022'
    },
    {
      to: 'michael.brown@mail.com',
      cc: 'michael.brown+1@mail.com',
      bcc: 'michael.brown+2@mail.com',
      subject: 'Project Kickoff',
      body: 'Hi Michael, we’re excited to kick off the project. Here are the initial steps we’ll take. Let’s aim to meet again next week.',
      createdAt: '01.01.2023'
    },
    {
      to: 'laura.wilson@mail.com',
      cc: 'laura.wilson+1@mail.com',
      bcc: 'laura.wilson+2@mail.com',
      subject: 'Contract Renewal',
      body: 'Hi Laura, your contract is up for renewal this month. Please review the attached document and let us know if you have any upcreatedAts or requests.',
      createdAt: '02.01.2023'
    },
    {
      to: 'peter.parker@mail.com',
      cc: 'peter.parker+1@mail.com',
      bcc: 'peter.parker+2@mail.com',
      subject: 'New Marketing Strategy',
      body: 'Hi Peter, I’ve attached the new marketing strategy for your review. Let’s schedule a call to discuss it in detail.',
      createdAt: '03.01.2023'
    },
    {
      to: 'susan.connor@mail.com',
      cc: 'susan.connor+1@mail.com',
      bcc: 'susan.connor+2@mail.com',
      subject: 'Product Launch Details',
      body: 'Hi Susan, we’re preparing for the product launch next month. Please find the details attached and let us know if you’d like to suggest any changes.',
      createdAt: '04.01.2023'
    },
    {
      to: 'chris.evans@mail.com',
      cc: 'chris.evans+1@mail.com',
      bcc: 'chris.evans+2@mail.com',
      subject: 'Team Meeting Follow-Up',
      body: 'Hi Chris, thanks for attending the team meeting. Here’s the follow-up information and action points we discussed. Let me know if you need further details.',
      createdAt: '05.01.2023'
    },
    {
      to: 'emma.watson@mail.com',
      cc: 'emma.watson+1@mail.com',
      bcc: 'emma.watson+2@mail.com',
      subject: 'Client Feedback Required',
      body: 'Hi Emma, we need your feedback on the recent client presentation. Please provide your thoughts by the end of the week.',
      createdAt: '06.01.2023'
    },
    {
      to: 'bruce.banner@mail.com',
      cc: 'bruce.banner+1@mail.com',
      bcc: 'bruce.banner+2@mail.com',
      subject: 'Budget Approval',
      body: 'Hi Bruce, the updated budget is attached. Please review and confirm your approval by the end of the day.',
      createdAt: '07.01.2023'
    },
    {
      to: 'natasha.romanoff@mail.com',
      cc: 'natasha.romanoff+1@mail.com',
      bcc: 'natasha.romanoff+2@mail.com',
      subject: 'Event Coordination',
      body: 'Hi Natasha, we’re finalizing the details for the upcoming event. Please review the timeline and tasks assigned to you.',
      createdAt: '08.01.2023'
    },
  ]
}
