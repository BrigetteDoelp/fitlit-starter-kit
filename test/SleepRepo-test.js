const chai = require('chai');
const expect = chai.expect;

const sleepData = require('./testdata/sleep-test-data');
const userData = require('./testdata/user-test-data');

const SleepRepo = require('../src/SleepRepo');

describe('Sleep', () => {
  let sleepRepo;
  beforeEach(() => {
    sleepRepo = new SleepRepo(sleepData);
  });

  it('should be a function', () => {
    expect(SleepRepo).to.be.a('function');
  });

  it('should instantiate a class of SleepRepo', () => {
    expect(sleepRepo).to.be.an.instanceof(SleepRepo);
  });

  it('should calculate average all time slept for a specific user', () => {
    expect(sleepRepo.calculateAvgHrsSlept(1)).to.equal(5);
  });

  it('should return nightly sleep by date', () => {
    expect(sleepRepo.findNightlyHoursSlept(1, '2019/06/15')).to.equal(5);
  });

  it('should return nightly sleep quality by date', () => {
    expect(sleepRepo.findNightlySleepQuality(1, '2019/06/15')).to.equal(2.2);
  });

  it('should return a full week\'s worth of sleep hours from starting date onwards', () => {
    expect(sleepRepo.findWeekOfSleep(1, '2019/06/23')).to.deep.equal([sleepData[2], sleepData[3], sleepData[4], sleepData[6], sleepData[7], sleepData[8], sleepData[9]]);
  });

  it('should calculate average of sleep quality for all users', () => {
    expect(sleepRepo.avgSleepQualityForAll()).to.equal(2.8);
  });

  it('should give back all users whose sleep quality avg is above 3', () => {
    expect(sleepRepo.namesOfBestSleepers('2019/06/23', userData)).to.deep.equal(["Garnett Cruickshank"]);
  });

  it('should name all of the people who slept the most on any given day', () => {
    expect(sleepRepo.namesOfMostRestedPeople('2019/06/23', userData)).to.deep.equal(["Jarvis Considine", "Laney Abshire"]);
  });

  it('should name all of the people who slept the least on any given day', () => {
    expect(sleepRepo.namesOfLeastRestedPeople('2019/06/23', userData));
  });

  it('should find the user with best sleep quality for a given date', () => {
    expect(sleepRepo.getBestSleptUser('2019/06/23', userData)).to.equal('Garnett Cruickshank');
  });

});
