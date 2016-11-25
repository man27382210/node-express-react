import chai from 'chai';
import ReactTestUtils from 'react-addons-test-utils';
import React from 'react';
import ReactDOM from 'react-dom';
const should = chai.should();
const expect = chai.expect;
import HelloWorld from '../src/hello.jsx';

describe('HelloWorld DOM Rendering', () => {
  it('should render into div and show hello world', () => {

    const helloWorld = ReactTestUtils.renderIntoDocument(<HelloWorld />);

    expect(ReactDOM.findDOMNode(helloWorld).tagName).to.eq('DIV');
    expect(ReactDOM.findDOMNode(helloWorld).querySelectorAll("h1")[0].textContent).to.eq('Hello World!!!');
  })
})
