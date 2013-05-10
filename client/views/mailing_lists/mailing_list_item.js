Template.mailingListItem.helpers({
  url: function() {
    return "https://inlead.peytzmail.com/admin/mailinglists/"+this.id;
  },
  domain: function() {
    var a = document.createElement('a');
    a.href = "https://inlead.peytzmail.com/admin/mailinglists/"+this.id;
    return a.hostname;
  }
});