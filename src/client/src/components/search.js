import React from 'react'
import { Icon, AutoComplete, Input, message } from 'antd'
import { Link } from "react-router-dom"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
//action
import { logout } from '../store/action'

const { Option } = AutoComplete

class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            result: [],
            value: ''
        }
        this.getItemsAsync = this.getItemsAsync.bind(this)
        this.renderResult = this.renderResult.bind(this)
        this.openWorker = this.openWorker.bind(this)
    }
    getItemsAsync = searchValue => {
        if (searchValue) {
            fetch(`/api/worker/search`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'vito-auth': `Vito ${this.props.token}`
                },
                body: JSON.stringify({ query: searchValue })
            })
                .then(response => response.json())
                .then(result => {
                    if (!result.error) this.setState({ value: searchValue, data: result, result: this.renderResult() })
                    else if (result.message === 'Token is not valid' || result.message === 'Auth bearer error' || result.message === 'Auth token is not supplied') {
                        this.props.logout()
                        console.log(result)
                        message.error('Auth Error!')
                    } else {
                        console.log(result)
                        message.error('Search Error!')
                    }
                })
                .catch(err => {
                    console.log(err)
                    message.error('Search Error!')
                })
        } else this.setState({ value: '', data: [], result: [] })
    }
    renderResult = () => {
        return (
            this.state.data.map(el =>
                <Option key={el._id} value={el._id}>
                    <Link className="search-item" to={`/workers/${el._id}`}>
                        <div className="search-item-name">
                            <span>{`Name: `}</span>
                            <span>{el.name}</span>
                        </div>
                        {
                            el.age
                                ?
                                <div className="search-item-age">
                                    <span>{`Age: `}</span>
                                    <span>{el.age}</span>
                                </div>
                                : ''
                        }
                    </Link>
                </Option>
            )
        )
    }
    openWorker = _id => {
        this.setState({ data: [], result: [], value: '' })
    }
    render() {
        return (
            <div>
                <AutoComplete
                    dropdownMatchSelectWidth={false}
                    dropdownStyle={{ width: 100 }}
                    placeholder="Search..."
                    optionLabelProp="value"
                    onSearch={this.getItemsAsync}
                    dataSource={this.state.result}
                    onSelect={this.openWorker}
                    value={this.state.value}
                >
                    <Input suffix={<Icon type="search" className="certain-category-icon" />} />
                </AutoComplete>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    token: state.token
})
const mapDispatchToProps = dispatch => ({
    logout: bindActionCreators(logout, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(Search)