const chai = require('chai');
const expect = chai.expect;

const activityData = require('./testdata/activity-test-data');
const userData = require('./testdata/user-test-data');
const ActivityRepo = require('../src/ActivityRepo');
const User = require('../src/User');

describe('ActivityRepo', () => {
  let activityRepo;
  let dannie;
  beforeEach(() => {
    activityRepo = new ActivityRepo(activityData);
    dannie = new User(userData[6])
  });

  it('should be a function', () => {
    expect(ActivityRepo).to.be.a('function');
  });

  it('should instantiate a class of Hydration', () => {
    expect(activityRepo).to.be.an.instanceof(ActivityRepo);
  });

  it('should store an array of activity logs', () => {
    expect(activityRepo.activityData).to.deep.equal(activityData);
  });

  it('should calculate how many miles a user has walked on a given date', () => {
    expect(activityRepo.calculateMilesWalked(dannie, '2019/08/10')).to.equal(4.39);
  });

  it('should return how many minutes a user spent being active on a given date', () => {
    expect(activityRepo.findMinutesActive(dannie, '2019/08/13')).to.equal(227);
  });

  it('should find a user\'s data for a given week', () => {
    expect(activityRepo.getWeekOfData(dannie, '2019/08/14')).to.deep.equal([activityData[0], activityData[1], activityData[2], activityData[3], activityData[4], activityData[5], activityData[6]]);
  });

  it('should return the average minutes a day a user was active for a given week', () => {
    expect(activityRepo.calculateAvgMinutesForWeek(dannie, '2019/08/14')).to.equal(168);
  });

  it('should determine if a user reached their step goal for a given date', () => {
    expect(activityRepo.findIfStepGoalMet(dannie, '2019/08/10')).to.be.false;
    expect(activityRepo.findIfStepGoalMet(dannie, '2019/08/13')).to.be.true;
  });

  it('should return all dates a user exceeded their step goal', () => {
    expect(activityRepo.getDatesGoalWasMet(dannie)).to.deep.equal([activityData[5], activityData[7], activityData[8]]);
  });

  it('should return a user\'s all-time stair climbing record', () => {
    expect(activityRepo.getClimbingRecord(dannie)).to.deep.equal(activityData[4]);
  });

  it('should get the average number of stairs climbed by all users on a given date', () => {
    expect(activityRepo.calculateAllUsersAverage('2019/08/08', 'flightsOfStairs')).to.equal(29);
  });
  
  it('should get the average number of steps taken by all users on a given date', () => {
    expect(activityRepo.calculateAllUsersAverage('2019/08/08', 'numSteps')).to.equal(7618);
  });

  it('should get the average number of minutes active by all users on a given date', () => {
    expect(activityRepo.calculateAllUsersAverage('2019/08/08', 'minutesActive')).to.equal(151);
  });

  it('should find names of users who met all users average step goal on a given date', () => {
    expect(activityRepo.getUsersWhoMetStepGoal('2019/08/08', 'numSteps', userData)).to.deep.equal(['Dan Hodkiewicz', 'Wilburn Collins', 'Alexandrea Wehner', 'Maria Kemmer', 'Kristin Cruickshank', 'Greta Corkery']);
  });

  it('should find the name of user who had the highest steps on a given date', () => {
    expect(activityRepo.getUserWithMostSteps('2019/08/08', userData)).to.equal('Dan Hodkiewicz');
  });
});