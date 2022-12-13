import { TypeLoginRequest } from '@/services/interface/authenticate'
import { login } from '@/services/modules/api-app/authenticate'
import request from '@/services/request'
import { userInfoActions } from '@/store/slices/userInfoSlice'
import { store } from '@/store'
import { useState } from 'react'
import { logger } from '@/utils/helper'
import { AlertMessage } from '@/components'

const AUTH_URL_REFRESH_TOKEN = '/refreshToken'

interface LoginRequest {
  loading: boolean
  requestLogin: (values: TypeLoginRequest) => Promise<void>
}

export const isLogin = () => {
  const { userInfo } = store.getState()
  return !!userInfo?.token
}

const AuthenticateService = {
  refreshToken: (inputRefreshToken: string) =>
    request.post(AUTH_URL_REFRESH_TOKEN, {
      refresh_token: inputRefreshToken,
    }),
  logOut: () => {
    store.dispatch(userInfoActions.logOut())
  },
  handlerLogin: (token: Record<string, string>) => {
    store.dispatch(userInfoActions.updateToken(token))
  },
}

export const useLogin = (): LoginRequest => {
  const [loading, setLoading] = useState(false)
  const requestLogin = async (options: TypeLoginRequest) => {
    try {
      setLoading(true)
      const response = await login(options)
      store.dispatch(userInfoActions.getUserInfoRequest(response?.data?.token))
      AuthenticateService.handlerLogin({ ...response.data })
    } catch (e) {
      AlertMessage(String(e))
      logger(e)
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    requestLogin,
  }
}

export default AuthenticateService
