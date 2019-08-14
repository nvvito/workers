import React from 'react'
import { Form, Icon, Input, Button, Card, Result } from 'antd'
import { Link, Redirect } from "react-router-dom"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
//action
import { login, logout } from '../store/action'

class NormalLoginForm extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.login(values)
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form
        const { auth, load, logout, location } = this.props

        if (location.state) {
            if (location.state.from && auth === true) return <Redirect to={location.state.from} />
        }
        return (
            !auth
                ?
                <Card className='form-card'>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Username"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Password"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" loading={load}>
                                Log in
                        </Button>
                        </Form.Item>
                    </Form>
                </Card>
                :
                <Result
                    status="success"
                    title="You are successfully logged in!"
                    extra={[
                        <Button key='worker' type="primary"><Link to="/workers"><Icon type="smile" /> Workers</Link></Button>,
                        <Button key='logout' onClick={logout}><Icon type="logout" />Logout</Button>,
                    ]}
                />
        )
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm)

const mapStateToProps = state => ({
    auth: state.auth,
    load: state.load
})
const mapDispatchToProps = dispatch => ({
    login: bindActionCreators(login, dispatch),
    logout: bindActionCreators(logout, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm)