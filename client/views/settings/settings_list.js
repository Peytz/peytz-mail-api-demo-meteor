Template.settingsList.events = {
  'click .remove-all' : function () {
    console.log("Removing all fetched data from mercury!");
    var orgButtonValue = $('a.remove-all').text();
    $('a.remove-all').text('removing...');
    Meteor.call('removeFetchedData');
    $('a.remove-all').text(orgButtonValue);
  }
};

Template.settingsList.helpers({
  settings: function() {
    return Settings.find();
  }
});