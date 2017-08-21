import Ember from 'ember';

export default Ember.Component.extend({
  networkOptions: {
    height: 600,
    physics: {
      stabilization: {
        enabled: true,
        fit: true
      }
    },
    manipulation: {
      enabled: false
    },
    interaction: {
      hover: true,
      hoverConnectedEdges: true
    }
  }
});
