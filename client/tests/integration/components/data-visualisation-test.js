import {expect} from 'chai';
import {describe, it} from 'mocha';
import {setupComponentTest} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | data visualisation', function() {
  setupComponentTest('data-visualisation', {
    integration: true
  });

  it('renders a Add button', function() {
    this.render(hbs`{{data-visualisation}}`);
    expect(this.$('a.button:contains("ADD")')).to.have.length(1);
  });

  it('renders a Clear button', function() {
    this.render(hbs`{{data-visualisation}}`);
    expect(this.$('a.button:contains("CLEAR")')).to.have.length(1);
  });
});
