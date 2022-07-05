module.exports = class StatisticCalculator {
  constructor(PCTengine) {
    this._calcPCT = PCTengine;
  }

  _getGlobalStatistic(fakeUsers) {
    return this._calcPCT(fakeUsers);
  }

  _getStatisticByCountry(fakeUsers) {
    return Object.entries(
      fakeUsers.reduce(
        (totCount, user) =>
          user.location.country in totCount
            ? {
                ...totCount,
                [user.location.country]: [
                  ...totCount[user.location.country],
                  user,
                ],
              }
            : { ...totCount, [user.location.country]: [user] },
        {}
      )
    )
      .sort((a, b) => b[1].length - a[1].length)
      .slice(0, 5)
      .reduce((totData, usersInOneCountry) => {
        return {
          ...totData,
          [usersInOneCountry[0]]: this._calcPCT(usersInOneCountry[1]),
        };
      }, {});
  }

  _getStatisticByState(fakeUsers) {
    return Object.entries(
      fakeUsers.reduce(
        (totCount, user) =>
          user.location.state in totCount
            ? {
                ...totCount,
                [user.location.state]: [...totCount[user.location.state], user],
              }
            : { ...totCount, [user.location.state]: [user] },
        {}
      )
    )
      .sort((a, b) => b[1].length - a[1].length)
      .slice(0, 5)
      .reduce((totData, usersInOneState) => {
        return {
          ...totData,
          [usersInOneState[0]]: this._calcPCT(usersInOneState[1]),
        };
      }, {});
  }

  calc(fakeUsers) {
    return {
      global: this._getGlobalStatistic(fakeUsers),
      country: this._getStatisticByCountry(fakeUsers),
      state: this._getStatisticByState(fakeUsers),
    };
  }
};
