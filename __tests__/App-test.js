/**
 * @format
 */
import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'

import App from '../src/App'

// Note: test renderer must be required after react-native.

test('Checking If App running', () => {
  const { getByText } = render(<App />);
  if(flag =="PORRL"){
    const linkElement = getByText('Repos');
    expect(linkElement).toBeInTheDocument();
  }
});
