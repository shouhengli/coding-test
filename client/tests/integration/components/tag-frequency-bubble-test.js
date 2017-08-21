import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | tag frequency bubble', function() {
  setupComponentTest('tag-frequency-bubble', {
    integration: true
  });

  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#tag-frequency-bubble}}
    //     template content
    //   {{/tag-frequency-bubble}}
    // `);

    this.render(hbs`{{tag-frequency-bubble}}`);
    expect(this.$()).to.have.length(1);
  });
});
