import axios from 'axios'

function updatedata()
{
    return async function(disptach){
        await axios.get('https://nextfmapi.herokuapp.com/api/get/sponsor/')
        .then(res=>{
            res.data.sort((a,b)=> parseInt(a.Sponsor_number) - parseInt(b.Sponsor_number))
            //console.log('sponsorresult',res.data)
            disptach({type:'SPONSOR_UPDATE_DATA',sponsordata:res.data})
        })
        .catch(err=>{
            console.log(err.response)
            disptach({type:'SPONSOR_UPDATE_DATA',sponsordata:err.response})
        })

        await axios.get('https://nextfmapi.herokuapp.com/api/get/episode/')
        .then(async res=>{
            res.data.sort((a,b)=> parseInt(a.Episode) - parseInt(b.Episode))
            //console.log('episoderesult',res.data)
            await disptach({type:'UPDATE_DATA',data:res.data})
        })
        .catch(async err=>{
            console.log(err.response)
            await disptach({type:'UPDATE_DATA',data:err.response})
        })
    }
}

export default updatedata()