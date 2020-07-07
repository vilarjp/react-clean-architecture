import { SaveCurrentAccount } from '@/domain/usecases/save-current-account'
import { AccountModel } from '@/domain/models'

export class SaveCurrentAccountMock implements SaveCurrentAccount {
  account: AccountModel

  async save(account: AccountModel): Promise<void> {
    this.account = account
    return Promise.resolve()
  }
}
