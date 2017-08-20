import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | tags frequency', function() {
  setupComponentTest('tags-frequency', {
    integration: true
  });

  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#tags-frequency}}
    //     template content
    //   {{/tags-frequency}}
    // `);

    this.render(hbs`{{tags-frequency}}`);
    expect(this.$()).to.have.length(1);
  });
});
