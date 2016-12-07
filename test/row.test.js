/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint react/jsx-filename-extension:0, react/no-find-dom-node:0 */
import chai from 'chai';
import ReactTestUtils from 'react-addons-test-utils';
import React from 'react';
import ReactDOM from 'react-dom';
import IssueRow from '../src/row';

const expect = chai.expect;

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
    const dom = ReactDOM.findDOMNode(component);
    expect(dom).to.exist;
    expect(dom.tagName).to.be.equal('TR');
    expect(ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'td').length).to.be.equal(Object.keys(issue).length);
  });

  it('should show data correctly', () => {
    const dom = ReactDOM.findDOMNode(component);
    expect(dom).to.exist;
    expect(dom.childNodes[0].textContent).to.be.equal(issue.seq.toString());
    expect(dom.childNodes[1].textContent).to.be.equal(issue.status);
    expect(dom.childNodes[2].textContent).to.be.equal(issue.category);
    expect(dom.childNodes[3].textContent).to.be.equal(issue.title);
    expect(dom.childNodes[4].textContent).to.be.equal(issue.owner);
    expect(dom.childNodes[5].textContent).to.be.equal(issue.priority);
  });
});
