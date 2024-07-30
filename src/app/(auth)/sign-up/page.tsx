"use client"
import { Form, Input, Button, message } from "antd"
import { useSignupMutation } from "@/lib/api-slices/authApiSlice"
import { useDispatch } from "react-redux"
import { setUser } from "@/lib/slices/userSlice"
import { useRouter } from "next/navigation"
import Link from "next/link"
import OAuth from "@/app/OAuth"

const Register = () => {
  const [form] = Form.useForm()
  const [signup, { isLoading }] = useSignupMutation()
  const dispatch = useDispatch()
  const router = useRouter()

  const onFinish = async (values: {
    username: string
    email: string
    password: string
  }) => {
    try {
      const user = await signup(values).unwrap()
      message.success("Signup successful!")
      dispatch(setUser(user))
      form.resetFields()
      router.push("/sign-in")
    } catch (error) {
      message.error("Signup failed. Please try again.")
      console.log(error)
    }
  }

  return (
    <div className="flex justify-center items-center h-[100vh] bg-primary">
      <div>
        <h1 className="text-2xl text-center pb-10">Welcome to Re-Inventory</h1>
        <Form
          className="border p-10 sm:w-[300px] md:w-[400px] bg-white"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Enter username.." className="w-full" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input placeholder="Enter email.." className="w-full" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Enter password.." className="w-full" />
          </Form.Item>

          <Form.Item>
            <Button
              className="w-full bg-secondary"
              type="primary"
              htmlType="submit"
              loading={isLoading}
            >
              Register
            </Button>
            <OAuth />
          </Form.Item>
          <span className="flex justify-center">
            Already have an account?{" "}
            <Link className="text-secondary ml-1" href="/sign-in">
              {" "}
              Sign-In
            </Link>{" "}
          </span>
        </Form>
      </div>
    </div>
  )
}

export default Register
