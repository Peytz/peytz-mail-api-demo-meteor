Template.settingPage.helpers({
  currentSetting: function() {
    return Settings.findOne({id: Session.get('currentSettingId')});
  }
});