import { AccountModel } from '@/domain/models'

export interface SaveCurrentAccount {
  save: (account: AccountModel) => Promise<void>
}
