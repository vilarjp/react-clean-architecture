import React from 'react'
import { SignUp } from '@/presentation/pages'
import { makeRemoteAddAccount } from '@/main/factories/usecases/add-account/remote-add-account-factory'
import { makeLocalStorageSaveCurrentAccount } from '@/main/factories/usecases/save-current-account/localstorage-save-current-account-factory'
import { makeSignUpValidation } from './signup-validation-factory'

export const makeSignUp: React.FC = () => {
  return (
    <SignUp
      validation={makeSignUpValidation()}
      addAccount={makeRemoteAddAccount()}
      saveCurrentAccount={makeLocalStorageSaveCurrentAccount()}
    />
  )
}
