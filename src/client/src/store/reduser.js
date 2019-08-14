export const initialState = {
    auth: false,
    token: '',
    load: false,
    workers: {
        list: [],
        count: 0,
        page: 0,
        loadData: false,
        error: true,
    },
    worker: {
        data: {
            name: '',
            age: 0,
            phones: [],
            emails: [],
            department: null
        },
        loadData: false,
        error: false,
    },
    departments: {
        data: [],
        loadData: false,
        error: false,
    }
}

export function reduser(state = initialState, action) {
    switch (action.type) {
        //auth
        case 'START_LOAD_AUTH':
            return { ...state, load: true, token: '', auth: false }
        case 'END_LOAD_AUTH':
            return { ...state, load: false, auth: false, token: '' }
        case 'AUTH_LOGIN':
            return { ...state, load: false, auth: true, token: action.payload }
        case 'AUTH_LOGOUT':
            return { ...state, auth: false, token: '' }
        //workers
        case 'START_LOAD_WORKERS':
            return { ...state, workers: { ...state.workers, loadData: true, error: false } }
        case 'SUCCESS_LOAD_WORKERS':
            return {
                ...state, workers: {
                    ...state.workers,
                    loadData: false,
                    list: action.payload.list,
                    count: action.payload.count,
                    page: action.payload.page,
                    error: false
                }
            }
        case 'FAILED_LOAD_WORKERS':
            return { ...state, workers: { ...state.workers, loadData: false, error: true } }
        //worker
        case 'START_LOAD_WORKER':
            return { ...state, worker: { ...state.worker, loadData: true, error: false } }
        case 'SUCCESS_LOAD_WORKER':
            return {
                ...state, worker: {
                    ...state.worker,
                    loadData: false,
                    error: false,
                    data: action.payload
                }
            }
        case 'FAILED_LOAD_WORKER':
            return { ...state, worker: { ...state.worker, loadData: false, error: true } }
        case 'DELETE_WORKER':
            return { ...state, worker: { ...state.worker, loadData: false, error: false, data: {} } }
        case 'FAILED_DELETE':
            return { ...state, worker: { ...state.worker, loadData: false, error: false } }
        case 'FAILED_UPDATE':
            return { ...state, worker: { ...state.worker, loadData: false, error: false } }
        case 'CHANGE_NAME':
            return { ...state, worker: { ...state.worker, data: { ...state.worker.data, name: action.payload } } }
        case 'CHANGE_AGE':
            return { ...state, worker: { ...state.worker, data: { ...state.worker.data, age: action.payload } } }
        case 'CHANGE_PHONES':
            return { ...state, worker: { ...state.worker, data: { ...state.worker.data, phones: action.payload } } }
        case 'CHANGE_EMAILS':
            return { ...state, worker: { ...state.worker, data: { ...state.worker.data, emails: action.payload } } }
        case 'CHANGE_DEPARTMENT':
            return { ...state, worker: { ...state.worker, data: { ...state.worker.data, department: action.payload } } }
        //departments
        case 'START_LOAD_DEPARTMENTS':
            return { ...state, departments: { ...state.departments, loadData: true } }
        case 'SUCCESS_LOAD_DEPARTMENTS':
            return {
                ...state, departments: {
                    ...state.departments,
                    loadData: false,
                    error: false,
                    data: action.payload
                }
            }
        case 'FAILED_LOAD_DEPARTMENTS':
            return { ...state, departments: { ...state.departments, loadData: false, error: true } }
        //add
        case 'OPEN_ADD_START':
            return { ...state, worker: { ...state.worker, loadData: true, error: false, data: {} } }
        case 'OPEN_ADD_END':
            return { ...state, worker: { ...state.worker, loadData: false, error: false, data: {} } }
        case 'FAILED_CREATE':
            return { ...state, worker: { ...state.worker, loadData: false, error: false } }
        default:
            return state;
    }
}