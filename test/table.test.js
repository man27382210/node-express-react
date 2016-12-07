import chai from 'chai';
import ReactTestUtils from 'react-addons-test-utils';
import React from 'react';
import ReactDOM from 'react-dom';
import TrackingTable from '../src/table';
import issues from '../src/constant';

const expect = chai.expect;

describe('table.jsx', () => {
  var component;

  beforeEach(() => {
    component = ReactTestUtils.renderIntoDocument(<TrackingTable issues={issues} />);
  });

  it('should render DOM correctly', () => {
    const dom = ReactDOM.findDOMNode(component);
    expect(dom).to.exist;
    expect(dom.childNodes[0].tagName).to.be.equal('TABLE');
    expect(dom.childNodes[0].className).to.be.equal('table table-striped table-bordered table-condensed table-hover');
    //if bootstrap table has class responsive, then there's a div tag wrap outside of the table

    const tHeadTag = dom.childNodes[0].childNodes[0];
    expect(tHeadTag.tagName).to.be.equal('THEAD');
    expect(tHeadTag.childNodes[0].childNodes.length).to.be.equal(6);

    const tBodyTag = dom.childNodes[0].childNodes[1];
    expect(tBodyTag.childNodes.length).to.be.equal(5);
  });
});
