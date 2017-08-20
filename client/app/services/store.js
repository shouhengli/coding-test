/*global Map, Set */
import Ember from 'ember';
import User from 'client/models/user';
import Relation from 'client/models/relation';

const {store} = window,
  hashRelation = relation => relation.toString(),
  addUser = function(user) {
    let id = user.id;
    this.cache.get('users').set(id, User.create(user));
  },
  addRelation = function(relation) {
    const key = hashRelation(relation);
    this.cache.get('relations').set(
      key,
      Relation.create({
        from: relation[0],
        to: relation[1]
      })
    );
  },
  hasRelation = function(relation) {
    return this.cache.get('relations').has(hashRelation(relation));
  },
  hasUser = function(id) {
    return this.cache.get('users').has(id);
  };

export default Ember.Service.extend({
  init() {
    this._super(...arguments);
    this.cache = Ember.Object.create({
      users: new Map(),
      relations: new Map()
    });
  },
  getUsers() {
    return Array.from(this.get('cache.users').values());
  },
  getRelations() {
    return Array.from(this.get('cache.relations').values());
  },
  async fetchSamples() {
    let relations = await store.sample();

    relations
      .filter(rel => !hasRelation.call(this, rel))
      .forEach(rel => addRelation.call(this, rel));

    let ids = [...new Set([].concat.apply([], relations))].filter(
        id => !hasUser.call(this, id)
      ),
      tags = await store.tags(ids);
    tags.forEach((t, i) => {
      addUser.call(this, {id: ids[i], tags: t});
    });
  },
  clear() {
    this.get('cache.users').clear();
    this.get('cache.relations').clear();
  }
});
