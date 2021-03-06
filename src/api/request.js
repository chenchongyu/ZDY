import {AsyncStorage} from 'react-native'
import Toast from 'react-native-root-toast'
import DeviceInfo from 'react-native-device-info'
import {recordLog} from '../libs/errorHandler'

const uniqueId = DeviceInfo.getUniqueID().toUpperCase()
export const API_URL = 'http://sjzx-kshzj-zhdy-1.cintcm.ac.cn:8080'
// export const API_URL = 'http://otc.icecode.cc'
const PID = 'pid'
export const fillUrl = (url = '') => {
  if (!url.startsWith('http://')) {
    url = API_URL + url
  }
  return url
}
let pid = ''
const toQueryString = (params) => {
  const querys = []
  for (let p in params) {
    querys.push(`${p}=${params[p]}`)
  }
  return querys.join('&')
}

let errorCount = 0
const ajax = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}${url}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          'token': pid
        },
        body: toQueryString(params)
      }).then(resp => resp.json())
      .then(({errorCode = '100', errorMsg, data}) => {
        console.log(url, 'token='+ pid, errorMsg, errorCode, params, data)
        if (errorCode === '100') {
          errorCount = 0
          resolve(data || {})
        } else {
          throw new Error(errorMsg)
        }
      }).catch(err => {
        errorCount++
        const msg = err ? String(err) : '服务器内部错误'
        Toast.show(msg)
        errorCount <= 3 && recordLog(JSON.stringify({msg, url, pid, params}))
        reject(err)
      })
  })
}

export const callRecommendHome = () => {
  return ajax('/api/recommend/home')
}

export const callSearchHome = () => {
  return ajax('/api/search/home')
}

export const callSearchList = (params) => {
  return ajax('/api/search/list', params)
}

export const callMedicinalDetail = (params) => {
  return ajax('/api/medicinal/detail', params)
}

export const callEvaluatePage = () => {
  return ajax('/api/evaluate/page')
}

export const callDiseaseDeatil = params => {
  return ajax('/api/v2/recommend/disease/detail', params)
}

export const callEvaluateAdd = (params) => {
  return ajax('/api/evaluate/add', params)
}

export const callEvaluateList = (params) => {
  return ajax('/api/evaluate/list', params)
}

export const callAboutUs = () => {
  return ajax('/api/center/about/us')
}

export const callProductList = () => {
  return ajax('/api/center/recommend/product/list')
}

export const callRecommendSubmit = (params) => {
  return ajax('/api/v2/recommend/submit', params)
}

export const callRecommendFilter = (params) => {
  return ajax('/api/v2/recommend/filter', params)
}

export const callCollectAdd = (params) => {
  return ajax('/api/collect/add', params)
}

export const callCollectList = (params) => {
  return ajax('/api/collect/list', params)
}

export const callCollectCancel = (params) => {
  return ajax('/api/collect/cancel', params)
}

export const callFirendList = () => {
  return ajax('/api/center/friend/link/list')
}

export const callFeedbackAdd = (params) => {
  return ajax('/api/center/feedback/add', params)
}

export const callEvaHistory = () => {
  return ajax('/api/evaluate/medicinal/history')
}

export const callLog = (params) => {
  return ajax('/api/collect/error', params)
}

export const callRegister = () => {
  return new Promise((resolve, reject) => {
    if (pid) {
      resolve()
    } else {
      AsyncStorage.getItem(PID, (error, text) => {
        if (text === null) {
          ajax('/api/center/login', {unique: uniqueId}).then(({token}) => {
            pid = token
            AsyncStorage.setItem(PID, pid, () => {
              resolve()
            })
          })
        } else {
          pid = text
          resolve()
        }
      })
    }
  })
}
