import api from './api'
let allFormIds = []
let flagFormId = false

export function collectIDS(ids) {
  allFormIds.push({formId: ids})
  console.log('收集 formId ---- ', allFormIds)
  if (allFormIds && allFormIds.length >= 10) {
    let data = JSON.parse(JSON.stringify(allFormIds))
    allFormIds = []
    submitIDS(data)
  }
}
export function submitIDS(data) {
  if (flagFormId) return
  flagFormId = true
  if (data.length > 0) {
    let send = data.map(item => item.formId)
    let formIds = send.join(',')
    api.saveUserFormId({formIds}).then(res => {
      flagFormId = false
      data = null
      console.log('success')
    }).catch(error => {
      flagFormId = false
      data = null
      console.log(error, 'fail-id')
    })
  }
}
