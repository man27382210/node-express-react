/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint react/jsx-filename-extension:0, react/no-find-dom-node:0 */
import chai from 'chai';
import ReactTestUtils from 'react-addons-test-utils';
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/index';

const expect = chai.expect;

describe('index.jsx', () => {
  var component;

  beforeEach(() => {
    component = ReactTestUtils.renderIntoDocument(
      <App />
    );
  });

  it('should render dom correctly', () => {
    const app = ReactDOM.findDOMNode(component);
    expect(app).to.exist;

    const newBtn = app.childNodes[0];
    expect(newBtn).to.exist;
    expect(newBtn.tagName).to.be.equal('BUTTON');
    expect(newBtn.textContent).to.be.equal('New');

    const trackingTable = app.childNodes[1];
    expect(trackingTable).to.exist;
    expect(trackingTable.childNodes[0].tagName).to.be.equal('TABLE');

    const modalDialog = app.childNodes[2];
    expect(modalDialog).to.exist;
  });
});
