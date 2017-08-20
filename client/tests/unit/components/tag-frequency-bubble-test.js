/* global dc */

import {describe, it} from 'mocha';
import {expect} from 'chai';
import {setupComponentTest} from 'ember-mocha';
import sinon from 'sinon';
import User from 'client/models/user';

describe('Unit | Component | tag frequency bubble', function() {
  setupComponentTest('tag-frequency-bubble', {
    unit: true
  });

  describe('#drawChart', function() {
    describe('when users do not exist', function() {
      describe('when a chart exists', function() {
        it('removes chart', function() {
          let component = this.subject({users: null}),
            stubResetSvg = sinon.stub();
          component.chart = {resetSvg: stubResetSvg};
          component.get('drawChart').call(component);
          expect(stubResetSvg).to.have.been.called;
        });
        it('reset chart to null', function() {
          let component = this.subject({users: null});
          component.chart = {resetSvg: sinon.stub()};
          component.get('drawChart').call(component);
          expect(component.get('chart')).to.be.null;
        });
      });
      describe('when a chart does not exist', function() {
        it('no chart is created', function() {
          let component = this.subject({users: null});
          component.get('drawChart').call(component);
          expect(component.get('chart')).to.be.null;
        });
      });
    });
    describe('when users exist', function() {
      const users = [
        User.create({id: 1, tags: ['a', 'b']}),
        User.create({id: 2, tags: ['a', 'c']}),
        User.create({id: 3, tags: ['a', 'b']})
      ];
      describe('when a chart exists', function() {
        it('redraws the chart with new options', function() {
          let component = this.subject({users}),
            stubs = {
              options: sinon.stub(),
              redraw: sinon.stub(),
              render: sinon.stub()
            };
          window.dc.tooltipMixin = sinon.stub();

          component.chart = stubs;
          component.get('drawChart').call(component);
          expect(component.get('chart')).to.equal(stubs);
          expect(stubs.options).to.have.been.calledOnce;
          expect(stubs.redraw).to.have.been.calledOnce;
          expect(stubs.render).to.not.have.been.called;
          expect(dc.tooltipMixin.calledWith(stubs)).to.be.true;
        });
      });
      describe('when a chart does not exist', function() {
        it('creates and renders a new chart', function() {
          let stubs = {
            options: sinon.stub(),
            redraw: sinon.stub(),
            render: sinon.stub()
          };
          window.dc.tooltipMixin = sinon.stub();
          window.dc.bubbleCloud = sinon.stub().returns(stubs);

          let component = this.subject({users});
          component.get('drawChart').call(component);
          expect(component.get('chart')).to.equal(stubs);
          expect(stubs.options).to.have.been.calledOnce;
          expect(stubs.render).to.have.been.calledOnce;
          expect(stubs.redraw).to.not.have.been.called;
          expect(dc.tooltipMixin.calledWith(stubs)).to.be.true;
        });
      });
    });
  });
});
