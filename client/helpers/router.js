Meteor.Router.add({
  '/': {
    to: 'mailingListsList',
    and: function(id) { Session.set('currentPage', 'mailing_lists'); }
  },
  '/mailing_lists/:id': {
    to: 'mailingListPage', 
    and: function(id) { Session.set('currentMailingListId', id); Session.set('currentPage', 'mailing_lists'); }
  },
  '/newsletters/:id': {
    to: 'newsletterPage', 
    and: function(id) { Session.set('currentNewsletterId', id); Session.set('currentPage', 'mailing_lists'); }
  },
  '/settings': {
    to: 'settingsList',
    and: function(id) { Session.set('currentPage', 'settings'); }
  },
  '/settings/:_id/edit': {
    to: 'settingForm', 
    and: function(id) { Session.set('currentSettingId', id); Session.set('currentPage', 'settings'); }
  },
  '/settings/:id': {
    to: 'settingPage', 
    and: function(id) { Session.set('currentSettingId', id); Session.set('currentPage', 'settings'); }
  }
});