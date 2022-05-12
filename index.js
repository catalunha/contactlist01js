const Parse = require('parse/node');
Parse.serverURL = 'https://contactlist01js.b4a.io';
Parse.initialize('6YFc3s30WZq7Jzo0rKG89BTO0o0BvMw1ThJrwwW4','VhFxMwCNWjx0wctNxXYQoG8BsP3iSJg8TU6Addc0');

const main = async ()=>{
  const query = new Parse.Query('Contact');
  // query.notEqualTo('isMan',true);
  // query.equalTo('birthDate',null);
  query.exists('birthDate');
  const subscribe = await query.subscribe();

  let contacts = {};
  const printContacts = ()=>{
    console.log();
    Object.keys(contacts).forEach(id=>{
      console.log(contacts[id].toJSON());
    });
    console.log();
  };

  subscribe.on('open', async ()=>{
    console.log('open...');
    contacts = (await query.find()).reduce((contacts,contact)=>({
      ...contacts,
      [contact.id]: contact
    }),contacts);
    printContacts();
  });
  subscribe.on('create',(data)=>{
    console.log(`Data: ${data.id} | create...`);
    contacts[data.id]=data;
    printContacts();
  });
  subscribe.on('update',(data)=>{
    console.log(`Data: ${data.id} | update...`);
    contacts[data.id]=data;
    printContacts();
  });
  subscribe.on('enter',(data)=>{
    console.log(`Data: ${data.id} | enter...`);
    contacts[data.id]=data;
    printContacts();
  });
  subscribe.on('leave',(data)=>{
    console.log(`Data: ${data.id} | leave...`);
    delete contacts[data.id];
    printContacts();
  });
  subscribe.on('delete',(data)=>{
    console.log(`Data: ${data.id} | delete...`);
    delete contacts[data.id];
    printContacts();
  });
  subscribe.on('closed',()=>{
    console.log('closed...');
  });  
};
main();