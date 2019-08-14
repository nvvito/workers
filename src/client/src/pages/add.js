import React from 'react'
import { Card, Icon, Popconfirm, Input, InputNumber, Select, Result } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
//action
import {
    fetchDepartments,
    WorkerChangeName,
    WorkerChangeAge,
    WorkerChangePhones,
    WorkerChangeEmails,
    WorkerChangeDepartment,
    openAdd,
    saveAdd
} from '../store/action'
//component
import WorkersBreadcrumb from '../components/breadcrumb'

const { Option } = Select

let breadcrumb = [
    {
        path: '/',
        breadcrumbName: 'Home',
    },
    {
        path: '/workers/',
        breadcrumbName: 'Workers',
    }
]

class AddCard extends React.Component {
    constructor(props) {
        super(props)
        this.saveAdd = this.saveAdd.bind(this)
    }
    saveAdd() {
        this.props.saveAdd(this.props.worker.data, this.props.history, this.props.token)
    }
    componentDidMount() {
        this.props.openAdd()
        this.props.fetchDepartments(this.props.token)
    }
    render() {
        let { worker, departments } = this.props
        if (worker.error) return (
            <Result
                status="500"
                title="500"
                subTitle="Sorry, the server is wrong."
            />
        )
        let breadcrumbs = [...breadcrumb, { breadcrumbName: 'Add' }]
        return (
            <React.Fragment>
                <WorkersBreadcrumb breadcrumbs={breadcrumbs} />
                {
                    worker.loadData
                        ?
                        <LoadCard />
                        :
                        <RenderCard worker={worker.data} departments={departments.data}
                            changeName={this.props.WorkerChangeName}
                            changeAge={this.props.WorkerChangeAge}
                            changePhones={this.props.WorkerChangePhones}
                            changeEmails={this.props.WorkerChangeEmails}
                            changeDepartment={this.props.WorkerChangeDepartment}
                            saveAdd={this.saveAdd}
                        />
                }
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    worker: {
        data: state.worker.data,
        loadData: state.worker.loadData,
        error: state.worker.error,
    },
    departments: {
        data: state.departments.data,
        loadData: state.departments.loadData,
        error: state.departments.error,
    },
    token: state.token
})
const mapDispatchToProps = dispatch => ({
    fetchDepartments: bindActionCreators(fetchDepartments, dispatch),
    WorkerChangeName: bindActionCreators(WorkerChangeName, dispatch),
    WorkerChangeAge: bindActionCreators(WorkerChangeAge, dispatch),
    WorkerChangePhones: bindActionCreators(WorkerChangePhones, dispatch),
    WorkerChangeEmails: bindActionCreators(WorkerChangeEmails, dispatch),
    WorkerChangeDepartment: bindActionCreators(WorkerChangeDepartment, dispatch),
    openAdd: bindActionCreators(openAdd, dispatch),
    saveAdd: bindActionCreators(saveAdd, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(AddCard)

//departments
const Department = ({ departments, value, onChange }) =>
    <Select value={value} onChange={onChange} style={{ width: '100%' }}>
        {
            departments.map(el => <Option value={el._id} key={el._id}>{el.name ? el.name : "noname"}</Option>)
        }
    </Select>

const LoadCard = () =>
    <Card style={{ width: 300, margin: '20px auto' }} loading={true}
        actions={[
            <Popconfirm
                disabled
                key='save'
            >
                <Icon type="save" key='save' />
            </Popconfirm>
        ]}>
    </Card>

const RenderCard = ({ worker, departments, changeName, changeAge, changePhones, changeEmails, changeDepartment, saveAdd }) =>
    <Card
        style={{ width: 300, margin: '20px auto' }}
        actions={[
            <Popconfirm
                key='save'
                title="Are you sure Save this Worker?"
                onConfirm={saveAdd}
                okText="Yes"
                cancelText="No"
            >
                <Icon type="save" key='save' />
            </Popconfirm>
        ]}
    >
        <span>Name:</span>
        <Input value={worker.name} onChange={changeName} placeholder="Name..." style={{ width: '100%' }} />
        <span>Age:</span>
        <InputNumber value={worker.age} onChange={changeAge} min={0} max={99} style={{ width: '100%' }} type='number' />
        <span>Phones:</span>
        <Select value={worker.phones} onChange={changePhones} mode="tags" style={{ width: '100%' }} placeholder="Phones..." />
        <span>Emails:</span>
        <Select value={worker.emails} onChange={changeEmails} mode="tags" style={{ width: '100%' }} placeholder="Emails..." />
        <span>Department:</span>
        <Department value={worker.department} onChange={changeDepartment} departments={departments} />
    </Card>