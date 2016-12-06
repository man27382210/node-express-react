import chai from 'chai';
import ReactTestUtils from 'react-addons-test-utils';
import React from 'react';
import ReactDOM from 'react-dom';
import IssueRow from '../src/row';

const expect = chai.expect;
const should = chai.should();

describe('row.jsx', () => {
  var component;
  var issue = { seq: 1, status: 'Open', category: 'cat1', title: 'title1', owner: 'Allen', priority: 'P1' };

  beforeEach(() => {
    component = ReactTestUtils.renderIntoDocument(
      <IssueRow
        key={issue.seq}
        seq={issue.seq}
        status={issue.status}
        category={issue.category}
        title={issue.title}
        owner={issue.owner}
        priority={issue.priority}
      />
    );
  });

  it('should render DOM correctly', () => {
    expect(ReactDOM.findDOMNode(component).tagName).to.be.equal('TR');
    expect(ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'td').length).to.be.equal(6);
  });
  it('should show data correctly', () => {
    expect(component.props.seq).to.be.equal(1);
    expect(component.props.status).to.be.equal('Open');
    expect(component.props.category).to.be.equal('cat1');
    expect(component.props.title).to.be.equal('title1');
    expect(component.props.owner).to.be.equal('Allen');
    expect(component.props.priority).to.be.equal('P1');
  });
});
