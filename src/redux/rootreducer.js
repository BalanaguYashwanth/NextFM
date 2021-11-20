
const initialstate={
    data:[],
    state:[],
    sponsordata:[],
}

export default function rootreducer(state=initialstate,action){
    if(action.type=='UPDATE_DATA')
    {
        return{
            ...state,
            data:action.data
        }
    }
    if(action.type=='SPONSOR_UPDATE_DATA')
    {
        return{
            ...state,
            sponsordata:action.sponsordata
        }
    }
    console.log('state',state)
    return state
}
