import { SetStorage } from '@/data/protocols/cache/set-storage'

export class SetStorageMock implements SetStorage {
  key: string

  value: any

  set(key: string, value: any): Promise<void> {
    this.key = key
    this.value = value
    return Promise.resolve()
  }
}
