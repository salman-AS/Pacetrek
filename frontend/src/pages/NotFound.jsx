import React from "react"
import { Flex, Typography } from "antd"

const nf = {
    height: '100vh'
 }
 

const NotFound = () => {
    return (
        <Flex align="center" justify="center" vertical style={nf}>
            <Typography.Title>Error 404</Typography.Title>
            <Typography.Title>Page Not Found</Typography.Title>
        </Flex>
    )
}

export default NotFound