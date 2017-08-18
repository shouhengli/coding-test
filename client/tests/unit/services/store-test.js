/*global Map, Set */
import {expect} from 'chai';
import {describe, it} from 'mocha';
import {setupTest} from 'ember-mocha';
import User from 'client/models/user';
import sinon from 'sinon';

describe('Unit | Service | store', function() {
  setupTest('service:store', {});

  let store;

  it('exists', function() {
    store = this.subject();
    expect(store).to.be.ok;
  });

  describe('#getUsers', function() {
    it('returns a list of uesrs stored in cache', function() {
      store = this.subject();
      let aUser = User.create({id: 1, tags: ['#abc']}),
        users = new Map([[1, aUser]]);
      store.set('cache', {users});
      expect(store.getUsers()).to.deep.equal([aUser]);
    });
  });

  describe('#getRelations', function() {
    it('returns a list of relations stored in cache', function() {
      store = this.subject();
      let relations = new Map([['1,2', [1, 2]]]);
      store.set('cache', {relations});
      expect(store.getRelations()).to.deep.equal([[1, 2]]);
    });
  });

  describe('#fetchSamples', function() {
    it('adds users to cache', async function() {
      store = this.subject();
      expect(store.getUsers()).has.lengthOf(0);
      await store.fetchSamples();
      let ids = new Set(
          [].concat.apply(
            [],
            store.getRelations().map(rel => [rel.get('from'), rel.get('to')])
          )
        ),
        users = store.getUsers();
      expect(users).to.have.lengthOf(ids.size);
      expect(users[0]).to.be.an.instanceof(User);
    });

    it('adds relations to cache', async function() {
      store = this.subject();
      sinon.spy(window.store, 'sample');
      expect(store.getRelations()).has.lengthOf(0);
      await store.fetchSamples();

      let fetchedRelations = await window.store.sample.firstCall.returnValue,
        savedRelations = store.getRelations();
      expect(savedRelations).to.have.lengthOf(fetchedRelations.length);
      expect(savedRelations[0].get('from')).to.equal(fetchedRelations[0][0]);
      expect(savedRelations[0].get('to')).to.equal(fetchedRelations[0][1]);
      window.store.sample.restore();
    });

    it('do not add duplicate users to cache', async function() {
      store = this.subject();
      sinon.stub(window.store, 'sample');
      sinon.stub(window.store, 'tags');
      expect(store.getUsers()).has.lengthOf(0);

      window.store.sample.onFirstCall().returns([[1, 2], [3, 4]]);
      window.store.sample.onSecondCall().returns([[3, 4], [4, 5]]);
      window.store.tags.onFirstCall().returns([['a'], ['b'], ['c'], ['d']]);
      window.store.tags.onSecondCall().returns([['e']]);

      await store.fetchSamples();
      let users = store.getUsers();
      expect(users).to.have.lengthOf(4);
      expect(users.map(u => u.get('id'))).to.have.members([1, 2, 3, 4]);
      await store.fetchSamples();
      users = store.getUsers();
      expect(users).to.have.lengthOf(5);
      expect(users.map(u => u.get('id'))).to.have.members([1, 2, 3, 4, 5]);

      window.store.sample.restore();
      window.store.tags.restore();
    });

    it('do not add duplicate relations to cache', async function() {
      store = this.subject();
      sinon.stub(window.store, 'sample');
      sinon.stub(window.store, 'tags');
      expect(store.getUsers()).has.lengthOf(0);

      window.store.sample.onFirstCall().returns([[1, 2], [3, 4]]);
      window.store.sample.onSecondCall().returns([[3, 4], [4, 5]]);
      window.store.tags.onFirstCall().returns([['a'], ['b'], ['c'], ['d']]);
      window.store.tags.onSecondCall().returns([['e']]);

      await store.fetchSamples();
      let relations = store.getRelations();
      expect(relations).to.have.lengthOf(2);
      await store.fetchSamples();
      relations = store.getRelations();
      expect(relations).to.have.lengthOf(3);

      window.store.sample.restore();
      window.store.tags.restore();
    });
  });
});
