import React from 'react'
import '../App.css';
import Sidebar from '../components/Sidebar';
import Contents from '../components/Contents';
import Basic from '../evaluation/Basic';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useAuth } from '../contexts/AuthContext';
import { Avatar, Button, Card, Flex, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons'
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
    const { userData, logout, isAuthenticated } = useAuth()

    const handleLogout = async () => {
        console.log(isAuthenticated, userData)
        await logout()
        
    }

   /*  if(!isAuthenticated){
        return (
            <Navigate to='/admin/login' />
        )
    } */

    return (
        <div>
            <div className='dashboard'>
                <Sidebar />
                <div className="dashboard--contents">
                    <Contents />
                    <div className="basic">
                    </div>
                </div>
            </div>
            <Card className="profile-card">
                <Flex vertical gap="small" align="center">
                    <Avatar size={150} icon={<UserOutlined />} className="avatar" />
                    <Typography.Title level={2} strong className='username'>
                        {console.log(userData)}
                    </Typography.Title>
                    <Typography.Title type='secondary' strong>
                        Email: {userData}
                    </Typography.Title>
                    <Button size='large' type='primary' className='profile-btn' onClick={handleLogout}>Logout</Button>
                </Flex>
            </Card>
        </div>
    )
}

export default Dashboard