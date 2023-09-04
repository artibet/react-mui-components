import './loader.css'
import React from 'react'
import NProgress from 'nprogress'

export const useLoader = () => {

  const [loader, setLoader] = React.useState(false)

  const startLoader = () => {
    setLoader(true)
    NProgress.start()
  }

  const stopLoader = () => {
    setLoader(false)
    NProgress.done()
  }

  return { loader, startLoader, stopLoader }
}