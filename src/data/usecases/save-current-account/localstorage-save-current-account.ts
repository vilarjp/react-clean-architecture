import { SaveCurrentAccount } from '@/domain/usecases/save-current-account'
import { SetStorage } from '@/data/protocols/cache/set-storage'
import { UnexpectedError } from '@/domain/errors'
import { AccountModel } from '@/domain/models'

export class LocalStorageSaveCurrentAccount implements SaveCurrentAccount {
  constructor(private readonly setStorage: SetStorage) {}

  async save(account: AccountModel): Promise<void> {
    if (!account?.accessToken || !account?.name) throw new UnexpectedError()
    await this.setStorage.set('account', JSON.stringify(account))
  }
}
