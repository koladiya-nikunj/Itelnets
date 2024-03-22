"use client"
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { MailOutlined, LockOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import axios from 'axios'


const Register = () => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 500); // Delay rendering for 2 seconds

    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, []);

  const onFinish = async (values: any) => {
    try {
      setIsSubmitting(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      const response = await axios.post('http://localhost:5000/login', values);
      if (response.data.message === 'Login successful') {
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
          description: response.data.message,
          duration: 2, // Duration in seconds
          icon: <CloseCircleOutlined style={{ color: '#ff4d4f' }} />,
        });
      }
      form.resetFields();
    } catch (error) {
      console.error('Error submitting form:', error);
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
        <h1 className='font-bold text-3xl p-2 text-center'>Enter your email to</h1>
        <h1 className='font-bold text-3xl p-2 mb-4 text-center'>Reset Password</h1>
        <Form.Item
          name='email'
          rules={[{ required: true, type: 'email', message: 'Please enter your email!' }]}
        >
          <Input
            prefix={<MailOutlined className='site-form-item-icon' />}
            placeholder='Email'
          />
        </Form.Item>
        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            loading={isSubmitting}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded focus:outline-none focus:shadow-outline w-full'
          >
            Reset
          </Button>
          <div className='text-center mt-4'>
           Back to login ?{' '}
            <Link className=' text-blue-600 font-bold pl-1' href='/login'>
              Click
            </Link>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
