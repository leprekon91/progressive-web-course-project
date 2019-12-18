import { Projects } from '../imports/api/projects/projects';

Meteor.startup(() => {
  if (!Meteor.users.findOne({ username: 'admin' })) {
    Accounts.createUser({ username: 'admin', email: 'admin@todoer.co.il', password: 'p' });
  }
  if (Projects.find().count() === 0) {
    Projects.insert({
      title: 'Project Title 1',
      description:
        "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.",
      createdAt: new Date(),
      dueDate: new Date(new Date() + 1000 * 60 * 60 * 24),
      managerId: Meteor.users.findOne({ username: 'admin' })._id,
      sharedWithIds: [],
      todos: [],
    });
    Projects.insert({
      title: 'Project Title 2',
      description:
        "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.",
      createdAt: new Date(),
      dueDate: new Date(new Date() + 1000 * 60 * 60 * 24),
      managerId: Meteor.users.findOne({ username: 'admin' })._id,
      sharedWithIds: [],
      todos: [],
    });
  }
});
