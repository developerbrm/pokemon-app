import { useEffect, useState } from 'react'
import CommonLoader from './CommonLoader'

interface Props {
  isLoading: boolean
  children: React.ReactNode
}

const WithLoader = (props: Props) => {
  const { isLoading, children } = props
  const [hideLoader, setHideLoader] = useState(false)
  const [removeLoader, setRemoveLoader] = useState(false)

  useEffect(() => {
    if (isLoading) return

    setTimeout(() => {
      setHideLoader(true)
    }, 10)

    setTimeout(() => {
      setRemoveLoader(true)
    }, 1000)
  }, [isLoading])

  return (
    <>
      {removeLoader ? null : (
        <div
          className={`fixed inset-0 bg-white transition-all ${hideLoader ? 'scale-50 opacity-0' : ''}`}
        >
          <CommonLoader />
        </div>
      )}

      <div className={`${isLoading ? 'hidden' : ''}`}>{children}</div>
    </>
  )
}

export default WithLoader
