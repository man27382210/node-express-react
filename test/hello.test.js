import chai from 'chai';
import ReactTestUtils from 'react-addons-test-utils';
import React from 'react';
var should = chai.should();
import HelloWorld from '../src/hello.jsx';

describe('HelloWorld DOM Rendering', () => {
  it('should render into div and show hello world', () => {

    const helloWorld = ReactTestUtils.renderIntoDocument(<HelloWorld />);
    
  })
})
