import React from 'react'
import { Result, Button, Icon } from 'antd'
import { Link } from "react-router-dom"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
//action
import { logout } from '../store/action'

const Home = ({ auth, logout }) =>
    auth
        ?
        <Result
            icon={<Icon type="smile" theme="twoTone" />}
            title="Fine! Now we can view profiles."
            extra={[
                <Button key='worker' type="primary"><Link to="/workers"><Icon type="smile" /> Workers</Link></Button>,
                <Button key='logout' onClick={logout}><Icon type="logout" />Logout</Button>,
            ]}
        />
        :
        <Result
            status="warning"
            title="You need to Log in."
            subTitle=' Username: user, Password: password.'
            extra={<Button type="primary"><Link to="/login"><Icon type="login" />Login</Link></Button>}
        />

const mapStateToProps = state => ({
    auth: state.auth
})
const mapDispatchToProps = dispatch => ({
    logout: bindActionCreators(logout, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Home)