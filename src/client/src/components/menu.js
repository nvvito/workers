import React from 'react'
import { Menu, Icon } from 'antd'
import { NavLink } from "react-router-dom"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
//action
import { logout } from '../store/action'
//search
import Search from './search'

const PageMenu = ({ auth, logout }) =>
    <Menu mode="horizontal" theme="dark" selectable={false}>
        <Menu.Item key="home">
            <NavLink to="/">
                <Icon type="home" /> Home
            </NavLink>
        </Menu.Item>
        <Menu.Item key="workers">
            <NavLink to="/workers">
                <Icon type="smile" /> Workers
            </NavLink>
        </Menu.Item>
        <Menu.Item key='auth' style={{ float: 'right' }}>
            {
                !auth
                    ?
                    <NavLink to="/login">
                        <Icon type="login" /> Login
                    </NavLink>
                    :
                    <div onClick={logout}>
                        <Icon type="logout" /> Logout
                    </div>
            }
        </Menu.Item>
        {
            auth
                ?
                <Menu.Item key="search" style={{ float: 'right' }}>
                    <Search />
                </Menu.Item>
                : ""
        }
    </Menu>

const mapStateToProps = state => ({
    auth: state.auth
})
const mapDispatchToProps = dispatch => ({
    logout: bindActionCreators(logout, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(PageMenu)