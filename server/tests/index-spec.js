import server from '../src';
import {open, unlink} from 'fs';

describe('server app', function() {
  it('uses hbs as view engine', () => {
    expect(server.get('view engine')).to.equal('hbs');
  });

  it('exposes assets as a static file repository', done => {
    let asset = '/an-asset.txt';
    let assetLocation = `assets${asset}`;
    open(assetLocation, 'w', err => {
      chai.request(server).get(asset).end((err, response) => {
        if (err) throw err;
        expect(response).to.have.status(200);
        unlink(assetLocation, () => {
          if (err) throw err;
          done();
        });
      });
    });
  });

  describe('"/" route', function() {
    it('renders the correct content', done => {
      chai.request(server).get('/').end((err, response) => {
        expect(response.text).to.include('<!DOCTYPE html>');
        done();
      });
    });

    it('renders the correct script tag', done => {
      chai.request(server).get('/').end((err, response) => {
        expect(response.text).to.include('<script src="/assets/client-');
        done();
      });
    });

    it('renders the correct link tag', done => {
      chai.request(server).get('/').end((err, response) => {
        expect(response.text).to.include('<link rel="stylesheet" href="/assets/client-');
        done();
      });
    });
  });
});
