Template.settingForm.events({
  'submit form': function(event) {
    event.preventDefault();

    console.log("Your checkbox is ["+$(event.target).find('[name=active]').val()+"]")
    var settingProperties = {
      name: $(event.target).find('[name=name]').val(),
      active: $(event.target).find('[name=active]').prop('checked'),
      mercury_url: $(event.target).find('[name=mercury_url]').val(),
      api_key: $(event.target).find('[name=api_key]').val(),
      test_email: $(event.target).find('[name=test_email]').val()
    }

    if (Session.equals('currentSettingId', 'new')) {
      var newSettingId = Settings.insert(settingProperties);
      Session.set('currentSettingId', newSettingId);
      console.log("Created setting id ["+currentSettingId+"]");
    }
    else {
      var currentSettingId = Session.get('currentSettingId');
    }

    console.log("Saving setting id ["+currentSettingId+"]");

    //deactivate all other active setting sets if this one has been activated
    if (settingProperties.active) {
      console.log("This setting has been activated.");
      activeSettings = Settings.find({_id: {$nin: [currentSettingId]}, active: true});
      console.log("Need to deactivate "+activeSettings.count()+" other setting sets.");
      activeSettings.forEach(function (setting) {
        console.log("Deactivating setting id " + setting._id + ": " + setting.name);
        Settings.update({_id: setting._id}, {$set: {active: false}});
      });
    }

    Settings.update(currentSettingId, {$set: settingProperties}, function(error) {
      if (error) {
        // display the error to the user
        alert(error.reason);
      } else {
        Meteor.Router.to('settingsList');
      }
    });
  }
});

Template.settingForm.helpers({
  setting: function() {
    if (Session.equals('currentSettingId', 'new')) {
      var emptySettingProperties = {name: '', active: false, mercury_url: '', api_key: '', test_email: ''};
      return emptySettingProperties;
    }
    else {
      return Settings.findOne(Session.get('currentSettingId'));
    }
  }
});