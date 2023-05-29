const bcrypt = require('bcryptjs');

exports.seed = (knex, Promise) => {
  return knex('users').del()
  .then(() => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync('johnson', salt);
    return 
      knex('users').insert({
        username: 'jeremy',
        password: '1234456',
        admin: false
      })
  
  })
  .then(() => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync('88776655443322', salt);
    return 
      knex('users').insert({
        username: 'hank',
        password: '123456',
        admin: true
      })
   
  });
};
