/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint react/jsx-filename-extension:0, react/no-find-dom-node:0 */
import chai from 'chai';
import ReactTestUtils from 'react-addons-test-utils';
import React from 'react';
import ReactDOM from 'react-dom';
import TrackingTable from '../src/table';
import issues from '../src/constant';

const expect = chai.expect;

describe('table.jsx', () => {
  let component;

  beforeEach(() => {
    component = ReactTestUtils.renderIntoDocument(<TrackingTable issues={issues} />);
  });

  it('should render DOM correctly', () => {
    const dom = ReactDOM.findDOMNode(component);
    expect(dom).to.exist;
    expect(dom.childNodes[0].tagName).to.be.equal('TABLE');
    expect(dom.childNodes[0].className).to.match(/\btable\b/);
    expect(dom.childNodes[0].className).to.match(/\btable-striped\b/);
    expect(dom.childNodes[0].className).to.match(/\btable-bordered\b/);
    expect(dom.childNodes[0].className).to.match(/\btable-condensed\b/);
    expect(dom.childNodes[0].className).to.match(/\btable-hover\b/);
    expect(dom.className).to.match(/\btable-responsive\b/);
    // if bootstrap table has class responsive, there's a div tag wrap outside of the table

    const tHeadTag = dom.childNodes[0].childNodes[0];
    expect(tHeadTag).to.exist;
    expect(tHeadTag.tagName).to.be.equal('THEAD');
    expect(tHeadTag.childNodes[0].childNodes.length).to.be.equal(Object.keys(issues[0]).length);

    const tBodyTag = dom.childNodes[0].childNodes[1];
    expect(tBodyTag).to.exist;
    expect(tBodyTag.childNodes.length).to.be.equal(Object.keys(issues).length);
  });
});
