import { message } from 'antd'

export const logout = () => ({ type: 'AUTH_LOGOUT' })

export const login = values => dispatch => {
  dispatch({ type: 'START_LOAD_AUTH' })
  fetch('/api/auth', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(values)
  })
    .then(res => res.json())
    .then(data => {
      setTimeout(() => {
        if (!data.error) {
          dispatch({ type: 'AUTH_LOGIN', payload: data.message })
        } else {
          console.log(data)
          message.error('Authorisation Error! Сheck login or password and try again')
          dispatch({ type: 'END_LOAD_AUTH' })
        }
      }, 500)
    })
    .catch(err => {
      console.log(err)
      message.error('Authorisation Error! Сheck login or password and try again')
      dispatch({ type: 'END_LOAD_AUTH' })
    })
}

//workers
export const fetchWorkers = (page, token) => dispatch => {
  dispatch({ type: 'START_LOAD_WORKERS' })
  fetch('/api/worker/view', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'vito-auth': `Vito ${token}`
    },
    body: JSON.stringify({ page: page })
  })
    .then(res => res.json())
    .then(data => {
      if (!data.error) setTimeout(() => dispatch({
        type: 'SUCCESS_LOAD_WORKERS',
        payload: {
          list: data.result,
          count: data.count,
          page: data.page
        }
      }), 500)
      else if (data.message === 'Token is not valid' || data.message === 'Auth bearer error' || data.message === 'Auth token is not supplied') {
        console.log(data)
        dispatch({ type: 'AUTH_LOGOUT' })
        message.error('Auth Error!')
        dispatch({ type: 'FAILED_LOAD_WORKERS' })
      } else {
        console.log(data)
        message.error('Load Workers data Error!')
        dispatch({ type: 'FAILED_LOAD_WORKERS' })
      }
    })
    .catch(err => {
      console.log(err)
      message.error('Create Worker data Error!')
      dispatch({ type: 'FAILED_LOAD_WORKERS' })
    })
}
//worker
export const fetchWorker = (_id, token) => dispatch => {
  dispatch({ type: 'START_LOAD_WORKER' })
  fetch(`/api/worker/${_id}`, {
    headers: {
      'vito-auth': `Vito ${token}`
    },
  })
    .then(res => res.json())
    .then(data => {
      if (!data.error) setTimeout(() => dispatch({
        type: 'SUCCESS_LOAD_WORKER',
        payload: data
      }), 500)
      else if (data.message === 'Token is not valid' || data.message === 'Auth bearer error' || data.message === 'Auth token is not supplied') {
        dispatch({ type: 'AUTH_LOGOUT' })
        console.log(data)
        message.error('Auth Error!')
        dispatch({ type: 'FAILED_LOAD_WORKER' })
      } else {
        console.log(data)
        message.error('Load Worker Data Error!')
        dispatch({ type: 'FAILED_LOAD_WORKER' })
      }
    })
    .catch(err => {
      console.log(err)
      message.error('Load Worker Data Error!')
      dispatch({ type: 'FAILED_LOAD_WORKER' })
    })
}
export const updateWorker = (_id, data, token) => dispatch => {
  dispatch({ type: 'START_LOAD_WORKER' })
  fetch(`/api/worker/${_id}`, {
    method: 'put',
    headers: {
      'content-type': 'application/json',
      'vito-auth': `Vito ${token}`
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(data => {
      if (!data.error) setTimeout(() => {
        dispatch({
          type: 'SUCCESS_LOAD_WORKER',
          payload: data.value
        })
        message.success('Success Update!')
      }, 500)
      else if (data.message === 'Token is not valid' || data.message === 'Auth bearer error' || data.message === 'Auth token is not supplied') {
        dispatch({ type: 'AUTH_LOGOUT' })
        console.log(data)
        message.error('Auth Error!')
        dispatch({ type: 'FAILED_UPDATE' })
      } else {
        console.log(data)
        message.error('Error Update!')
        dispatch({ type: 'FAILED_UPDATE' })
      }
    })
    .catch(err => {
      console.log(err)
      message.error('Error Update!')
      dispatch({ type: 'FAILED_UPDATE' })
    })
}
export const deleteWorker = (_id, history, token) => dispatch => {
  dispatch({ type: 'START_LOAD_WORKER' })
  fetch(`/api/worker/${_id}`, {
    method: 'delete',
    headers: {
      'content-type': 'application/json',
      'vito-auth': `Vito ${token}`
    }
  })
    .then(res => res.json())
    .then(data => {
      if (!data.error) setTimeout(() => {
        dispatch({ type: 'DELETE_WORKER' })
        history.push('/workers/')
        message.success('Success Delete!')
      }, 500)
      else if (data.message === 'Token is not valid' || data.message === 'Auth bearer error' || data.message === 'Auth token is not supplied') {
        dispatch({ type: 'AUTH_LOGOUT' })
        console.log(data)
        message.error('Auth Error!')
        dispatch({ type: 'FAILED_DELETE' })
      } else {
        console.log(data)
        message.error('Error Delete!')
        dispatch({ type: 'FAILED_DELETE' })
      }
    })
    .catch(err => {
      console.log(err)
      message.error('Error Delete!')
      dispatch({ type: 'FAILED_DELETE' })
    })
}
export const WorkerChangeName = e => ({ type: 'CHANGE_NAME', payload: e.target.value })
export const WorkerChangeAge = value => ({ type: 'CHANGE_AGE', payload: value })
export const WorkerChangePhones = value => ({ type: 'CHANGE_PHONES', payload: value })
export const WorkerChangeEmails = value => ({ type: 'CHANGE_EMAILS', payload: value })
export const WorkerChangeDepartment = value => ({ type: 'CHANGE_DEPARTMENT', payload: value })
//departments
export const fetchDepartments = (token) => (dispatch) => {
  dispatch({ type: 'START_LOAD_DEPARTMENTS' })
  fetch('/api/department/', {
    headers: {
      'vito-auth': `Vito ${token}`
    },
  })
    .then(res => res.json())
    .then(data => {
      if (!data.error) setTimeout(() => dispatch({
        type: 'SUCCESS_LOAD_DEPARTMENTS',
        payload: data
      }), 500)
      else if (data.message === 'Token is not valid' || data.message === 'Auth bearer error' || data.message === 'Auth token is not supplied') {
        dispatch({ type: 'AUTH_LOGOUT' })
        console.log(data)
        message.error('Auth Error!')
        dispatch({ type: 'FAILED_LOAD_DEPARTMENTS' })
      } else {
        console.log(data)
        message.error('Load Departments Data Error!')
        dispatch({ type: 'FAILED_LOAD_DEPARTMENTS' })
      }
    })
    .catch(err => {
      console.log(err)
      message.error('Load Departments Data Error!')
      dispatch({ type: 'FAILED_LOAD_DEPARTMENTS' })
    })
}
//add
export const openAdd = () => dispatch => {
  dispatch({ type: 'OPEN_ADD_START' })
  setTimeout(() => dispatch({ type: 'OPEN_ADD_END' }), 200)
}
export const saveAdd = (data, history, token) => dispatch => {
  dispatch({ type: 'START_LOAD_WORKER' })
  fetch('/api/worker/', {
    method: 'post',
    headers: {
      'content-type': 'application/json',
      'vito-auth': `Vito ${token}`
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(data => {
      if (!data.error) setTimeout(() => {
        dispatch({
          type: 'SUCCESS_LOAD_WORKER',
          payload: data.ops[0]
        })
        history.push(`/workers/${data.ops[0]._id}`)
        message.success('Success Create!')
      }, 500)
      else if (data.message === 'Token is not valid' || data.message === 'Auth bearer error' || data.message === 'Auth token is not supplied') {
        dispatch({ type: 'AUTH_LOGOUT' })
        console.log(data)
        message.error('Auth Error!')
        dispatch({ type: 'FAILED_CREATE' })
      } else {
        console.log(data)
        message.error('Create Worker Error!')
        dispatch({ type: 'FAILED_CREATE' })
      }
    })
    .catch(err => {
      console.log(data)
      message.error('Create Worker Error!')
      dispatch({ type: 'FAILED_CREATE' })
    })
}