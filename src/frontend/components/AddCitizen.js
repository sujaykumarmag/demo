import React from "react";
import { useState } from "react";

const AddCitizen = ({ voter, address }) => {
    const [ citizen, setCitizenAddress ] = useState(null);
    var dat = [];
    const [ arr, setarr ] = useState([])
    const [done,setdone] = useState(false)
    const add = (event) => {
        setCitizenAddress(event.target.value)
    }
    const addCitizen = async (votercitizen) => {
        try {
            const data = await (await voter.addCitizen(votercitizen.address)).wait();
            console.log(data)
        } catch (err) {
            console.log(err)
        }
    }
    const getAddressList = async () => {
        const number = await voter.noOfVoters()
        var num = parseInt(number._hex)
        for (var i = 0; i <num; i++){
            const data = await voter.allCitizens(i);
            dat.push(data)
        }
        if (dat.length === num) {
            console.log(dat)
            setarr(dat)
            setdone(true)
        }
    }
    
    const showList = 
        arr.map((data) => {
            return (<div>
                <div className="card w-106 bg-base-400 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">{data.addr}</h2>

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
                <button onClick={addCitizen({ address: citizen })}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text"> Voters Account Address</span>
                        </label>
                        <label className="input-group input-group-vertical">
                            <input onChange={add} value={citizen} type="text" placeholder="0x....." className="input input-bordered" />
                        </label>
                    </div>
                </button>
            </div>
            {done ? showList : <div class="grid h-screen place-items-center"><button class="btn btn-outline" onClick={getAddressList}>Get all Citizens with Addressses</button></div>}
        </div>
    )
}


export default AddCitizen;