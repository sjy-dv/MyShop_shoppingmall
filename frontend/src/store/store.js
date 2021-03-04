import {createStore} from 'redux';

//reducer

export default createStore(function(state, action){
    if(state === undefined || 0 || ''){
        return {id : '', idx:'', authcode:''}
    }
    if(action.type === 'login'){
        return  { ...state, id : action.id}
    }
    if(action.type === 'update'){
        return {...state, idx : action.idx}
    }

    if(action.type === 'detail'){
        return {...state, idx : action.idx}
    }

    if(action.type === 'auth'){
        return {...state , authcode : action.authcode}
    }

    return state;
})