import random from '@/utils/random'

var scanList = [{
  trackingNum: '33343543453543',
  scanOn: '2019-10-27 16:09:52',
  interceptStatus: false,
  id: 385586271155650560,
  insertOn: '2019-10-27 16:09:52',
  insertBy: null,
  updateOn: '2019-10-27 16:09:52',
  updateBy: null,
  deleteFlag: false,
  deleteOn: null,
  deleteBy: null,
  remarks: null
}]

function create () {
  const newScan = {
    trackingNum: random.randomNum(1111111111111, 9999999999999),
    scanOn: '2019-10-27 16:09:52',
    interceptStatus: false,
    id: random.randomNum(11111111111111111111, 11111111111111111111),
    insertOn: '2019-10-27 16:09:52',
    insertBy: null,
    updateOn: '2019-10-27 16:09:52',
    updateBy: null,
    deleteFlag: false,
    deleteOn: null,
    deleteBy: null,
    remarks: null
  }
  scanList = scanList.concat(newScan)
  return 1
}

function list () {
  return {
    code: 200,
    message: '操作成功',
    data: {
      pageNum: 1,
      pageSize: 20,
      totalPage: 1,
      total: 1,
      list: [{
        id: 385586271155650560,
        insertOn: '2019-10-27 16:09:52',
        insertBy: null,
        updateOn: '2019-10-27 16:09:52',
        updateBy: null,
        deleteFlag: false,
        deleteOn: null,
        deleteBy: null,
        remarks: null,
        trackingNum: '33343543453543',
        scanOn: '2019-10-27 16:09:52',
        interceptStatus: false
      }]
    }
  }
}

function recentCount () {
  return {
    code: 200,
    message: '操作成功',
    data: {
      beforeYesterdayCount: 0,
      todayCount: 1,
      yesterdayCount: 0
    }
  }
}

const mock = [{
  url: '/trackingScan/create',
  method: 'post',
  fn: create
}, {
  url: '/trackingScan/list',
  method: 'get',
  fn: list
}, {
  url: '/trackingScan/recentCount',
  method: 'get',
  fn: recentCount
}]

export default mock
