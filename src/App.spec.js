import React from "react";
import {AppUnconnected, title} from "./App";
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Map from './components/Map';
import Route from './components/Route';


configure({adapter: new Adapter()});

function shallowSetup() {
  const props = {
    routes: [],
    loading: false,
    fetchRoutes: jest.fn()
  }
  const enzymeWrapper = shallow(<AppUnconnected {...props} />);

  return {
    props,
    enzymeWrapper
  };
}
describe("Button component", () => {
  test("Matches the snapshot", () => {
      const { enzymeWrapper, props } = shallowSetup();
      expect(enzymeWrapper.find('.App-header').text()).toBe(title);
      expect(props.loading).toBe(false);

  });
});