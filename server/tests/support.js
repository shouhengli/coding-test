import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

process.env.NODE_ENV = 'test';

global = Object.assign(global, { expect, chai });
