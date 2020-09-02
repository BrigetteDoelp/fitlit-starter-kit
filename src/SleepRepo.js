class SleepRepo {
  constructor(sleepData) {
    this.sleepData = sleepData
  }

  findDataByID(userID) {
    const entries = this.sleepData.filter(userEntry => {
      return userID === userEntry.userID
    })
    return entries
  }

  findNightlyHoursSlept(userID, date) {
    const entries = this.findDataByID(userID)
    const singleNightSleep = entries.find(userEntry => {
      return date === userEntry.date
    })
    return singleNightSleep.hoursSlept
  }

  findNightlySleepQuality(userID, date) {
    const entries = this.findDataByID(userID)
    const singleNightSleep = entries.find(userEntry => {
      return date === userEntry.date
    })
    return singleNightSleep.sleepQuality
  }

  calculateAvgHrsSlept(userID) {
    const entries = this.findDataByID(userID);
    const totalSleep = entries.reduce((total, data) => {
      total += data.hoursSlept
      return total
    }, 0)
    return parseFloat((totalSleep / entries.length).toFixed(1))
  }

  findAvgTotalSleepQuality(userID) {
    const entries = this.findDataByID(userID);
    const totalSleepQuality = entries.reduce((total, data) => {
      total += data.sleepQuality
      return total
    }, 0)
    const initialResult =  totalSleepQuality / entries.length
    const roundedResult = Math.round((initialResult + Number.EPSILON) * 100) / 100
    return roundedResult
  }

  avgSleepQualityForAll() {
    const totalSleepQuality = this.sleepData.reduce((total, data) => {
      total += data.sleepQuality
      return total
    }, 0)
    const initialResult =  totalSleepQuality / this.sleepData.length
    const roundedResult = Math.round((initialResult + Number.EPSILON) * 100) / 100
    return roundedResult
  }

  allUsers() {
    const everyUser = [];
    this.sleepData.forEach(user => {
      if (!everyUser.includes(user.userID)) {
        everyUser.push(user.userID)
      }
    })
    return everyUser
  }

  findWeekOfSleep(userID, endDate) {
    const entries = this.findDataByID(userID)
    const endingIndex = entries.map(singleEntry => {
      return singleEntry.date
    }).indexOf(endDate);
    const startingIndex = endingIndex - 5
    const weekOfSleep = (entries.slice(startingIndex - 1, endingIndex + 1))
    return weekOfSleep
  }

  weeklyIndividualSleepQualityAvg(userID, endDate) {
    const weekOfSleep = this.findWeekOfSleep(userID, endDate)
    const totalSleepQuality = weekOfSleep.reduce((total, data) => {
      total += data.sleepQuality
      return total
    }, 0)
    const initialResult =  totalSleepQuality / weekOfSleep.length
    const roundedResult = Math.round((initialResult + Number.EPSILON) * 100) / 100
    return {
      userID: userID,
      qualityAvg: roundedResult,
    };
  }

  findWeeklyQualityForEveryUser(endDate) {
    const allUsers = this.allUsers()
    const individualUserQuality = [];
    allUsers.forEach(user => {
      individualUserQuality.push(this.weeklyIndividualSleepQualityAvg(user, endDate))
    })
    return individualUserQuality
  }

  topSleepQuality(endDate) {
    const allWeeklyQualityData = this.findWeeklyQualityForEveryUser(endDate)
    const topSleepers = allWeeklyQualityData.filter(user => {
      return user.qualityAvg > 3
    })
    return topSleepers
  }

  namesOfBestSleepers(endDate, userData) {
    const topSleepers = this.topSleepQuality(endDate)
    const topSleeperNames = topSleepers.map(sleeper => {
      const nameOfUser = userData.find(user => {
        return sleeper.userID === user.id
      })
      return nameOfUser.name
    })
    return topSleeperNames
  }

  findDailySleepForAll(date) {
    const sleptDate = this.sleepData.filter(entry => {
      return date === entry.date
    })
    return sleptDate
  }

  restedPeople(date) {
    const sleepByDate = this.findDailySleepForAll(date);
    sleepByDate.sort((entryA, entryB) => {
      return entryB.hoursSlept - entryA.hoursSlept
    })
    const restedPeople = sleepByDate.filter(user => {
      return sleepByDate[0].hoursSlept === user.hoursSlept
    })
    return restedPeople
  }

  namesOfMostRestedPeople(date, userData) {
    const restedPeople = this.restedPeople(date, userData)
    const restedPeopleNames = restedPeople.map(sleeper => {
      const nameOfUser = userData.find(user => {
        return sleeper.userID === user.id
      })
      return nameOfUser.name
    })
    return restedPeopleNames
  }

  tiredPeople(date) {
    const sleepByDate = this.findDailySleepForAll(date);
    sleepByDate.sort((entryA, entryB) => {
      return entryA.hoursSlept - entryB.hoursSlept
    })
    const sleepiestPeople = sleepByDate.filter(user => {
      return sleepByDate[0].hoursSlept === user.hoursSlept
    })
    return sleepiestPeople
  }

  namesOfLeastRestedPeople(date, userData) {
    const tiredPeople = this.tiredPeople(date, userData)
    const tiredPeopleNames = tiredPeople.map(sleeper => {
      const nameOfUser = userData.find(user => {
        return sleeper.userID === user.id
      })
      return nameOfUser.name
    })
    return tiredPeopleNames
  }

  getBestSleptUser(date, userData) {
    const entries = this.findDailySleepForAll(date)
    const sortedSleepers = entries.sort((entryA, entryB) => entryB.sleepQuality - entryA.sleepQuality)
    const bestSleeperName = userData.find(user => user.id === sortedSleepers[0].userID)
    return bestSleeperName.name
  }
}

if (typeof module !== 'undefined') {
  module.exports = SleepRepo;
}
