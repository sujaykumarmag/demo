import React from "react";
import { useState } from "react";

const AddParticipant = ({ voter, address }) => {
    const [ done, setdone ] = useState(false);
    const [ leader, setleaderAddress ] = useState(null);
    const [leadername,setleaderName] =useState(null);
    var dat = [];
    const [ arr, setarr ] = useState([])
    
    const addParticipant = async(participant) => {
        try {
            const data = await(await voter.addParticipant(participant.name,participant.address)).wait();
        } catch (err) {
            console.log(err)
        }
        
    }
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
        <div>
            <div class="grid v-screen place-items-center">
                <button onClick={addParticipant({ address: leader, name: leadername })}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name of the Leader </span>
                        </label>
                        <label className="input-group input-group-vertical">
                            <input onChange={(event) => { setleaderName(event.target.value) }} type="text" value={leadername} placeholder="Shiva" className="input input-bordered" />
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text"> Leaders Account Address</span>
                        </label>
                        <label className="input-group input-group-vertical">
                            <input onChange={(event) => { setleaderAddress(event.target.value) }} value={leader} type="text"  placeholder="0x....." className="input input-bordered" />
                        </label>
                    </div>
                </button>
            </div>
            
            {done ? showList : <div class="grid h-screen place-items-center"><button className="btn btn-outline" onClick={getAddressList}>Get all Participants in Elections with Addressses</button></div>}
        </div>
    )


}

export default AddParticipant;