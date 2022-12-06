let database = require("../database").userModel;

let remindersController = {
  list: (req, res) => {
    console.log(req.body)
    const user = database.findById(req.user.id)
    res.render("reminder/index", { reminders: user.reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    const user = database.findById(req.user.id)
    let searchResult = user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: user.reminders });
    }
  },

  create: (req, res) => {
    const user = database.findById(req.user.id)

    let reminder = {
      id: user.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    user.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    const user = database.findById(req.user.id)

    let reminderToFind = req.params.id;
    let searchResult = user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    const user = database.findById(req.user.id)

    // implement this code

    for (const reminder of user.reminders) {
      if (reminder.id == parseInt(req.params.id)) {
        // changing the completed to true or false
        if (reminder.completed == true) {
          reminder.completed = false;
        } else {
          reminder.completed = true
        }

        // setting the title to the users input title
        reminder.title = req.body.title

        // setting the description to the users input description
        reminder.description = req.body.description
      } else {
        console.log('not found')
      }
    }

    res.redirect("/reminders")

  },

  delete: (req, res) => {
    const user = database.findById(req.user.id)

    // Implement this code

    // checking which index of the array is to be deleted
    for (const [index, reminder] of user.reminders.entries()) {
      if (parseInt(req.params.id) == reminder.id) {

        // deleting the reminder
        user.reminders.splice(index, 1);
      } else {
        console.log('the reminder to delete was not found');
      }

    }

    res.redirect("/reminders")
  },
};

module.exports = remindersController;
