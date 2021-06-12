import React from "react";
import {useDispatch} from "react-redux";

import {startRegister} from "../../actions/auth";

import {Form, Input, Button, Checkbox, Row, Col, Layout} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";

import "./login.css";
import "animate.css";
import {Link} from "react-router-dom";

export const RegisterScreen = () => {
    const {Header, Footer, Sider, Content} = Layout;
    const dispatch = useDispatch();

    const onFinish = (values) => {
        console.log("Success:", values);
        const {username, password} = values;
        // dispatch(startLogin(username, password));
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <>
            <Layout>
                <Header>MyCalendar</Header>
                <Content>
                    <Row type="flex" justify="space-around" align="middle">
                        <Col xs={2} sm={4} md={3} lg={8} xl={7}></Col>
                        <Col xs={20} sm={16} md={18} lg={8} xl={10}>
                            <Form
                                name="formRegister"
                                initialValues={{
                                    remember: true
                                }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                className="login-form animate__animated animate__fadeIn"
                            >
                                <Form.Item
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Ingrese el email"
                                        }
                                    ]}
                                >
                                    <Input
                                        prefix={
                                            <UserOutlined className="site-form-item-icon" />
                                        }
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="password1"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Ingrese la contraseña"
                                        }
                                    ]}
                                >
                                    <Input.Password
                                        prefix={
                                            <LockOutlined className="site-form-item-icon" />
                                        }
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="password2"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Repita la contraseña"
                                        }
                                    ]}
                                >
                                    <Input.Password
                                        prefix={
                                            <LockOutlined className="site-form-item-icon" />
                                        }
                                    />
                                </Form.Item>

                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        className="login-form-button"
                                    >
                                        Enviar
                                    </Button>
                                </Form.Item>

                                <hr />
                                <Link to="/auth/login" className="link">
                                    Ya estoy registrado
                                </Link>
                            </Form>
                        </Col>
                        <Col xs={2} sm={4} md={3} lg={8} xl={7}></Col>
                    </Row>
                </Content>
                <Footer>Raul Rodriguez - 2021</Footer>
            </Layout>
        </>
    );
};
