import React, { useContext, memo } from 'react'
import FormContext from '@/presentation/contexts/Form/FormContext'

const Modal: React.FC = () => {
  const { state } = useContext(FormContext)

  return (
    <div data-testid="modal">
      <p data-testid="modal-text">{state.error}</p>
    </div>
  )
}

export default memo(Modal)
