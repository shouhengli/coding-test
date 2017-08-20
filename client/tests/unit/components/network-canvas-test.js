import {expect} from 'chai';
import {describe, it} from 'mocha';
import {setupComponentTest} from 'ember-mocha';
//import Relation from 'client/models/relation';
//import User from 'client/models/user';

describe('Unit | Component | network canvas', function() {
  setupComponentTest('network-canvas', {
    unit: true
  });

  //const sampleRelations = [
  //    Relation.create({from: 1, to: 2}),
  //    Relation.create({from: 2, to: 3}),
  //    Relation.create({from: 4, to: 5})
  //  ],
  //  sampleUsers = [
  //    User.create({id: 1}),
  //    User.create({id: 2}),
  //    User.create({id: 3}),
  //    User.create({id: 4}),
  //    User.create({id: 5})
  //  ];

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
