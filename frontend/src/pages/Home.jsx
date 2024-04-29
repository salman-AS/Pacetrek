import { Button, Card, Flex, Typography } from "antd";
import React from "react"
import { useNavigate } from "react-router-dom";
import '../index.css'

const Home = () => {
    const navigate = useNavigate();

    return (
        <Flex gap='large' align="center" justify="center" className="home-body">
            <Card className="home-card">
                <Flex vertical gap='large' align="center">
                    <Typography.Title level={2} style={{ margin: 0 }}>
                        Admin
                    </Typography.Title>
                    <p>Go to admin login</p>
                    <Button size="large" type="primary" className="home-button" onClick={() => navigate('/admin/login')}>Login</Button>
                </Flex>
            </Card>
            <Card className="home-card">
                <Flex vertical gap='large' align="center">
                    <Typography.Title level={2} style={{ margin: 0 }}>
                        Student
                    </Typography.Title>
                    <p>Go to student login</p>
                    <Button size="large" type="primary" className="home-button" onClick={() => navigate('/student/login')}>Login</Button>
                </Flex>
            </Card>
        </Flex>
    )

}

export default Home