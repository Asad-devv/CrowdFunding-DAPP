import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStateContext } from '../context';
import { CountBox, CustomButton, Loader } from '../components';
import { calculateBarPercentage, daysLeft } from '../utils';
import { thirdweb } from '../assets';
import toast from 'react-hot-toast';

const CampaignDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { donate, getDonations, contract, address } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [donators, setDonators] = useState([]);

  const remainingDays = daysLeft(state.deadline);

  const fetchDonators = async () => {
    const data = await getDonations(state.pId);
    setDonators(data);
  };

  useEffect(() => {
    if (contract) fetchDonators();
  }, [contract, address]);

  const handleDonate = async () => {
    toast.success("aasad")
    setIsLoading(true);
    await donate(state.pId, amount); 
    // navigate('/')
    setIsLoading(false);
  };

  return (
    <div className="bg-white text-gray-800 p-4">
      {isLoading && <Loader />}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:flex-1 flex flex-col">
          <img src={state.image} alt="campaign" className="w-full h-[410px] object-cover rounded-xl"/>
          <div className="relative w-full h-2 bg-gray-200 mt-2">
            <div className="absolute h-full bg-blue-500" style={{ width: `${calculateBarPercentage(state.target, state.amountCollected)}%`, maxWidth: '100%'}}></div>
          </div>
        </div>

        <div className="md:w-[150px] w-full flex flex-wrap gap-4">
          <CountBox title="Days Left" value={remainingDays} />
          <CountBox title={`Raised of ${state.target}`} value={state.amountCollected} />
          <CountBox title="Total Backers" value={donators.length} />
        </div>
      </div>

      <div className="mt-4 md:flex md:flex-row flex-col gap-4">
        <div className="md:flex-2 flex flex-col gap-4">
          <div>
            <h4 className="font-semibold text-lg uppercase">Creator</h4>
            <div className="mt-2 flex flex-row items-center gap-2">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-300 cursor-pointer">
                <img src={thirdweb} alt="user" className="w-8 h-8 object-contain"/>
              </div>
              <div>
                <h4 className="font-semibold text-base">{state.owner}</h4>
                <p className="mt-1 text-sm text-gray-600">Campaigns</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg uppercase">Story</h4>
            <div className="mt-2">
              <p className="text-base leading-relaxed">{state.description}</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg uppercase">Donators</h4>
            <div className="mt-2 flex flex-col gap-2">
              {donators.length > 0 ? donators.map((item, index) => (
                <div key={`${item.donator}-${index}`} className="flex justify-between items-center gap-2">
                  <p className="text-base text-gray-700">{index + 1}. {item.donator}</p>
                  <p className="text-base text-gray-600">{item.donation}</p>
                </div>
              )) : (
                <p className="text-base text-gray-600">No donators yet. Be the first one!</p>
              )}
            </div>
          </div>
        </div>

        <div className="md:flex-1">
          <h4 className="font-semibold text-lg uppercase">Fund</h4>   
          <div className="mt-2 p-4 bg-gray-100 rounded-lg">
            <p className="text-xl font-medium text-center text-gray-600">
              Fund the campaign
            </p>
            <div className="mt-4">
              <input 
                type="number"
                placeholder="ETH 0.1"
                step="0.01"
                className="w-full py-2 px-4 border border-gray-300 bg-white text-gray-800 text-lg placeholder-gray-500 rounded-lg"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <div className="mt-4 p-4 bg-gray-200 rounded-lg">
                <h4 className="font-semibold text-sm leading-snug text-gray-800">Back it because you believe in it.</h4>
                <p className="mt-2 text-sm leading-snug text-gray-600">Support the project for no reward, just because it speaks to you.</p>
              </div>
              <CustomButton 
                btnType="button"
                title="Fund Campaign"
                styles="w-full bg-blue-500"
                handleClick={handleDonate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
