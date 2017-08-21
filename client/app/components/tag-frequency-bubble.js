/* global crossfilter, d3, dc */

import Ember from 'ember';

const {on, observer} = Ember;

export default Ember.Component.extend({
  chart: null,
  chartOptions: {
    height: 600,
    elasticRadius: true,
    r: d3.scale.linear(),
    x: d3.scale.ordinal(),
    y: d3.scale.ordinal()
  },
  drawChart: on(
    'init',
    observer('users', function() {
      let users = this.get('users'),
        chart = this.get('chart');

      if (!users) {
        if (!chart) {
          return;
        }
        chart.resetSvg();
        this.set('chart', null);
        return;
      }

      let redraw = !!chart,
        tags = [].concat.apply([], users.map(u => u.get('tags'))),
        ndx = crossfilter(tags),
        tagDimension = ndx.dimension(d => d),
        tagGroup = tagDimension.group(),
        freq = tagGroup.all(),
        freqDimension = crossfilter(freq).dimension(d => d.value),
        freqGroup = freqDimension.group();

      chart = chart || dc.bubbleCloud('#bubble-chart');

      chart.options(
        Object.assign(
          {
            radiusValueAccessor: d => d.value,
            dimension: freqDimension,
            group: freqGroup
          },
          this.get('chartOptions')
        )
      );

      redraw ? chart.redraw() : chart.render();
      dc.tooltipMixin(chart);
      this.set('chart', chart);
    })
  )
});
