import {expect} from 'chai';
import {describe, it, beforeEach} from 'mocha';
import user from 'client/models/user';

describe('Unit | Model | user', function() {
  let model;
  beforeEach(() => (model = user.create()));

  it('exists', function() {
    expect(model).to.be.ok;
  });

  it('has an "id" property', function() {
    expect(model).to.have.property('id', null);
    model = user.create({id: 1});
    expect(model).to.have.property('id', 1);
  });

  it('has an "tags" property', function() {
		expect(model.tags).to.be.an('array').
			and.have.lengthOf(0);
    model = user.create({tags: ['a', 'b', 'c']});
    expect(model.tags).to.have.lengthOf(3).
			and.have.members(['a', 'b', 'c']);
  });
});
