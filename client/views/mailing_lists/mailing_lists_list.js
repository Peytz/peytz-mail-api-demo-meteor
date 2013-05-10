Template.mailingListsList.events = {
  'click .refresh' : function () {
    console.log("Getting mailing lists from mercury!");
    var orgButtonValue = $('a.refresh').text();
    $('a.refresh').text('loading...');
    Meteor.call('fetchMailingLists', function(err, respJson) {
      if (err) {
        window.alert("Error: " + err.reason);
        console.log("error occured on receiving data on server. ", err );
      } else {
        console.log("respJson: ", respJson);
        console.log(respJson.mailinglists.length + ' mailing lists received.');
        //update the local database
        for (var i = 0; i < respJson.mailinglists.length; i++) {
          mailing_list = respJson.mailinglists[i];
          if (existing_mailing_list = MailingLists.findOne({id: mailing_list.id})) {
            MailingLists.update({_id: existing_mailing_list._id}, mailing_list)
          }
          else {
            MailingLists.insert(mailing_list)
          }
        }
      }
      $('a.refresh').text(orgButtonValue);
    });
  }
};

Template.mailingListsList.helpers({
  mailingLists: function() {
    return MailingLists.find();
  }
});