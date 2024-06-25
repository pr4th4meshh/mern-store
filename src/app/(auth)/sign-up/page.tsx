"use client"
import { Form, Input, Button, message } from 'antd';
import { useSignupMutation } from '@/lib/api-slices/authApiSlice';
import { useDispatch } from 'react-redux';
import { setUser } from '@/lib/slices/userSlice';
import { useRouter } from 'next/navigation';

const Register = () => {
  const [form] = Form.useForm();
  const [signup, { isLoading }] = useSignupMutation();
  const dispatch = useDispatch();
  const router = useRouter()

  const onFinish = async (values) => {
    try {
      const user = await signup(values).unwrap();
      message.success('Signup successful!');
      dispatch(setUser(user));
      form.resetFields();
      router.push("/sign-in")
    } catch (error) {
      message.error(error?.data?.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className='flex justify-center items-center h-[100vh] bg-primary'>
      <div>
        <h1 className='text-2xl text-center pb-10'>Welcome to MERN-Dashboard</h1>
        <Form
          className='border p-10 sm:w-[300px] md:w-[400px] bg-white'
          layout='vertical'
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder='Enter username..' className='w-full' />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input placeholder='Enter email..' className='w-full' />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder='Enter password..' className='w-full' />
          </Form.Item>

          <Form.Item>
            <Button className='w-full bg-secondary' type="primary" htmlType="submit" loading={isLoading}>
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
