import * as R from 'ramda';
import {sort} from 'ramda';

const resultList = [
    {lastname: 'bob', firstname: 'xcv', result: '1:34.2'},
    {lastname: 'bobby', firstname: 'wxwc', result: '1:37.2'},
    {lastname: 'bobette', firstname: 'qsd', result: '1:42.2'},
    {lastname: 'alfred', firstname: 'aze', result: '2:34.5'},
    {lastname: 'miguel', firstname: 'collins', result: '3:13.2'},
    {lastname: 'kim', firstname: 'collins', result: '1:15.0'}
];

const handleMinutes = R.pipe(R.head, R.multiply(60));
const handleSeconds = R.last;

export const parseTimeToSeconds = R.pipe(
    R.split(':'),
    R.map(Number),
    R.converge(R.add, [handleMinutes, handleSeconds])
);

const parseTimeForObject = R.pipe(R.prop('result'), parseTimeToSeconds);

const averageTimes = R.pipe(
    R.pluck('result'),
    R.map(parseTimeToSeconds),
    R.mean
);

const assocTimeInSeconds = (temporaryProp) =>
    R.converge(R.assoc(temporaryProp), [parseTimeForObject, R.identity]);

const sortListByTimesWithTemporaryName_ = (temporaryProp) =>
    R.pipe(
        R.map(assocTimeInSeconds(temporaryProp)),
        R.sortBy(R.prop(temporaryProp)),
        R.map(R.dissoc(temporaryProp))
    );

const sortListByTimes = sortListByTimesWithTemporaryName_('resultInSeconds');

export const getWinner = R.pipe(sortListByTimes, R.head);
const getPodium = R.pipe(sortListByTimes, R.take(3));

const getSwaggyResults = R.applySpec({
    average: averageTimes,
    podiumAverage: R.pipe(getPodium, averageTimes),
    winner: getWinner,
    podium: getPodium
});

console.log(getSwaggyResults(resultList));

