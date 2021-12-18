import React, { useEffect, useState } from 'react';
// import { ethers } from "ethers";
import './App.css';

export default function App() {

  // state to store user's public wallet.

  const [currentAccount, setCurrentAccount] = useState("");

  const checkWallet = async () => {

    try {
      // check metamask / ethereum object
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Do you have metamask installed?")
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      // check if authorized to access wallet
      const accounts = await ethereum.request({ method: "eth_accounts" })

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an autheorized account: ", account)
        setCurrentAccount(account)
      } else {
        console.log("No authorized account found")
      }
    } catch (err) {
      console.err(err)
    }
  }

  const connectWallet = async () => {

    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0])
    } catch (err) {
      console.error(err)
    }

  }

  useEffect(() => {
    checkWallet();
  }, [])

  return (
    <div className="mainContainer">

      <div className="dataContainer">
        <div className="header">
          Hey there! Yes!
        </div>

        <div className="bio">
          I am klee, this is a project tutoriallllll. YES YES YES Connect your Ethereum wallet and wave at me!
        </div>

        <button className="waveButton" onClick={null}>
          Wave at Me
        </button>

        {!currentAccount && (
          <button className='waveButton' onClick={connectWallet}>Connect Wallet</button>
        )}

      </div>
    </div>
  );
}
