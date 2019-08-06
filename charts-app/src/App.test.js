import React from 'react';
// import ReactDOM from 'react-dom';
import {shallow, configure, mount, render} from 'enzyme';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';
// import { wrap } from 'module';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() })

const getConnectedComponent = (Component) => {
  return (
    <Provider store={store}>
      <Component />
    </Provider>
  );
}

it('renders without crashing', () => {
  // const div = document.createElement('div');
  // ReactDOM.render(<, div);
  // const wrap = render(getConnectedComponent(App));
  const wrap = render(<Provider store={store}>
    <App />
  </Provider>);
  console.log(wrap.find('.container'));
  // expect(wrap.find('.container').to.have.lengthOf(1);
  expect(wrap.find('.container').length).toBe(1);
  // ReactDOM.unmountComponentAtNode(div);
});
