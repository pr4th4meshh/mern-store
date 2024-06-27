import React from 'react'
import { LoadingOutlined } from '@ant-design/icons'

const loading = () => {
  return (
    <div
      style={{ height: 'calc(100vh - 160px)' }}
      className="flex flex-col justify-center items-center"
    >
      <LoadingOutlined className=" animate-spin text-5xl text-secondary " />
      <h1 className="text-3xl pt-6">Loading..</h1>
    </div>
  )
}

export default loading
