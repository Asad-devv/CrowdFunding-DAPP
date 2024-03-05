import React, { useState, useEffect } from 'react'
import { useContract } from '@thirdweb-dev/react';
import { DisplayCampaigns } from '../components';
import { useStateContext } from '../context'

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    setCampaigns(data);
    console.log(campaigns[0]);
    setIsLoading(false);
  }

  useEffect(() => {
    if(contract) 
    {fetchCampaigns();}
    else{
      console.log("nahi chal ra");
    }
    
  }, [address, contract]);

  return (
    <DisplayCampaigns 
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  )
}

export default Home