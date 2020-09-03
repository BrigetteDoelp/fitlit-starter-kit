const user = new User(userData[33])
const userRepo = new UserRepo(userData)
const hydrationRepo = new HydrationRepo(hydrationData)
const activityRepo = new ActivityRepo(activityData)
const sleepRepo = new SleepRepo(sleepData)

const activityButtons = document.querySelectorAll('.activity-button')
const stepsWeekData = document.querySelector('.steps-week-data');
const minutesWeekData = document.querySelector('.minutes-week-data');
const stairsWeekData = document.querySelector('.stairs-week-data');

const sleepButtons = document.querySelectorAll('.sleep-button');
const hoursWeekData = document.querySelector('.hours-week-data');
const qualityWeekData = document.querySelector('.quality-week-data');
const allTimeSleepData = document.querySelector('.all-time-sleep-data');

window.addEventListener('load', updateDisplay);
activityButtons.forEach(button => button.addEventListener('click', toggleActivityStats))
sleepButtons.forEach(button => button.addEventListener('click', toggleSleepStats))

function toggleSleepStats(event) {
  switch (event.target.id) {
    case 'hours-button':
      hoursWeekData.classList.remove('hidden')
      qualityWeekData.classList.add('hidden')
      allTimeSleepData.classList.add('hidden')
      console.log('a')
      break
    case 'quality-button':
      hoursWeekData.classList.add('hidden')
      qualityWeekData.classList.remove('hidden')
      allTimeSleepData.classList.add('hidden')
      console.log('b')
      break
    case 'average-button':
      hoursWeekData.classList.add('hidden')
      qualityWeekData.classList.add('hidden')
      allTimeSleepData.classList.remove('hidden')
      console.log(event.target)
      break
  }
}

function toggleActivityStats(event) {
  switch (event.target.id) {
    case 'steps-button':
      stepsWeekData.classList.remove('hidden')
      minutesWeekData.classList.add('hidden')
      stairsWeekData.classList.add('hidden')
      break
    case 'minutes-button':
      stepsWeekData.classList.add('hidden')
      minutesWeekData.classList.remove('hidden')
      stairsWeekData.classList.add('hidden')
      break
    case 'stairs-button':
      stepsWeekData.classList.add('hidden')
      minutesWeekData.classList.add('hidden')
      stairsWeekData.classList.remove('hidden')
      break
  }
}

//spike - exploratory dvlpmt process
// spike branch to see where it goes

function displayUserData() {
  const friendList = user.friends.map(friend => {
  const info = userRepo.searchUsersByID(friend)
    return info.name
  })

  const greeting = document.querySelector('.greeting');
  const userName = document.querySelector('.user-name');
  const userAddress = document.querySelector('.user-address');
  const userStrideLength = document.querySelector('.user-stride-length');
  const userDailyStepGoal = document.querySelector('.user-daily-step-goal');
  const userFriends = document.querySelector('.user-friends');
  const stepData = document.querySelector('.step-data');

  //can you loop thru these too?
  greeting.innerText = `Welcome ${user.getFirstName()}!`
  userName.innerText = user.name
  userAddress.innerText = user.address
  userStrideLength.innerText = user.strideLength
  userDailyStepGoal.innerText = user.dailyStepGoal
  userFriends.innerText = friendList
  stepData.innerText = `Your Step Goal: ${user.dailyStepGoal}, Average Step Goal: ${userRepo.calculateAverageStepGoals()}`
}

function displayHydrationData() {
  const hydrationTodayData = document.querySelector('.hydration-today-data');
  const hydrationWeekData = document.querySelector('.hydration-week-data');
  const dateDisplay = document.querySelector('.date-display');
  const weeklyData = hydrationRepo.findWeeklyHydration(user.id, '2019/09/21')

  hydrationTodayData.innerText = `Ounces Drank Today: ${hydrationRepo.findDailyHydration(user.id, '2019/09/21')}`;
  weeklyData.forEach((data) => {
    hydrationWeekData.innerHTML += `<p>${data.numOunces} ounces</p>`
    dateDisplay.innerHTML += `<p>${data.date}</p>`
  })
}

function displayActivityData() {
  const stepsTodayData = document.querySelector('.steps-today-data');
  const minutesTodayData = document.querySelector('.minutes-today-data');
  const milesTodayData = document.querySelector('.miles-today-data');
  const stepsComparisonData = document.querySelector('.steps-comparison-data');
  const minutesComparisonData = document.querySelector('.minutes-comparison-data');
  const stairsComparisonData = document.querySelector('.stairs-comparison-data');

  const weekActive = activityRepo.getWeekOfData(user, '2019/09/21')

  stepsTodayData.innerText += `Steps Today: ${activityRepo.getActivityEntry(user, '2019/09/21').numSteps}`
  minutesTodayData.innerText += `Minutes Today: ${activityRepo.findMinutesActive(user, '2019/09/21')}`
  milesTodayData.innerText += `Miles Today: ${activityRepo.calculateMilesWalked(user, '2019/09/21')}`

  weekActive.forEach(entry => {
    minutesWeekData.innerHTML += `<p>${entry.minutesActive}</p>`
  })
  weekActive.forEach(entry => {
    stepsWeekData.innerHTML += `<p>${entry.numSteps}</p> `
  })
  weekActive.forEach(entry => {
    stairsWeekData.innerHTML += `<p>${entry.flightsOfStairs}</p>`
  })

  stepsComparisonData.innerText = `Average Steps Taken ${activityRepo.calculateAllUsersAverage('2019/09/21', 'numSteps')}`
  minutesComparisonData.innerText = `Average Minutes Active: ${activityRepo.calculateAllUsersAverage('2019/09/21', 'minutesActive')}`
  stairsComparisonData.innerText = `Average Stairs Climbed: ${activityRepo.calculateAllUsersAverage('2019/09/21', 'numSteps')}`
}

function displaySleepData() {
  const hoursTodayData = document.querySelector('.hours-today-data');
  const qualityTodayData = document.querySelector('.quality-today-data');
  const hoursSleptWeekly = sleepRepo.findWeekOfSleep(user.id, '2019/09/21');

  hoursTodayData.innerText = `Hours Slept Today: ${sleepRepo.findNightlyHoursSlept(user.id, '2019/09/21')}`;
  qualityTodayData.innerText = `Sleep Quality Today: ${sleepRepo.findNightlySleepQuality(user.id, '2019/09/21')}`;
  hoursSleptWeekly.forEach(night => {
    hoursWeekData.innerText += ` ${night.hoursSlept}`
  })
  hoursSleptWeekly.forEach(night => {
    qualityWeekData.innerText += ` ${night.sleepQuality} `
  })
  allTimeSleepData.innerText += `Average Hours Slept: ${sleepRepo.calculateAvgHrsSlept(user.id)}`;
  allTimeSleepData.innerText += `Average Sleep Quality: ${sleepRepo.findAvgTotalSleepQuality(user.id)}`
}

function updateDisplay() {
  displayUserData()
  displayHydrationData()
  displayActivityData()
  displaySleepData()
}
