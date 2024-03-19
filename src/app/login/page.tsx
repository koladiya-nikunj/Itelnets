"use client"
import Link from 'next/link';
import { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';

const Register = () => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleMobileNumberChange = (value: string) => {
    return value.replace(/\D/g, '');
  };

  const onFinish = async (values: any) => {
    try {
      setIsSubmitting(true);
      // Simulate form submission delay (remove this in actual implementation)
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Received values:', values);
      form.resetFields();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
          rules={[{ required: true, message: 'Please enter your password!' }]}
        >
          <Input
            prefix={<LockOutlined className='site-form-item-icon' />}
            type='password'
            placeholder='Password'
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
           Not registered ?{' '}
            <Link className=' text-blue-600 font-bold pl-1' href='/register'>
              Register
            </Link>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
