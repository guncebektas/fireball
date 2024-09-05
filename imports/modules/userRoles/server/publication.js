Meteor.publish(null, function() {
  if(!this.userId) {
    this.ready();
  }

  return Meteor.roleAssignment.find({'user._id': this.userId});
});
