import React, { useEffect, useState } from 'react'
import { Avatar, Button, Card, Form, Input, message } from 'antd'
import { MailOutlined, UserOutlined } from '@ant-design/icons'
import { useForm } from 'antd/es/form/Form'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectConfiguration,
  toggleDrawer,
} from '@/lib/slices/configurationSlice'
import { DRAWER_STATE } from '@/common/states'
import { useSignoutMutation } from '@/lib/api-slices/authApiSlice'
import { clearUser, setUser } from '@/lib/slices/userSlice'
import {
  useEditUserMutation,
  useGetUserDetailsQuery,
} from '@/lib/api-slices/userApiSlice'
import DrawerComponent from './DrawerComponent'
import ButtonComponent from './ButtonComponent'


const ProfileDrawer = ({ userName, userEmail, userID }: any) => {
  const [form] = useForm()
  const dispatch = useDispatch()
  const Configuration = useSelector(selectConfiguration)
  const [signout, { isLoading: signoutLoading }] = useSignoutMutation()
  const [editUser] = useEditUserMutation()
  const { data: userData, refetch } = useGetUserDetailsQuery(userID)

  const toggle = () => {
    dispatch(toggleDrawer(DRAWER_STATE.OPEN_DRAWER_STATE))
  }

  useEffect(() => {
    if (userData) {
      form.setFieldsValue({
        username: userData.username,
        email: userData.email,
      })
    }
  }, [userData, form])

  const handleSignout = async () => {
    try {
      await signout(null)
      dispatch(toggleDrawer(DRAWER_STATE.OPEN_DRAWER_STATE))
      dispatch(clearUser())
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdateUser = async (values: any) => {
    try {
      const updatedUser = await editUser({ ...values, id: userID }).unwrap()
      dispatch(setUser(updatedUser))
      dispatch(toggleDrawer(DRAWER_STATE.OPEN_DRAWER_STATE))
      refetch()
      message.success('User updated successfully!')
    } catch (error) {
      message.error('Unable to update user')
    }
  }

  return (
    <>
      <DrawerComponent
        onClose={toggle}
        open={Configuration[DRAWER_STATE.OPEN_DRAWER_STATE]}
      >
        <Card className="w-full max-w-2xl border-none">
          <div className="flex justify-end mb-6">
            <ButtonComponent
              title="Logout"
              onClick={handleSignout}
              bgColor="bg-red-500"
              textColor="text-white"
              isLoading={signoutLoading}
            />
          </div>

          <div className="flex flex-col items-center">
            <Avatar size={100} icon={<UserOutlined />} />
            <h1 className="text-2xl font-semibold mt-4">{userName}</h1>
            <p className="text-gray-600 mb-1">
              <MailOutlined /> {userEmail}
            </p>
          </div>
          <Form
            layout="vertical"
            className="mt-8"
            initialValues={{
              username: userName,
              email: userEmail,
            }}
            onFinish={handleUpdateUser}
            form={form}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: 'Please input your username!' },
              ]}
            >
              <Input placeholder="Enter your username" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-secondary"
              >
                Save
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </DrawerComponent>
    </>
  )
}

export default ProfileDrawer
