import React from "react";
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {MapUnconnected} from './Map';

configure({adapter: new Adapter()});
const propss = {
    currentRoute: {
      uniqueID: 1,
      driverName: 'Pickle Rick',
      describe: `funniest thing i've ever seen`,
      startTime: new Date(),
      endTime: new Date(),
      stops: [{},{},{}]
    },
  }
function shallowSetup() {
    const props = {
      currentRoute: {
        uniqueID: 1,
        driverName: 'Pickle Rick',
        describe: `funniest thing i've ever seen`,
        startTime: new Date(),
        endTime: new Date(),
        stops: [{},{},{}]
      },
    }
    const enzymeWrapper = shallow(<MapUnconnected {...props} />);
  
    return {
      props,
      enzymeWrapper
    };
  }
  const { enzymeWrapper, props } = shallowSetup();

describe("testing data parser methods", () => {
    test("stopPointsToCoordinates", () => {
        expect(enzymeWrapper.instance().stopPointsToCoordinates([{},{}]).length).toEqual(0);
        expect(enzymeWrapper.instance().stopPointsToCoordinates([{point:{}},{point:{}}]).length).toEqual(2);
    });
});