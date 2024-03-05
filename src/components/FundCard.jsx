import React from "react";
import { tagType, thirdweb } from "../assets";
import { daysLeft } from "../utils";

const FundCard = ({
  owner,
  title,
  description,
  target,
  deadline,
  amountCollected,
  image,
  handleClick,
}) => {
  const remainingDays = daysLeft(deadline);

  console.log(remainingDays);
  return (
    <div
      className="sm:w-[288px] w-full rounded-[15px] bg-[#e5eaee] shadow-md cursor-pointer border border-gray-200"
      onClick={handleClick}
    >
      <img
        src={image}
        alt="fund"
        className="w-full h-[158px] object-cover rounded-t-[15px]"
      />

      <div className="flex flex-col p-4">
        <div className="block">
          <h3 className="font-epilogue font-semibold text-lg text-gray-800 leading-[26px] truncate mb-2">
            {title}
          </h3>
          <p className="font-epilogue font-normal text-gray-600 leading-[18px] truncate">
            {description}
          </p>
        </div>

        <div className="flex justify-between mt-3">
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-md text-blue-500 leading-[22px]">
              {amountCollected}
            </h4>
            <p className="font-epilogue font-normal text-sm leading-[18px] text-gray-600">
              Raised of {target}
            </p>
          </div>
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-md text-blue-500 leading-[22px]">
              {remainingDays}
            </h4>
            <p className="font-epilogue font-normal text-sm leading-[18px] text-gray-600">
              Days Left
            </p>
          </div>
        </div>

        <div className="flex items-center mt-4">
          <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-gray-200">
            <img
              src={thirdweb}
              alt="user"
              className="w-1/2 h-1/2 object-contain"
            />
          </div>
          <p className="flex-1 font-epilogue font-normal text-sm text-gray-600 truncate  ml-2">
            by <span className="text-gray-700">{owner}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FundCard;
