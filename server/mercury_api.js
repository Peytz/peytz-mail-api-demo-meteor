Meteor.methods({
  removeFetchedData: function() {
    MailingLists.remove({});
    Newsletters.remove({});
    console.log("all fetched data removed!");
  },

  fetchMailingLists: function() {
    var settings = Settings.findOne({active: true});
    var url = settings.mercury_url+"/api/v1/mailinglists.json";
    //synchronous GET
    var result = Meteor.http.get(url, {timeout: 30000, auth: settings.api_key+':'});
    if(result.statusCode==200) {
      var respJson = JSON.parse(result.content);
      console.log("response received.");
      return respJson;
    } else {
      console.log("Response issue ["+result.statusCode+"] when calling: ", url);
      var errorJson = JSON.parse(result.content);
      throw new Meteor.Error(result.statusCode, errorJson.error);
    }
  },

  fetchNewsletters: function(mailingListId) {
    var settings = Settings.findOne({active: true});
    var url = settings.mercury_url+"/api/v1/mailinglists/"+mailingListId+"/newsletters.json";
    //synchronous GET
    var result = Meteor.http.get(url, {timeout: 30000, auth: settings.api_key+':'});
    if(result.statusCode==200) {
      var respJson = JSON.parse(result.content);
      console.log("response received.");
      return respJson;
    } else {
      console.log("Response issue: ", result.statusCode);
      var errorJson = JSON.parse(result.content);
      throw new Meteor.Error(result.statusCode, errorJson.error);
    }
  },

  testNewsletter: function(mailingListId, newsletterId, email) {
    var settings = Settings.findOne({active: true});
    var url = settings.mercury_url+"/api/v1/mailinglists/"+mailingListId+"/newsletters/"+newsletterId+"/test.json?email="+settings.test_email;
    //synchronous GET
    var result = Meteor.http.get(url, {timeout: 30000, auth: settings.api_key+':'});
    if(result.statusCode==200) {
      var respJson = JSON.parse(result.content);
      console.log("response received.");
      return respJson;
    } else {
      console.log("Response issue: ", result.statusCode);
      var errorJson = JSON.parse(result.content);
      throw new Meteor.Error(result.statusCode, errorJson.error);
    }
  },

  previewNewsletter: function(mailingListId, newsletterId, email) {
    var settings = Settings.findOne({active: true});
    var url = settings.mercury_url+"/api/v1/mailinglists/"+mailingListId+"/newsletters/"+newsletterId+"/preview.json?email="+settings.test_email;
    //synchronous GET
    var result = Meteor.http.get(url, {timeout: 30000, auth: settings.api_key+':'});
    if(result.statusCode==200) {
      var respJson = JSON.parse(result.content);
      console.log("response received.");
      return respJson;
    } else {
      console.log("Response issue: ", result.statusCode);
      var errorJson = JSON.parse(result.content);
      throw new Meteor.Error(result.statusCode, errorJson.error);
    }
  },

  pushFeed: function(mailingListId, newsletterId, data) {
    var settings = Settings.findOne({active: true});
    var url = settings.mercury_url+"/api/v1/mailinglists/"+mailingListId+"/newsletters/"+newsletterId+"/push_data.json";
    //asynchronous POST
    var result = Meteor.http.post(url, {data: data, timeout: 30000, auth: settings.api_key+':'});
    if(result.statusCode==200) {
      var respJson = JSON.parse(result.content);
      console.log("response received.");
      return respJson;
    } else {
      console.log("Response issue: ", result.statusCode);
      var errorJson = JSON.parse(result.content);
      throw new Meteor.Error(result.statusCode, errorJson.error);
    }
  }
});
