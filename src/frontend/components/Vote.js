import React from "react";
import { useState } from "react";

const Vote = ({ voter, address }) => {
    const [ done, setdone ] = useState(false);
    const [ leader, setleaderAddress ] = useState(null);
    const [ leadername, setleaderName ] = useState(null);

    const [choose,setChoosen] = useState(null)
    var dat = [];
    const [ arr, setarr ] = useState([])

 
    
    const getAddressList = async () => {
        const number = await voter.noOfParticipants();
        var num = parseInt(number._hex)
        console.log(number)
        for (var i = 0; i < num; i++) {
            const data = await voter.participants(i);
            console.log(data)
            dat.push(data)
        }
        if (dat.length === num) {
            console.log(dat)
            setarr(dat)
            setdone(true)
        }

    }
    const voteUp = async(_address) => {
        await voter.voteLeader(_address);
    }
    const showList = arr.map((data) => {
        return (<div>
            <div className="card w-106 bg-base-400 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">{data.name}</h2>
                    <h6>{data.addr}</h6>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">{parseInt(data.id)}</button>
                    </div>
                </div>
            </div>
        </div>)
    })
    return (
        
        <div class="grid v-screen place-items-center">
            {done ? showList :<div> <button class="btn btn-outline" onClick={getAddressList}>Agree To all the Terms and Conditions</button></div>}
            
            <button onClick={voteUp(choose)}>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text"> Enter the address who u wanna Vote</span>
                    </label>
                    <label className="input-group input-group-vertical">
                        <input onChange={(event) => { setChoosen(event.target.value) }}  type="text" placeholder="0x....." className="input input-bordered" />
                    </label>
                </div>
            </button>
        </div>
    )


}

export default Vote;