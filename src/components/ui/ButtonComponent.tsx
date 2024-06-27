import { Button } from 'antd'
import React from 'react'

interface ButtonProps {
  title: string
  textColor: string
  bgColor: string
}

const ButtonComponent = ({ title, bgColor, textColor }: ButtonProps) => {
  return (
    <Button
      type="text"
      className={`py-6 px-12 rounded-full ${textColor} ${bgColor}`}
    >
      {title}
    </Button>
  )
}

export default ButtonComponent
