import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useContract } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { Sidebar, Navbar } from './components';
import { CampaignDetails, CreateCampaign, Home, Profile } from './pages';
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { contractAbi } from './constants/ABI';
import toast, { Toaster } from 'react-hot-toast';
import Footer from './components/Footer';
import { Ethereum } from '@thirdweb-dev/chains';

const App = () => {
  
  

  
  return (
    <>

    <div className="relative sm:-8 p-4 bg-aliceblue min-h-screen flex flex-row">
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>
      <Toaster />


      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/campaign-details/:id" element={<CampaignDetails />} />
        </Routes>
      </div>

    </div>
    <div className=''><Footer/></div>
    
    </>
  )
}

export default App