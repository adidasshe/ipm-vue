import request from '@/utils/request'
// import store from '@/store'
import { getToken } from '@/utils/auth'

const token = getToken()

// const token = store.state.token
// console.log(token)

export function login(data) {
  return request({
    url: 'auth/',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: 'roles/',
    method: 'get',
    params: { token },
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function logout(token) {
  return request({
    url: 'logout/',
    method: 'post',
    params: { token }
  })
}

export function userList(token) {
  return request({
    url: 'user/',
    method: 'get',
    params: { token }
  })
}

export function addUser(data) {
  return request({
    url: 'user/',
    method: 'post',
    params: { token },
    data
  })
}

export function updateUser(data) {
  return request({
    url: 'user/',
    method: 'put',
    params: { token },
    data
  })
}
export function deleteUser(id) {
  return request({
    url: 'user/',
    method: 'delete',
    params: { token },
    data: { id },
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function getUser(name) {
  return request({
    url: 'getUser/',
    method: 'get',
    params: { token, name }
  })
}

export function changePass(data) {
  return request({
    url: 'changePass/',
    method: 'put',
    params: { token },
    data
  })
}
