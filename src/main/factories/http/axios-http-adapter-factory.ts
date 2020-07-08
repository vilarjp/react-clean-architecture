import { AxiosHttpAdapter } from '@/infra/http/axios-http-adapter/axios-http-adapter'

export const makeAxiosHttpAdapter = (): AxiosHttpAdapter => {
  return new AxiosHttpAdapter()
}
