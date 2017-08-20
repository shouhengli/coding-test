import Ember from 'ember';

export default Ember.Component.extend({
  networkOptions: {
    manipulation: {
      enabled: false
    },
    interaction: {
      hover: true,
      hoverConnectedEdges: true
    }
  }
});
