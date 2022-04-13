Page({
  data: {
    currMonthIndex: 0,
    calendarHeight: 500,
    dayList: [[], [], []],
  },

  onLoad: function (options) {
    this.todayDate()
  },

  // 获取今日数据
  todayDate() {
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth()
    let day = date.getDate()

    this.setData({
      year,
      month,
      day,
      dateTip: year + '年' + (month + 1) + '月'
    })
    this.monthDataCalc(year, month)
    // 计算上个月、下个月
    this.monthDataCalc(year, month + 1, 1)
    this.monthDataCalc(year, month - 1, 2)
  },

  // 获取月份的数据
  monthDataCalc(year, month, index = 0) {
    // 总天数
    let date = new Date(year, month + 1, 0)
    let days = date.getDate()
    // 第一天星期几
    let whichDay = new Date(year, month, 1).getDay()
    let dayList = this.data.dayList
    let dayListItem = { days: [], year: date.getFullYear(), month: date.getMonth() }

    // 补空
    for (let j = 0; j < whichDay; j++) {
      let obj = { 'day': '' };
      dayListItem.days.push(obj)
    }
    for (let i = 1; i <= days; i++) {
      let obj = { 'day': i }
      dayListItem.days.push(obj)
    }
    dayList[index] = dayListItem
    this.setData({ dayList })
  },

  // 月份切换数据更新
  monthDataUpdate(num) {
    let date = new Date(this.data.year, this.data.month + num)
    let year = date.getFullYear()
    let month = date.getMonth()

    this.monthDataCalc(year, month)
    this.setData({
      year: year,
      month: month,
      dateTip: year + '年' + (month + 1) + '月'
    })
  },

  // 月份切换
  monthSwiper(e) {
    let flag = e.currentTarget.dataset.flag
    let { currMonthIndex } = this.data
    let thisMonth = this.data.dayList[currMonthIndex]
    let { year, month } = thisMonth

    if (flag === '0') {
      currMonthIndex = currMonthIndex - 1 < 0 ? 2 : currMonthIndex - 1
    }
    else {
      currMonthIndex = currMonthIndex + 1 > 2 ? 0 : currMonthIndex + 1
    }

    if (currMonthIndex === 0) {
      this.monthDataCalc(year, month + 1, 1)
      this.monthDataCalc(year, month - 1, 2)
    }
    else if (currMonthIndex === 1) {
      this.monthDataCalc(year, month + 1, 2)
      this.monthDataCalc(year, month - 1, 0)
    }
    else if (currMonthIndex === 2) {
      this.monthDataCalc(year, month + 1, 0)
      this.monthDataCalc(year, month - 1, 1)
    }
    this.setData({ currMonthIndex })
  },

  // 月份切换
  calendarSwiper(e) {
    let currMonthIndex = e.detail.current
    let thisMonth = this.data.dayList[currMonthIndex]
    let { year, month } = thisMonth
    if (this.data.dayList[currMonthIndex].days.length > 35)
      this.setData({ calendarHeight: 600 })
    else
      this.setData({ calendarHeight: 500 })

    this.setData({ dateTip: year + '年' + (month + 1) + '月' })

    if (currMonthIndex === 0) {
      this.monthDataCalc(year, month + 1, 1)
      this.monthDataCalc(year, month - 1, 2)
    } else if (currMonthIndex === 1) {
      this.monthDataCalc(year, month + 1, 2)
      this.monthDataCalc(year, month - 1, 0)
    } else if (currMonthIndex === 2) {
      this.monthDataCalc(year, month + 1, 0)
      this.monthDataCalc(year, month - 1, 1)
    }
    this.setData({ currMonthIndex })
  }
})