Template.navBar.helpers({
  currentPageMailingLists: function() {
    return Session.equals('currentPage', 'mailing_lists');
  },
  currentPageSettings: function() {
    return Session.equals('currentPage', 'settings');
  }
});