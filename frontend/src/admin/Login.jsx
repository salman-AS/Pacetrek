import React from 'react'
import '../styles/admin.css'
import { Card, Flex, Typography, Form, Input, Button, Spin, Alert } from 'antd'
import { Link } from 'react-router-dom'

import registerImage from '../assets/placeholder2.jpg'
import useLogin from '../hooks/useLogin'

const Login = () => {
    const { loading, error, loginUser } = useLogin()
    const handleLogin = async (values) => {
        await loginUser(values)
    }

    return (
        <Card className='form-container'>
            <Flex gap='large'>

                <Flex flex={1}>
                    <img src={registerImage} alt="" className='register-img' />
                </Flex>

                <Flex vertical flex={1} justify='center' >

                    <Typography.Title level={3} strong className='title'>
                        Sign In
                    </Typography.Title>
                    <Typography.Text type='secondary' strong className='slogan'>
                        Sign in to access your account!
                    </Typography.Text>
                    <Form layout='vertical' onFinish={handleLogin} autoComplete='off'>
                        <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter your Email address' }, { type: 'email', message: 'The input is not valid email' }]}>
                            <Input size='large' placeholder='Enter your email address' />
                        </Form.Item>
                        <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter your password' }]}>
                            <Input.Password size='large' placeholder='Enter your password' />
                        </Form.Item>
                        <Form.Item>
                            <Button type={`${loading ? '' : 'primary'}`} htmlType='submit' size='large' className='btn' >{loading ? <Spin /> : 'Log In'}</Button>
                        </Form.Item>
                        {error && <Alert description={error} type='error' showIcon closable className='alert' />}
                        <Link to='/admin/signup'>
                            <Form.Item>
                                <Button size='large' className='btn' >Create a new account</Button>
                            </Form.Item>
                        </Link>
                    </Form>
                </Flex>
            </Flex>

        </Card>
    )
}

export default Login