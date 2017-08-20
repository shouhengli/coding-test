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

  it('#actions.drawSamples fetch samples', async function() {
    let component = this.subject(),
      store = component.get('store');
    sinon.spy(store, 'fetchSamples');
    await component.actions.drawSamples.call(component);
    expect(store.fetchSamples).to.have.been.calledOnce;
    expect(component.get('relations')).to.deep.equal(store.getRelations());
    expect(component.get('users')).to.deep.equal(store.getUsers());
    store.fetchSamples.restore();
  });

  it('#actions.clearSamples clears cache', async function() {
    let component = this.subject(),
      store = component.get('store');
    await component.actions.drawSamples.call(component);
    expect(component.get('users')).to.not.be.empty;
    expect(component.get('relations')).to.not.be.empty;
    sinon.spy(store, 'clear');
    component.actions.clearSamples.call(component);
    expect(store.clearSamples).to.have.been.calledOnce;
    expect(component.get('users')).to.be.null;
    expect(component.get('relations')).to.be.null;
    store.clear.restore();
  });
});
