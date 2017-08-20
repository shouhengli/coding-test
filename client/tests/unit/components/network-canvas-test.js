import {expect} from 'chai';
import {describe, it} from 'mocha';
import {setupComponentTest} from 'ember-mocha';

describe('Unit | Component | network canvas', function() {
  setupComponentTest('network-canvas', {
    unit: true
  });

  describe('networkOptions', function() {
    it('disabled network manipulation', function() {
      let component = this.subject();
      expect(component.get('networkOptions')).to.have.deep.property(
        'manipulation.enabled',
        false
      );
    });
  });
});
