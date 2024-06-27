import Link from 'next/link'
import { ExclamationCircleOutlined } from '@ant-design/icons'

export default function NotFound() {
  return (
    <div
      style={{ height: 'calc(100vh - 160px)' }}
      className="flex justify-center items-center flex-col"
    >
      <ExclamationCircleOutlined className="text-5xl text-red-500 pb-5" />
      <h2 className="text-3xl">Not Found</h2>
      <p className="text-3xl">Could not find requested resource</p>
      <Link href="/" className="text-xl text-secondary underline">
        Click Here to return Home
      </Link>
    </div>
  )
}
