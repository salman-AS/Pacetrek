import React from 'react'
import '../styles/admin.css'
import { Card, Flex, Typography, Form, Input, Button, Spin, Alert } from 'antd'
import { Link } from 'react-router-dom'

import registerImage from '../assets/placeholder1.jpg'
import useSignup from '../hooks/useSignup'

const Register = () => {
    const { loading, error, registerUser } = useSignup()
    const handleRegister = (values) => {
        registerUser(values)
    }

    return (
        <Card className='form-container'>
            <Flex gap='large'>

                <Flex vertical flex={1} justify='center' >

                    <Typography.Title level={3} strong className='title'>
                        Create an admin account
                    </Typography.Title>
                    <Typography.Text type='secondary' strong className='slogan'>
                        Join for admin access!
                    </Typography.Text>
                    <Form layout='vertical' onFinish={handleRegister} autoComplete='off'>
                        <Form.Item label="Full Name" name="name" rules={[{ required: true, message: 'Please enter your full name' }]}>
                            <Input size='large' placeholder='Enter your full name' />
                        </Form.Item>
                        <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter your Email address' }, { type: 'email', message: 'The input is not valid email' }]}>
                            <Input size='large' placeholder='Enter your email address' />
                        </Form.Item>
                        <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter your password' }]}>
                            <Input.Password size='large' placeholder='Enter your password' />
                        </Form.Item>
                        <Form.Item label="Confirm Password" name="passwordConfirm" rules={[{ required: true, message: 'Please enter your password' }]}>
                            <Input.Password size='large' placeholder='Enter your password again' />
                        </Form.Item>

                        {error && <Alert description={error} type='error' showIcon closable className='alert' />}

                        <Form.Item>
                            <Button type={`${loading ? '' : 'primary'}`} htmlType='submit' size='large' className='btn' >{loading ? <Spin /> : 'Create Account'}</Button>
                        </Form.Item>
                        <Link to='/admin/login'>
                            <Form.Item>
                                <Button size='large' className='btn' >Sign In</Button>
                            </Form.Item>
                        </Link>
                    </Form>
                </Flex>

                <Flex flex={1}>
                    <img src={registerImage} alt="" className='register-img' />
                </Flex>
            </Flex>

        </Card>
    )
}

export default Register