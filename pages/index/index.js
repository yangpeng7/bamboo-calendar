// index.js
const dayjs = require('dayjs').default;
var customParseFormat = require("dayjs/plugin/customParseFormat").default;
var advancedFormat = require('dayjs/plugin/advancedFormat').default;
dayjs.extend(advancedFormat);
dayjs.extend(customParseFormat);

Page({
  data: {
    displayMonthIndex: 0,
    displayMonth: "",
    displayYear: "",
    currentMonth: "",
    todayDate: dayjs().format('YYYY-MM-DD'),
    months: [],
  },
  /**
   * @param {当前所在滑块的index} e 
   * displayMonthIndex 只有 0、1、2 三个取值
   * 这里逻辑比较复杂解释一下：
   * months: [[], [], []] 用来存储用来显示的月份日期
   *【1】初始状态 swiper displayMonthIndex 0，即显示的是months[0]的数据
   * months[0]为当前月份（例如是6月）；
   * 向右滑是下一个月，所以months[1]为下一个月份（7月）；
   * 向左滑为上一个月，所以months[2]为上一个月份（5月）；
   *【2】当swiper滑到months[1]时（向右滑）
   * months[1]的数据为（7月）；
   * months[0]的数据为上一个月（6月）；
   * months[2]的数据为下一个月（8月）；
   *【3】当swiper滑到months[2]时（再次向右滑）
   * months[2]的数据为（8月）；
   * months[1]的数据为上一个月（7月）；
   * months[0]的数据为下一个月（9月）；
   */
  onMonthChange(e) {
    console.log(e.detail.current);
    let displayMonthIndex = e.detail.current;
    let { month, year } = this.data.months[displayMonthIndex]

    let months = [[], [], []];
    if (displayMonthIndex == 0) {
      months[0] = this.data.months[displayMonthIndex];
      months[1] = this.getDisplayMonthDays(year, month + 1);
      months[2] = this.getDisplayMonthDays(year, month - 1);
    } else if (displayMonthIndex == 1) {
      months[0] = this.getDisplayMonthDays(year, month - 1);
      months[1] = this.data.months[displayMonthIndex];
      months[2] = this.getDisplayMonthDays(year, month + 1);
    } else if (displayMonthIndex == 2) {
      months[0] = this.getDisplayMonthDays(year, month + 1);
      months[1] = this.getDisplayMonthDays(year, month - 1);
      months[2] = this.data.months[displayMonthIndex];
    }
    this.setData({
      displayMonth: month + 1,
      displayYear: year,
      months: months,
      displayMonthIndex: displayMonthIndex
    })
    console.log(this.data.months);
  },

  /**
   * 初始化数据
   * months[0]:当前月
   * months[1]:上个月
   * months[2]:下个月
   */
  initData() {
    let currentMonth = dayjs();
    let year = currentMonth.year()
    let month = currentMonth.month()
    console.log(month, "ddddddd");
    this.setData({
      currentMonth: currentMonth,
      displayYear: year,
      displayMonth: month + 1,
      
    })
    console.log(year, month, new Date().getMonth());
    this.setData({
      months: [this.getDisplayMonthDays(year, month), this.getDisplayMonthDays(year, month + 1), this.getDisplayMonthDays(year, month - 1)]
    })
    console.log(this.data.todayDate)
    console.log(this.data.months)
  },

  /**
   * 获取将要显示的月的天数
   */
  getDisplayMonthDays(year, month) {
    let first = dayjs(new Date(year, month, 1))
    let displayDays = []
    //获取第一天是周几
    let preDays = first.day();
    for (let i = 0 - preDays; i < 42 - preDays; i++) {
      let preDate = first.add(i, 'day');
      let date = preDate.format('YYYY-MM-DD');
      displayDays.push({
        date: date,
        day: preDate.format('D'),
        month: preDate.format('M'),
      })
    }
    //所有要显示的这个月的年月日，有一些是需要置灰的
    return {
      year: year,
      month: month,
      days: displayDays
    }
  },
  onLoad() {
    this.initData();
  },
})
