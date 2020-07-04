import faker from 'faker'
import { HttpPostClientSpy } from '@/data/test'
import { AddAccountParams } from '@/domain/usecases'
import { AccountModel } from '@/domain/models'
import { mockAddAccount, mockAccountModel } from '@/domain/test'
import { HttpStatusCode } from '@/data/protocols/http'
import { EmailInUseError, UnexpectedError } from '@/domain/errors'
import { RemoteAddAccount } from './remote-add-account'

type SutTypes = {
  httpPostClientSpy: HttpPostClientSpy<AddAccountParams, AccountModel>
  sut: RemoteAddAccount
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<
    AddAccountParams,
    AccountModel
  >()
  const sut = new RemoteAddAccount(url, httpPostClientSpy)
  return {
    sut,
    httpPostClientSpy
  }
}

describe('RemoteAddAccount', () => {
  it('shoud call HttpPostClient with correct URL', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)
    await sut.add(mockAddAccount())
    expect(httpPostClientSpy.url).toBe(url)
  })

  it('shoud call HttpPostClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const authenticationParams = mockAddAccount()
    await sut.add(authenticationParams)
    expect(httpPostClientSpy.body).toEqual(authenticationParams)
  })

  it('shoud throw EmailInUseError if HttpPostClient returns 403', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    }
    const promise = sut.add(mockAddAccount())
    await expect(promise).rejects.toThrow(new EmailInUseError())
  })

  it('shoud throw UnexpectedError if HttpPostClient returns error 40x', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.add(mockAddAccount())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('shoud throw UnexpectedError if HttpPostClient returns error 500', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.add(mockAddAccount())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('shoud return an AccountModel if HttpPostClient returns 200', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const httpResult = mockAccountModel()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }
    const account = await sut.add(mockAddAccount())
    expect(account).toEqual(httpResult)
  })
})
