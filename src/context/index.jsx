import React, { useContext, createContext } from 'react';

import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import {contractAbi} from "../constants/ABI";


const StateContext = createContext();

export const StateContextProvider = ({ children }) => {


  
  if(window.ethereum){
    console.log("availcable");
  }else{
    console.log("notavailable");
  }
  
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  // await provider.send("eth_requestAccounts", []);

  // const { contract } = useContract('0x02b57BD3f208ACef2386B2f7179c8FF570d8D324',contractAbi);
  // const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');
  const signer = provider.getSigner()

  // 0xE7Ef2f44e5184e24ec4999f3651f0099e6E4a0F1

  const contract=   new ethers.Contract("0xD3381F776EAC5F8A5Ab893231a9B5992B3612E8B",contractAbi,signer)
  const address = useAddress();
  const connect = useMetamask();
  const publishCampaign = async (form) => {
    try {
      const data =await contract.functions.createCampaign(
        address, // owner
        form.title, // title
        form.description, // description
        form.target, // target
        Math.round(new Date(form.deadline).getTime() / 1000), // deadline
        form.image // image
    );
      console.log("contract call success", data)
    } catch (error) {
      console.log("contract call failure", error)
    }
  }

  const getCampaigns = async () => {
    try {
      const campaigns = await contract.functions.getCampaigns();
  
      const parsedCampaings =campaigns[0].map((campaign, i) => ({
        owner: campaign.owner,
        title: campaign.title,
        description: campaign.description,
        target: ethers.utils.formatEther(campaign.target.toString()),
        deadline: campaign.deadline.toNumber(),
        amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
        image: campaign.image,
        pId: i
      }));
      return parsedCampaings;
    } catch (error) {
      console.error("Error fetching campaigns:", error);
      return null;
    }
  }
  
  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();

    const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);

    return filteredCampaigns;
  }

  const donate = async (pId, amount) => {
    const data = await contract.functions.donateToCampaign( pId, { value: ethers.utils.parseEther(amount)});

    return data;
  }

  const getDonations = async (pId) => {
    const donations = await contract.functions.getDonators([pId]);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for(let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString())
      })
    }

    return parsedDonations;
  }


  return (
    <StateContext.Provider
      value={{ 
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);

