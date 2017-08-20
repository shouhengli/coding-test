import Ember from 'ember';

const {inject} = Ember;

export default Ember.Component.extend({
  store: inject.service('store'),
  actions: {
    drawSamples() {
      this.get('store').fetchSamples();
    },
    clearSamples() {
      this.get('store').clear();
    }
  }
});
