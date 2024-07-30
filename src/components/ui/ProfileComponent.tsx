import React, { useEffect, useRef, useState } from "react"
import { Avatar, Button, Card, Form, Input, message } from "antd"
import { MailOutlined } from "@ant-design/icons"
import { useForm } from "antd/es/form/Form"
import { useDispatch, useSelector } from "react-redux"
import {
  selectConfiguration,
  toggleDrawer,
} from "@/lib/slices/configurationSlice"
import { DRAWER_STATE } from "@/common/states"
import { useSignoutMutation } from "@/lib/api-slices/authApiSlice"
import { clearUser, setUser } from "@/lib/slices/userSlice"
import {
  useEditUserMutation,
  useGetUserDetailsQuery,
} from "@/lib/api-slices/userApiSlice"
import DrawerComponent from "./DrawerComponent"
import ButtonComponent from "./ButtonComponent"
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage"
import { app } from "@/app/firebase"

interface ProfileDrawerProps {
  userName: string
  userEmail: string
  userPhoto: string
  userID: string
}

const ProfileDrawer = ({
  userName,
  userEmail,
  userPhoto,
  userID,
}: ProfileDrawerProps) => {
  const [file, setFile] = useState<null | any>(null)
  const [fileUploadError, setFileUploadError] = useState(false)
  const [filePercentage, setFilePercentage] = useState(0)
  const [avatarUrl, setAvatarUrl] = useState(userPhoto) // Initializing with the current user photo
  const [form] = useForm()
  const dispatch = useDispatch()
  const Configuration = useSelector(selectConfiguration)
  const [signout, { isLoading: signoutLoading }] = useSignoutMutation()
  const [editUser] = useEditUserMutation()
  const { data: userData, refetch } = useGetUserDetailsQuery(userID)
  const fileRef = useRef<any | null>(null)

  const toggle = () => {
    dispatch(toggleDrawer(DRAWER_STATE.OPEN_DRAWER_STATE))
  }

  const handleFileUpload = (file: any) => {
    const storage = getStorage(app)
    const fileName = new Date().getTime() + file.name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setFilePercentage(Math.round(progress))
      },
      (error) => {
        setFileUploadError(true)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setAvatarUrl(downloadURL) // Update avatar URL state
        })
      },
    )
  }

  useEffect(() => {
    if (file) {
      handleFileUpload(file)
    }
  }, [file])

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

  const handleUpdateUser = async (values: string[]) => {
    try {
      const updatedUser = await editUser({
        ...values,
        id: userID,
        avatar: avatarUrl,
      }).unwrap()
      dispatch(setUser(updatedUser))
      dispatch(toggleDrawer(DRAWER_STATE.OPEN_DRAWER_STATE))
      refetch()
      message.success("User updated successfully!")
    } catch (error) {
      message.error("Unable to update user")
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
            <Avatar
              alt="pfp image"
              size={100}
              src={avatarUrl} // Use avatarUrl for the Avatar component
            />
            <Button onClick={() => fileRef.current.click()}>Edit Avatar</Button>
            <input
              onChange={(e) => {
                const files = e.target.files
                if (files && files.length > 0) {
                  setFile(files[0])
                }
              }}
              type="file"
              ref={fileRef}
              style={{ display: "none" }}
              accept="image/*"
            />
            <p className="self-center">
              {fileUploadError ? (
                <span className="text-red-500">
                  Error while uploading image (image should be of size less than
                  2mb)
                </span>
              ) : filePercentage > 0 && filePercentage < 100 ? (
                <span className="text-slate-500">
                  Uploading {filePercentage}%
                </span>
              ) : filePercentage === 100 ? (
                <span className="text-green-500">
                  Click save to edit image.
                </span>
              ) : (
                ""
              )}
            </p>
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
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input placeholder="Enter your username" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
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
