// Imports regarding router
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { HashRouter } from 'react-router-dom'
import "./App.css"

// Import ethers
import { ethers } from "ethers"

// import all the contracts
import VoterAbi from "./frontend/contractsData/Voter.json"
import VoterAddress from "./frontend/contractsData/Voter-address.json"

// Import Files for Frontend
import  Navigation from "./frontend/components/Navbar";
import AddCitizen from './frontend/components/AddCitizen';
import AddParticipant from './frontend/components/AddParticipant';
import Vote from "./frontend/components/Vote"
import Home from './frontend/components/Home';
import Tail from "./frontend/components/tailnavbar"


 
function App() {
  const [ loading, setLoading ] = useState(true)
  const [ account, setAccount ] = useState(null)
  const [ voter, setVoter ] = useState({});
  // MetaMask Login/Connect
  const web3Handler = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[ 0 ])
    // Get provider from Metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    // Set signer
    const signer = provider.getSigner()

    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload();
    })

    window.ethereum.on('accountsChanged', async function (accounts) {
      setAccount(accounts[ 0 ])
      await web3Handler()
    })
    loadContracts(signer)
  }
  const loadContracts = async (signer) => {
    // Get deployed copies of contracts
    const Voter = new ethers.Contract(VoterAddress.address, VoterAbi.abi, signer);
    setVoter(Voter)
    setLoading(false)
  }
  
  return (
    <BrowserRouter>
      <div data-theme="halloween">
        <div className="drawer">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">

            <div className="navbar bg-base-100">
              <div className="flex-1">
                <label htmlFor="my-drawer">
                  <a className="btn btn-ghost normal-case text-xl">BLOCKCHAIN VOTING SYSTEM</a>

                </label>
              </div>
              <div className="flex-1.5">
                
                  {account ? (
                  <button ><a
                      href={`https://etherscan.io/address/${account}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button nav-button btn-sm mx-4">
                    <button className="btn text-l">
                        {account}
                      </button>

                  </a></button>
                  ) : (
                    <button className="btn text-l" onClick={web3Handler} >Connect Wallet</button>
                  )}
            
              </div>
            </div>
            <Routes>
              <Route path='/' element={<Home voter={voter} account={account} />} />
              <Route path="/admin/addcitizen" element={<AddCitizen voter={voter} account={account} />} />
              <Route path="/admin/addparticipant" element={<AddParticipant voter={voter} account={account} />} />
              <Route path="/vote" element={<Vote voter={voter} account={account} />} />
            </Routes>

          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer" className="drawer-overlay"></label>
            <ul className="menu p-4 w-80 bg-base-100 text-base-content">

              <ul className="menu p-4 w-70 bg-base-100 text-base-content">

                <li><a href="/">
                  <div className="grid h-20 flex-grow card bg-base-200 rounded-box place-items-center">
                    <a>Results</a>
                  </div>

                </a></li>
                <li><a href="/admin/addcitizen">
                  <div className="grid h-20 flex-grow card bg-base-200 rounded-box place-items-center">
                    <a>Add a Citizen</a>
                  </div>
                </a></li>
                <li><a href="/admin/addparticipant">
                  <div className="grid h-20 flex-grow card bg-base-200 rounded-box place-items-center">
                    <a>Add a Participant</a>
                  </div>
                </a></li>
                <li><a href="/vote">
                  <div className="grid h-20 flex-grow card bg-base-200 rounded-box place-items-center">
                    <a>My Vote</a>
                  </div>
                </a></li>
              </ul>


            </ul>
          </div>
        </div>
        <footer className="footer p-10 bg-neutral text-neutral-content">
          <div>
            <span className="footer-title">Services</span>
            <a className="link link-hover">Branding</a>
            <a className="link link-hover">Design</a>
            <a className="link link-hover">Marketing</a>
            <a className="link link-hover">Advertisement</a>
          </div>
          <div>
            <span className="footer-title">Company</span>
            <a className="link link-hover">About us</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Jobs</a>
            <a className="link link-hover">Press kit</a>
          </div>
          <div>
            <span className="footer-title">Legal</span>
            <a className="link link-hover">Terms of use</a>
            <a className="link link-hover">Privacy policy</a>
            <a className="link link-hover">Cookie policy</a>
          </div>
        </footer>
       
      </div>
      
    </BrowserRouter>
   
  );
}

export default App;
