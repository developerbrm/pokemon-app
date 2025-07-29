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
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setShowAdditionalInfo(true)
    }, 8 * 1000)

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
        <div>
          <div
            className={`fixed inset-0 transition-all ${hideLoader ? 'scale-50 opacity-0' : ''}`}
          >
            <CommonLoader />
          </div>

          <div className="fixed inset-0 grid place-content-center">
            <p
              className={`${showAdditionalInfo ? '' : 'opacity-0'} mt-[250px] px-10 text-center text-lg font-medium text-amber-400 transition-all duration-1000 lg:text-xl`}
            >
              Looks like the free server hosting is having a cold start !
            </p>
          </div>
        </div>
      )}

      <div className={`${isLoading ? 'hidden' : ''}`}>{children}</div>
    </>
  )
}

export default WithLoader
