const chai = require('chai');
const expect = chai.expect;

const HydrationRepo = require('../src/HydrationRepo');
const hydroData = require('./testdata/hydration-test-data');
const userData = require('./testdata/user-test-data');

describe('HydrationRepo', () => {
  let hydrationRepo;
  beforeEach(() => {
    hydrationRepo = new HydrationRepo(hydroData);
  });

  it('should be a function', () => {
    expect(HydrationRepo).to.be.a('function');
  });

  it('should instantiate a class of Hydration', () => {
    expect(hydrationRepo).to.be.an.instanceof(HydrationRepo);
  });

  it('should calculate average all water ever imbibed by specific user', () => {
    expect(hydrationRepo.findAvgDailyHydration(1)).to.equal(23);
  });

  it('should return daily hyration stat by the day', () => {
    expect(hydrationRepo.findDailyHydration(1, '2019/06/15')).to.equal(5);
  });

  it('should return a full week\'s worth of hydration data from starting date onwards', () => {
    expect(hydrationRepo.findWeeklyHydration(1, '2019/06/23')).to.deep.equal([hydroData[2], hydroData[3], hydroData[4], hydroData[5], hydroData[6], hydroData[7], hydroData[8]])
  });

  it('should return the user name who drank the most water on a given date', () => {
    expect(hydrationRepo.getMostHydratedUser('2019/06/15', userData)).to.equal('Vincenzo Hayes')
  });

});
