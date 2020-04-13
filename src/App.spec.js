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
const { enzymeWrapper } = shallowSetup();



describe("testing app rendered items", () => {
  test("header title", () => {
      expect(enzymeWrapper.find('.App-header').text()).toBe(title);
  });
  test("loading appears", () => {
    expect(enzymeWrapper.find('.loading').length).toEqual(0);
    enzymeWrapper.setProps({ loading: true});
    expect(enzymeWrapper.find('.loading').length).toEqual(1);
    expect(enzymeWrapper.find('.loading').text()).toBe('Loading...');
  });
  test("map component appears", () => {
    expect(enzymeWrapper.find(Map).length).toEqual(1);
  });
  test("route component appears", () => {
    expect(enzymeWrapper.find(Route).length).toEqual(0);
    enzymeWrapper.setProps({ 
      routes: [{ uniqueID: 1, route: {}}]
    });
    expect(enzymeWrapper.find(Route).length).toEqual(1);
    enzymeWrapper.setProps({ 
      routes: [
        { uniqueID: 1, route: {}},
        { uniqueID: 2, route: {}}
      ]
    });
    expect(enzymeWrapper.find(Route).length).toEqual(2);
  });
});