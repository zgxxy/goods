import { login, loginOut } from '@/api/user'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    userInfo: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
    sessionStorage.token = token
  },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
    sessionStorage.setItem('userInfo', userInfo)
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // 登陆
  login({ commit }, userInfo) {
    const { email, loginPwd } = userInfo
    return new Promise((resolve, reject) => {
      login({ email: email.trim(), loginPwd: loginPwd }).then(response => {
        resolve(response)
        // commit('SET_TOKEN', res.xaccessToken)
        sessionStorage.setItem('token', response.xaccessToken)
        sessionStorage.setItem('uuid', response.uuid)
        sessionStorage.setItem('id', response.id)
        sessionStorage.setItem('loginName', response.loginName)
        // localStorage.setItem('token', response.xaccessToken)
        commit('SET_USERINFO',response)
        console.log(this.state)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 登出
  loginOut({ commit, state }) {
    // let userID = state.userInfo.id
    let userID = sessionStorage.getItem('id')
    return new Promise((resolve, reject) => {
      loginOut({userID:userID}).then(res => {
        // removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve(res)
        // this.$router.push('/login')
      }).catch(error => {
        commit('RESET_STATE')
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      // removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

