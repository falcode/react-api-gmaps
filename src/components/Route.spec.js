import React from "react";
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {RouteUnconnected} from './Route';

configure({adapter: new Adapter()});
function shallowSetup() {
    const props = {
        route: {
            driverName: 'Pickle Rick',
            describe: `funniest thing i've ever seen`,
            startTime: new Date(),
            endTime: new Date(),
            stops: [{},{},{}]
        },
      currentRoute: {
        uniqueID: 1,
      },
      loading: false,
      fetchStops: jest.fn()
    }
    const enzymeWrapper = shallow(<RouteUnconnected {...props} />);
  
    return {
      props,
      enzymeWrapper
    };
  }
  const { enzymeWrapper, props } = shallowSetup();

describe("testing route rendered items", () => {
    test("loading apply class unclickable", () => {
        expect(enzymeWrapper.find('.unclickable').length).toEqual(0);
        enzymeWrapper.find('.RouteComponent').simulate('click');
        expect(props.fetchStops).toHaveBeenCalled();
        enzymeWrapper.setProps({loading: true});
        expect(enzymeWrapper.find('.unclickable').length).toEqual(1);
    });
});