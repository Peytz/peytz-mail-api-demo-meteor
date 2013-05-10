Template.mailingListPage.helpers({
  currentMailingList: function() {
    return MailingLists.findOne({id: Session.get('currentMailingListId')});
  }
});