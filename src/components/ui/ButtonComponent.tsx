import { Button } from "antd"
import React from "react"

interface ButtonProps {
  title: string
  textColor: string
  bgColor: string
  isLoading?: boolean
  onClick?: () => void
  icon?: any
  disableIfExists?: boolean
  htmlType?: any
}

const ButtonComponent = ({
  title,
  bgColor,
  textColor,
  onClick,
  isLoading,
  icon,
  htmlType,
  disableIfExists,
}: ButtonProps) => {
  return (
    <Button
      htmlType={htmlType}
      onClick={onClick}
      type="default"
      loading={isLoading}
      className={`py-6 px-12 rounded-full mt-3 text-lg ${textColor} ${bgColor}`}
      icon={icon}
      disabled={disableIfExists}
    >
      {title}
    </Button>
  )
}

export default ButtonComponent
