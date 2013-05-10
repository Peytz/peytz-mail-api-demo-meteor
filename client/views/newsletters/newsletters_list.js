Template.newslettersList.events = {
  'click .refresh' : function () {
    console.log("Getting newsletters from mercury!");
    var orgButtonValue = $('a.refresh').text();
    $('a.refresh').text('loading...');
    Meteor.call('fetchNewsletters', Session.get('currentMailingListId'), function(err, respJson) {
      if (err) {
        window.alert("Error: " + err.reason);
        console.log("error occured on receiving data on server. ", err );
      } else {
        console.log("respJson: ", respJson);
        console.log(respJson.newsletters.length + ' newsletters received.');
        //update the local database
        for (var i = 0; i < respJson.newsletters.length; i++) {
          newsletter = respJson.newsletters[i];
          newsletter.mailinglist_id = Session.get('currentMailingListId');
          if (existing_newsletter = Newsletters.findOne({id: newsletter.id})) {
            Newsletters.update({_id: existing_newsletter._id}, newsletter)
          }
          else {
            Newsletters.insert(newsletter)
          }
        }
      }
      $('a.refresh').text(orgButtonValue);
    });
  }
};

Template.newslettersList.helpers({
  newsletters: function() {
    return Newsletters.find({mailinglist_id: Session.get('currentMailingListId')});
  }
});