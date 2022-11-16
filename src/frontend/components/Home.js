import React from "react";
import { useState } from "react";

const Home = ({ voter, address }) => {
    const final_obj = {
        addr: "",
        name: "",
        votes: ""
    };
    const final_arr = new Array();
    const dat = [];
    const vot = [];
    const [ arr, setarr ] = useState([]);
    const [ done, setdone ] = useState(false);
    const [ vote, setvote ] = useState([]);
    const [ final, setfinal ] = useState([]);

    const getarr = async () => {
        const number = await voter.noOfParticipants();
        var num = parseInt(number._hex)
        for (var i = 0; i < num; i++) {
            const data = await(await voter.participants(i));
            const chki = await (await voter.noOfLeaderVotes(await data.addr));
            vot.push(parseInt(chki._hex).toString());
            dat.push(data)
        }
        // if ((dat.length == num) && (vot.length == num)) {
        //     setarr(dat)
        //     setvote(vot);
        // } 
        // console.log(arr)
    }
    
    const getAddressList = async () => {
        const number = await voter.noOfParticipants();
        var num = parseInt(number._hex)
        await getarr();
        console.log(dat)
        for (var i = 0; i < dat.length; i++){
            const x = new Object(final_obj);
            x.addr = dat[i].addr;
            x.name = dat[i].name;
            x.votes = vot[ i ]
            final_arr.push(x);
        }
        console.log(final_arr)
        if (final_arr.length === num) {
            setfinal(final_arr);
            setdone(true)
        } 
    }

    const showList = final.map((data,key) => {
        return (
            
            <div>
                <div className="card w-106 bg-base-400 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">{data.name}</h2>
                        <h6>{data.addr}</h6>
                        <div className="card-actions justify-end">
                            
                            <button className="btn btn-primary">{data.votes}</button>
                        </div>
                    </div>
                </div>
        </div>)
    })

    return (
        <div>
            {done ? showList : <div class="grid h-screen place-items-center"><button className="btn btn-outline" onClick={getAddressList}>Get Results</button></div>}
        </div>
    )
}

export default Home;
