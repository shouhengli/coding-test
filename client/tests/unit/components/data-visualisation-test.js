import {expect} from 'chai';
import {describe, it} from 'mocha';
import {setupComponentTest} from 'ember-mocha';
import sinon from 'sinon';

describe('Unit | Component | data visualisation', function() {
  setupComponentTest('data-visualisation', {
    needs: ['service:store'],
    unit: true
  });

  it('has injected store service', function() {
    let component = this.subject();
    expect(component.get('store')).to.be.ok;
  });

  it('#actions.drawSamples fetch samples', function() {
    let component = this.subject(),
      store = component.get('store');
    sinon.spy(store, 'fetchSamples');
    component.actions.drawSamples.call(component);
    expect(store.fetchSamples).to.have.been.calledOnce;
    store.fetchSamples.restore();
  });

  it('#actions.clearSamples clears cache', function() {
    let component = this.subject(),
      store = component.get('store');
    sinon.spy(store, 'clear');
    component.actions.clearSamples.call(component);
    expect(store.clearSamples).to.have.been.calledOnce;
    store.clear.restore();
  });
});
