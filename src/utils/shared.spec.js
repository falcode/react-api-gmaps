import {setTime, addZero} from './shared';
describe('basic functions from route', () => {
    test('setTime returns string hour and minutes time', () => {
        expect(setTime(new Date().setHours(3,33,0))).toEqual('03:33');
    });
    test('setTime returns string hour and minutes time', () => {
        expect(addZero(1)).toEqual('01');
        expect(addZero(10)).toEqual(10);
    });
});