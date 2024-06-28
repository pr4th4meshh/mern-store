import { Button } from 'antd'
import React from 'react'

interface ButtonProps {
  title: string
  textColor: string
  bgColor: string
  isLoading?: boolean
  onClick?: () => void
}

const ButtonComponent = ({
  title,
  bgColor,
  textColor,
  onClick,
  isLoading,
}: ButtonProps) => {
  return (
    <Button
      onClick={onClick}
      type="default"
      loading={isLoading}
      className={`py-6 px-12 rounded-full mt-3 ${textColor} ${bgColor}`}
    >
      {title}
    </Button>
  )
}

export default ButtonComponent
