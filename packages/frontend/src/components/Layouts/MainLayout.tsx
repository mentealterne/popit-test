import React, { FunctionComponent } from "react";
import MainNav from "../MainNav";
import artificialIntelligence from "../../assets/artificial-intelligence.png";
interface IProps {
  children: React.ReactNode;
}

const MainLayout: FunctionComponent<IProps> = ({ children }) => {
  console.log(process.env);
  return (
    <div className="w-screen h-screen bg-gray-100 p-4 justify-center  flex">
      <div className="flex flex-row gap-4 bg-white rounded-md shadow-md w-full">
        <div className="w-1/5 flex flex-col p-4 justify-between">
          <h1 className="text-orange-600 text-2xl font-bold uppercase">
            PopIt
          </h1>
          <MainNav />
          <div className="p-4 rounded-md shadow-md bg-gray-200 flex flex-col justify-center">
            <img
              src={artificialIntelligence}
              alt="artificial-intelligence"
              className="w-1/3 mx-auto"
            />
            <h2 className="text-center text-lg font-light py-2 text-gray-700">
              It seems you are a super-admin and can control almost{" "}
              <span className="font-bold text-orange-500">everything.</span>
            </h2>
            <button className="px-4 cursor-pointer hover:bg-orange-800 py-2 text-center text-white bg-orange-500 mx-auto font-bold rounded-md shadow-md">
              Mock action
            </button>
          </div>
        </div>
        <div className="w-3/5 bg-gray-200">{children} </div>
        <div className="w-1/5"> </div>
      </div>
    </div>
  );
};

export default MainLayout;
