import React, { useState } from "react";
import { assets } from "../assets/assets_frontend/assets";
const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [userData, setUserData] = useState({
    name: "Deepesh",
    image: assets.profile_pic,
    email: "deepesh639394@gmail.com",
    phone: "000000000",
    address: {
      line1: "besides local school on the road",
      line2: "lucknow,up",
    },
    gender: "Male",
    dob: "21-10-2005",
  });
  return (
    <div className="max-w-lg flex flex-col gap-2 text-sm">
      <img className="w-36 rounded" src={userData.image} alt="" />
      {isEdit === true ? (
        <input
          className="bg-gray-50 text-3xl font-medium max-w-60 mt-4"
          type="text"
          value={userData.name}
          onChange={(e) => {
            setUserData((prev) => ({ ...prev, name: e.target.value }));
          }}
        ></input>
      ) : (
        <p className="font-medium text-3xl text-[#262626] mt-4">
          {userData.name}
        </p>
      )}
      <hr className="bg-[#ADADAD] h-[1px] border-none" />
      <div>
        <p className="text-gray-600 underline mt-3">CONTACT INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-[#363636]">
          <p className="font-medium">Email id:</p>
          <p className="text-blue-500">{userData.email}</p>
          <p className="font-medium">Phone:</p>
          <p>
            {" "}
            {isEdit === true ? (
              <input
                className="bg-gray-50 max-w-52"
                type="text"
                value={userData.phone}
                onChange={(e) => {
                  setUserData((prev) => ({ ...prev, phone: e.target.value }));
                }}
              ></input>
            ) : (
              <p className="text-blue-500">{userData.phone}</p>
            )}
          </p>
          <p className="font-medium">Address:</p>
          {isEdit ? (
            <p>
              <input
                className="bg-gray-50"
                type="text"
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
                value={userData.address.line1}
              />
              <br />
              <input
                className="bg-gray-50"
                type="text"
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
                value={userData.address.line2}
              />
            </p>
          ) : (
            <p className="text-gray-500">
              {userData.address.line1} <br /> {userData.address.line2}
            </p>
          )}
        </div>
      </div>
      <div>
        <p className="text-[#797979] underline mt-3">BASIC INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-gray-600">
          <p className="font-medium">Gender:</p>
          {isEdit === true ? (
            <select
              className="max-w-20 bg-gray-50"
              name=""
              id=""
              value={userData.gender}
              onChange={(e) => {
                setUserData((prev) => ({ ...prev, gender: e.target.value }));
              }}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className="text-gray-500">{userData.gender}</p>
          )}
          <p className="font-medium">Birthday:</p>
          <p>
            {isEdit ? (
              <input
                type="date"
                className="max-w-28 bg-gray-50"
                onChange={(e) => {
                  setUserData((prev) => ({ ...prev, dob: e.target.dob }));
                }}
                value={userData.dob}
              />
            ) : (
              <p className="text-gray-500">{userData.dob}</p>
            )}
          </p>
        </div>
      </div>
      <div className="mt-10">
        {isEdit ? (
          <button
            className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
            onClick={() => setIsEdit(!isEdit)}
          >
            Save Information
          </button>
        ) : (
          <button
            className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
            onClick={() => setIsEdit(!isEdit)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
