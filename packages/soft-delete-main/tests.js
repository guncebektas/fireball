import { Tinytest } from 'meteor/tinytest';
import { Mongo } from 'meteor/mongo';
import { SoftDelete, addDeleted } from 'meteor/jam:soft-delete';

const collection = new Mongo.Collection('test');

const insertDoc = async doc => collection.insertAsync(doc);
const removeDoc = async (selector, options) => collection.removeAsync(selector, options);
const softRemoveDoc = async selector => collection.softRemoveAsync(selector);
const recoverDoc = async selector => collection.recoverAsync(selector);
const reset = () => collection.removeAsync({}, { soft: false });

Meteor.methods({ insertDoc, removeDoc, softRemoveDoc, recoverDoc, reset });

Tinytest.add('addDeleted', function (test) {
  let selector = {};

  addDeleted(selector);
  test.equal(selector.deleted, false);

  selector.deleted = true;
  addDeleted(selector);
  test.equal(selector.deleted, true);

  selector._id = 'someId';
  delete selector.deleted;
  addDeleted(selector);
  test.equal(selector.deleted, false);
});

Tinytest.addAsync('softRemoveAsync', async function (test) {
  await Meteor.callAsync('reset');
  const doc = { _id: 'doc1', name: 'Test Doc' };

  await Meteor.callAsync('insertDoc', doc);
  await Meteor.callAsync('softRemoveDoc', { _id: doc._id });
  const removedDoc = await collection.findOneAsync({ _id: doc._id });

  test.equal(removedDoc, undefined);

  if (Meteor.isServer) {
    const deletedDoc = await collection.findOneAsync({ _id: doc._id, deleted: true });
    test.equal(deletedDoc.deleted, true);
    test.isTrue(deletedDoc.updatedAt instanceof Date);
  }
});

Tinytest.addAsync('recoverAsync', async function (test) {
  await Meteor.callAsync('reset');
  const doc = { _id: 'doc2', name: 'Test Doc' };

  await Meteor.callAsync('insertDoc', doc);
  await Meteor.callAsync('removeDoc', { _id: doc._id });

  await Meteor.callAsync('recoverDoc', { _id: doc._id });
  const recoveredDoc = await collection.findOneAsync({ _id: doc._id });

  if (Meteor.isServer) {
    test.equal(recoveredDoc.deleted, false);
    test.isTrue(recoveredDoc.updatedAt instanceof Date);
    test.isUndefined(recoveredDoc.deletedAt);
  }
});

Tinytest.addAsync('removeAsync with string selector', async function (test) {
  await Meteor.callAsync('reset');
  const doc = { _id: 'doc4', name: 'Test Doc' };

  await Meteor.callAsync('insertDoc', doc);
  await Meteor.callAsync('removeDoc', doc._id);

  const removedDoc = await collection.findOneAsync({ _id: doc._id });

  test.equal(removedDoc, undefined);

  if (Meteor.isServer) {
    const deletedDoc = await collection.findOneAsync({ _id: doc._id, deleted: true });
    test.equal(deletedDoc.deleted, true);
    test.isTrue(deletedDoc.updatedAt instanceof Date);
  }
});

Tinytest.addAsync('recoverAsync with string selector', async function (test) {
  await Meteor.callAsync('reset');
  const doc = { _id: 'doc5', name: 'Test Doc' };

  await Meteor.callAsync('insertDoc', doc);
  await Meteor.callAsync('removeDoc', doc._id);

  await Meteor.callAsync('recoverDoc', doc._id);

  const recoveredDoc = await collection.findOneAsync({ _id: doc._id });

  if (Meteor.isServer) {
    test.equal(recoveredDoc.deleted, false);
    test.isTrue(recoveredDoc.updatedAt instanceof Date);
    test.isUndefined(recoveredDoc.deletedAt);
  }
});

Tinytest.addAsync('removeAsync with soft: false', async function (test) {
  await Meteor.callAsync('reset');
  const doc = { _id: 'doc3', name: 'Test Doc' };

  await Meteor.callAsync('insertDoc', doc);
  await Meteor.callAsync('removeDoc', { _id: doc._id }, { soft: false });

  const removedDoc = await collection.findOneAsync({ _id: doc._id });

  test.isUndefined(removedDoc);
});

Tinytest.addAsync('findOneAsync with string selector', async function (test) {
  await Meteor.callAsync('reset');
  const doc = { _id: 'doc6', name: 'Test Doc' };

  await Meteor.callAsync('insertDoc', doc);
  await Meteor.callAsync('removeDoc', doc._id);

  const removedDoc = await collection.findOneAsync(doc._id);

  if (Meteor.isServer) {
    test.equal(removedDoc.deleted, true);
    test.isTrue(removedDoc.updatedAt instanceof Date);
  }
});


Tinytest.add('configure', function (test) {
  const newConfig = {
    deleted: 'isDeleted',
    deletedAt: 'deletedAt',
    autoFilter: false,
    overrideRemove: false,
  };
  SoftDelete.configure(newConfig);
  const config = SoftDelete.config;
  test.equal(config.deleted, 'isDeleted');
  test.equal(config.deletedAt, 'deletedAt');
  test.equal(config.autoFilter, false);
  test.equal(config.overrideRemove, false);
});
