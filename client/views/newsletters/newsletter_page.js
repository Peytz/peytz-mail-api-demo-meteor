Template.newsletterPage.events({
  'submit form': function(event) {
    event.preventDefault();

    var data = {
      newsletter: {
        feeds: [
          {
            name: 'content',
            data: {
              html: $(event.target).find('[name=html]').val(),
              text: $(event.target).find('[name=text]').val(),
            }
          }
        ]
      }
    }

    console.log("Pushing feed to newsletter on mercury!");
    var orgButtonValue = $('#pushButton').val();
    $('#pushButton').attr('disabled','true').val('pushing...');
    Meteor.call('pushFeed', Session.get('currentMailingListId'), Session.get('currentNewsletterId'), data, function(err, respJson) {
      if (err) {
        window.alert("Error: " + err.reason);
        console.log("error occured on receiving data on server. ", err );
      } else {
        console.log("respJson: ", respJson);
        console.log(respJson.message + ' [' + respJson.status + ']');
      }
      $('#pushButton').removeAttr('disabled').val(orgButtonValue);
    });
  },

  'click #testButton': function(event) {
    console.log("Testing newsletter from mercury!");
    var orgButtonValue = $('#testButton').val();
    $('#testButton').attr('disabled','true').val('testing...');
    Meteor.call('testNewsletter', Session.get('currentMailingListId'), Session.get('currentNewsletterId'), function(err, respJson) {
      if (err) {
        window.alert("Error: " + err.reason);
        console.log("error occured on receiving data on server. ", err );
      } else {
        console.log("respJson: ", respJson);
        console.log(respJson.message + ' [' + respJson.status + ']');
      }
      $('#testButton').removeAttr('disabled').val(orgButtonValue);
    });
  },

  'click #previewButton': function(event) {
    console.log("Previewing newsletter from mercury!");
    var orgButtonValue = $('#previewButton').val();
    $('#previewButton').attr('disabled','true').val('previewing...');
    Meteor.call('previewNewsletter', Session.get('currentMailingListId'), Session.get('currentNewsletterId'), function(err, respJson) {
      if (err) {
        window.alert("Error: " + err.reason);
        console.log("error occured on receiving data on server. ", err );
      } else {
        console.log("respJson: ", respJson);
        console.log(respJson.message + ' [' + respJson.status + ']');
        console.log('Preview [text]: ' + respJson.preview.text);
      }
      $('#previewButton').removeAttr('disabled').val(orgButtonValue);
    });
  }
});

Template.newsletterPage.helpers({
  currentNewsletter: function() {
    return Newsletters.findOne({id: Session.get('currentNewsletterId')});
  }
});