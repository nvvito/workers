import React from 'react'
import { Pagination } from 'antd'

const ListPagination = ({ count, page, fetchWorkers, token }) => {
    return <Pagination defaultPageSize={10} total={count} current={page} onChange={number=>fetchWorkers(number,token)} className='ListPagination' />
}

export default ListPagination