import faker from 'faker'
import { mockGetRequest, GetStorageSpy, HttpGetClientSpy } from '@/data/test'
import { HttpGetParams } from '@/data/protocols/http'
import { mockAccountModel } from '@/domain/test'
import { AuthrorizeHttpGetClientDecorator } from './authorize-http-get-client-decorator'

type SutTypes = {
  sut: AuthrorizeHttpGetClientDecorator
  getStorageSpy: GetStorageSpy
  httpGetClientSpy: HttpGetClientSpy
}

const makeSut = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy()
  const httpGetClientSpy = new HttpGetClientSpy()
  const sut = new AuthrorizeHttpGetClientDecorator(
    getStorageSpy,
    httpGetClientSpy
  )
  return { sut, getStorageSpy, httpGetClientSpy }
}

describe('AuthrorizeHttpGetClientDecorator', () => {
  it('should call GetStorage with correct value', async () => {
    const { sut, getStorageSpy } = makeSut()
    await sut.get(mockGetRequest())
    expect(getStorageSpy.key).toBe('account')
  })

  it('should not add headers if GetStorage is invalid', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    const httpRequest: HttpGetParams = {
      url: faker.internet.url(),
      headers: {
        token: faker.random.uuid()
      }
    }
    await sut.get(httpRequest)
    expect(httpGetClientSpy.url).toBe(httpRequest.url)
    expect(httpGetClientSpy.headers).toBe(httpRequest.headers)
  })

  it('should add headers to HttpGetClient', async () => {
    const { sut, getStorageSpy, httpGetClientSpy } = makeSut()
    getStorageSpy.value = mockAccountModel()
    const httpRequest: HttpGetParams = {
      url: faker.internet.url()
    }
    await sut.get(httpRequest)
    expect(httpGetClientSpy.url).toBe(httpRequest.url)
    expect(httpGetClientSpy.headers).toEqual({
      'x-access-token': getStorageSpy.value.accessToken
    })
  })

  it('should merge headers into HttpGetClient if previous headers exists', async () => {
    const { sut, getStorageSpy, httpGetClientSpy } = makeSut()
    getStorageSpy.value = mockAccountModel()
    const field = faker.random.words()
    const httpRequest: HttpGetParams = {
      url: faker.internet.url(),
      headers: {
        field
      }
    }
    await sut.get(httpRequest)
    expect(httpGetClientSpy.url).toBe(httpRequest.url)
    expect(httpGetClientSpy.headers).toEqual({
      field,
      'x-access-token': getStorageSpy.value.accessToken
    })
  })

  it('should return same result as HttpGetClient', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    const httpReponse = await sut.get(mockGetRequest())
    expect(httpReponse).toEqual(httpGetClientSpy.response)
  })
})
