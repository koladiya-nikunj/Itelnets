"use client"
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Form, Input, Button, notification } from 'antd';
import { MailOutlined, LockOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import axios from 'axios'
import { signIn } from 'next-auth/react';
import Image from 'next/image';

const Register = () => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 500); 
    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, []);

  const onFinish = async (values: any) => {
    try {
      setIsSubmitting(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      const response = await axios.post('http://localhost:5000/login', values);
      if (response.status === 201) {
        notification.success({
          message: 'Success',
          description: response.data.message,
          duration: 2, // Duration in seconds
          icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
        });
        setTimeout(() => {
          window.location.href = '/profile';
        }, 1000);
      } else {
        notification.error({
          message: 'Error',
          description: response.data.message || 'An error occurred',
          duration: 2, // Duration in seconds
          icon: <CloseCircleOutlined style={{ color: '#ff4d4f' }} />,
        });
      }
      form.resetFields();
    } catch (error:any) {
      console.error('Error submitting form:', error);
      notification.error({
        message: 'Error',
        description: error.response?.data.message || 'An error occurred',
        duration: 2, // Duration in seconds
        icon: <CloseCircleOutlined style={{ color: '#ff4d4f' }} />,
      });
      form.resetFields();
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isMounted) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-300">
        <div className="w-40 h-40 border-4 border-gray-200 border-t-blue-800 rounded-full animate-spin border-dashed"></div>
      </div>
    );
  }


  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-300'>
      <Form
        form={form}
        name='register'
        onFinish={onFinish}
        className='bg-white shadow-md rounded-lg px-10 pt-8 pb-8 mb-4 w-full max-w-md'
      >
        <h1 className='font-bold text-3xl p-2 mb-4 text-center'>Login</h1>
        <Form.Item
          name='email'
          rules={[{ required: true, type: 'email', message: 'Please enter your email!' }]}
        >
          <Input
            prefix={<MailOutlined className='site-form-item-icon' />}
            placeholder='Email'
          />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[
            { required: true, message: 'Please enter your password!' },
            {
              pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
              message: 'Password must be at least 8 characters with A-Z, a-z, 0-9, and special characters @$!%*#?&',
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className='site-form-item-icon' />}
            placeholder='Password'
            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            loading={isSubmitting}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded focus:outline-none focus:shadow-outline w-full'
          >
            Login
          </Button>
          <div className='text-center mt-4'>
            Don't have an account ?{' '}
            <Link className=' text-blue-600 font-bold pl-1' href='/register'>
              Register
            </Link>
          </div>
          <div className='text-center mt-2'>
           Reset password ?{' '}
            <Link className=' text-blue-600 font-bold pl-1' href='/resetpassword'>
              Click
            </Link>
          </div>
          <div className='text-center mt-4'>
            <button className="" type="button">
              <span onClick={() => signIn("google")} className="flex bg-gray-100 hover:bg-gray-200 p-2 px-8 rounded-lg">
                <Image className='mx-2 mr-8' src="/google.png" alt="Google Logo" height={24} width={24} />
                <span className="mr-5 font-semibold"><a className='hover:text-black'>Continue with Google</a></span>
              </span>
            </button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
