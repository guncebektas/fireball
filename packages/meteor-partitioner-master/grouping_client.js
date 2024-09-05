function userFindHook(userId, selector /*, options */) {
	// Do the usual find for no user or single selector
	if (!userId || Helpers.isDirectUserSelector(selector)) return true;

	// No hooking needed for regular users, taken care of on server
	if (!Partitioner._isAdmin(Meteor.userId())) return true;

	// Don't have admin see itself for global finds
	if (selector == null) {
		selector = {admin: {$exists: false}};
	} else {
		selector.admin = {$exists: false};
	}

	return true;
};

Meteor.users._partitionerBefore.find(userFindHook);
Meteor.users._partitionerBefore.findOneAsync(userFindHook);

async function insertHook(userId, doc) {
	if (!userId) throw new Meteor.Error(403, ErrMsg.userIdErr);
	const groupId = await Partitioner.group();
	if (!groupId) throw new Meteor.Error(403, ErrMsg.groupErr);
	doc._groupId = groupId;
	return true;
};

Partitioner = {
	async group() {
		const userId = Meteor.userId();
		return userId && (await Meteor.users._partitionerDirect.findOneAsync(userId, {fields: {group: 1}}) || {}).group;
	},

	// This can be replaced - currently not documented
	// Don't retrieve full user object - fix bug #32
	async _isAdmin(_id) {
		return await Meteor.users._partitionerDirect.find({_id, admin: true}, {fields: {_id: 1}}).countAsync() > 0;
	},

	// Add in groupId for client so as not to cause unexpected sync changes
	async partitionCollection(collection) {
		// No find hooks needed if server side filtering works properly
		return await collection._partitionerBefore.insertAsync(insertHook);
	},
};
