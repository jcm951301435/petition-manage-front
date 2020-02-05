import Mock from 'mockjs'
import scan from './modules/scan'

var mockArray = []

Mock.setup({
  timeout: '200 - 400'
})

mockArray = mockArray.concat(scan)

export function mockXHR () {
  for (let i in mockArray) {
    let mockTemp = mockArray[i]
    Mock.mock(mockTemp.url, mockTemp.method, mockTemp.fn)
  }
}
