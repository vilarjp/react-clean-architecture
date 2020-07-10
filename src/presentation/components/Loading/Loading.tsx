import React from 'react'
import Styles from './Loading-styles.scss'
import Spinner from '../Spinner/Spinner'

const Loading: React.FC = () => {
  return (
    <div data-testid="loading" className={Styles.loadingWrap}>
      <div className={Styles.loading}>
        <span>Aguarde...</span>
        <Spinner />
      </div>
    </div>
  )
}

export default Loading
