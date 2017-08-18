import {expect} from 'chai';
import {describe, it, beforeEach} from 'mocha';
import relation from 'client/models/relation';

describe('Unit | Model | relation', function() {
  let model;
  beforeEach(() => (model = relation.create()));
  it('exists', function() {
    expect(model).to.be.ok;
  });

  it('has a "from" property', function() {
    expect(model).to.have.property('from', null);
    model = relation.create({from: 1});
    expect(model).to.have.property('from', 1);
  });

  it('has a "to" property', function() {
    expect(model).to.have.property('to', null);
    model = relation.create({to: 1});
    expect(model).to.have.property('to', 1);
  });
});
