import Ember from 'ember';

const {inject} = Ember;

export default Ember.Component.extend({
  store: inject.service('store'),
  relations: null,
  init() {
    this._super(...arguments);
    this.actions.drawSamples.call(this);
  },
  actions: {
    async drawSamples() {
      await this.get('store').fetchSamples();
      this.set('relations', this.get('store').getRelations());
      this.set('users', this.get('store').getUsers());
    },
    clearSamples() {
      this.get('store').clear();
      this.set('relations', null);
      this.set('users', null);
    }
  }
});
