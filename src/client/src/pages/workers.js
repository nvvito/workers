import React from 'react'
import { Link } from "react-router-dom"
import { List, Skeleton, Result, Button } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
//action
import { fetchWorkers } from '../store/action'
//component
import WorkersBreadcrumb from '../components/breadcrumb'
import ListPagination from '../components/pagination'

let breadcrumbs = [
    {
        path: '/',
        breadcrumbName: 'Home',
    },
    {
        breadcrumbName: 'Workers',
    }
]

class Workers extends React.Component {
    componentDidMount() {
        this.props.fetchWorkers(1, this.props.token)
    }
    render() {
        let { loadData, list, page, count, error, token } = this.props
        if (error) return (
            <Result
                status="500"
                title="500"
                subTitle="Sorry, the server is wrong."
            />
        )
        return (
            <React.Fragment>
                <WorkersBreadcrumb breadcrumbs={breadcrumbs} />
                <div className='list-body'>
                    {
                        !loadData
                            ?
                            <ListWorkers list={list} page={page} count={count} fetchWorkers={this.props.fetchWorkers} token={token} />
                            :
                            <LoadData size={10} />
                    }
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    list: state.workers.list,
    count: state.workers.count,
    page: state.workers.page,
    loadData: state.workers.loadData,
    error: state.workers.error,
    token: state.token
})
const mapDispatchToProps = dispatch => ({
    fetchWorkers: bindActionCreators(fetchWorkers, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(Workers)

//helper
//skeleton
const LoadData = ({ size }) => {
    let list = []
    for (let i = 0; i < size; i++) list.push(<Skeleton title={false} loading={true} active key={i}></Skeleton>)
    return list
}
//List
const ListWorkers = ({ list, page, count, fetchWorkers, token }) =>
    <div>
        <Link to='/workers/add'>
            <Button type="primary" shape="circle" icon="user-add" size='large' className='add-user-btn' />
        </Link>
        <List
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={list}
            renderItem={item => <ListElement data={item} key={item._id} />}
        />
        {
            count > 10
                ?
                <ListPagination count={count} page={page} fetchWorkers={fetchWorkers} token={token} />
                : ''
        }
    </div>
//ListElement
const ListElement = ({ data }) => {
    let { _id, name, age, department } = data
    let _description = ''
    if (age) _description += `Age: ${age}  `
    if (department) {
        if (department.name) _description += `Department: ${department.name}`
    }
    let _name = name ? name : "Noname"
    return (
        <List.Item
            actions={[<Link key="list-loadmore-more" to={`/workers/${_id}`}>more</Link>]}
        >
            <List.Item.Meta
                title={_name}
                description={_description}
            />
        </List.Item>
    )
}
