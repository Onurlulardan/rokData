"use client";
import { useEffect, useState } from "react";
import rokData from "@/app/data/rokdata.json";
import rokdataTypes from "@/app/data/rokdataTypes";
import Pagination from "@/app/components/Pagination/index";

export default function Home() {
  const [data, setData] = useState<rokdataTypes[]>([]);
  const [totalKD, setTotalKD] = useState(0);
  const [highestPower, setHighestPower] = useState(0);
  const [lovestPower, setLovestPower] = useState(0);
  const [averageCapped, setAverageCapped] = useState(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemPerPage, setItemPerPage] = useState<number>(10);

  const paginationNumber = data.length / 10;
  const indexOfLastItems = currentPage * itemPerPage;
  const indexOffirstItems = indexOfLastItems - itemPerPage;
  const currentItem = data.slice(indexOffirstItems, indexOfLastItems);


  const paginate = (pageNumber: number) => {
      setCurrentPage(pageNumber);
  }

  const calculateTotalKD = () => {
    let totalkd = rokData.at(-1);
    setTotalKD(totalkd?.Rank as any);
  }

  const calculatePower = () => {
    const highest = Math.max(...rokData.map(item => item.Capped));
    const lowest = Math.min(...rokData.map(item => item.Capped));

    const cappedValues = rokData.map(item => item.Capped);
    const averageCappedValues = cappedValues.reduce((acc, curr) => acc + curr, 0) / cappedValues.length;

    setHighestPower(highest);
    setLovestPower(lowest);
    setAverageCapped(averageCappedValues);
  }
  
  useEffect(() => {
    calculateTotalKD();
    calculatePower();
    setData(rokData);
  }, []);

  return (
    <main className="container mx-auto font-Poppins min-h-screen">
      <section className="flex flex-col items-center pt-14 pb-8">
        <div>
          <h1 className="text-[60px] text-[#1F2937] font-bold">Rise of Kingdoms Kingdoms Data</h1>
          <h2 className="text-center mt-2 mb-4 text-[20px] text-[#1F2937]">Data From 1093</h2>
        </div>

        <div id="menu" className="flex gap-8 items-center flex-wrap">
          <input type="text" className="bg-[#1F2937] shadow-lg outline-none p-4 rounded-lg text-white min-w-[500px] placeholder-white" placeholder="Select your Kingdom"/>
          <select className="min-w-[250px] shadow-lg rounded-lg bg-[#1F2937] text-white  outline-none p-4">
            <option selected>Select Kvk Mode</option>
            <option>Out of Season</option>
            <option>So8</option>
            <option>KoN</option>
            <option>Orl</option>
            <option>HA</option>
          </select>
        </div>

        <div id="info-box" className="flex flex-wrap  gap-4 mt-10">
          <div className="bg-[#1F2937] shadow-lg  text-white text-lg p-6 rounded-lg">
            <h3>Total Kingdoms</h3>
            <p className="text-center font-bold"> {totalKD} </p>
          </div>

          <div className="bg-[#1F2937] shadow-lg  text-white text-lg p-6 rounded-lg">
            <h3>Highest Capped Power</h3>
            <p className="text-center font-bold"> { highestPower } </p>
          </div>

          <div className="bg-[#1F2937] shadow-lg  text-white text-lg p-6 rounded-lg">
            <h3>Lowest Capped Power</h3>
            <p className="text-center font-bold"> { lovestPower } </p>
          </div>

          <div className="bg-[#1F2937] shadow-lg  text-white text-lg p-6 rounded-lg">
            <h3>Average Capped Power</h3>
            <p className="text-center font-bold"> { averageCapped } </p>
          </div>
        </div>

      </section>
      <section>
        <div id="list" className="flex flex-col gap-4">
          <div className="flex flex-col mt-6">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden sm:rounded-lg">
                  <table className="min-w-full text-sm text-white">
                    <thead className="bg-black text-xs uppercase font-medium">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left tracking-wider"> Rank </th>
                        <th scope="col" className="px-6 py-3 text-left tracking-wider"> Kingdom </th>
                        <th scope="col" className="px-6 py-3 text-left tracking-wider"> KvK </th>
                        <th scope="col" className="px-6 py-3 text-left tracking-wider"> Capped </th>
                        <th scope="col" className="px-6 py-3 text-left tracking-wider">
                        Farmed
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-800">
                      { currentItem?.map((kingdom, index) => {
                          return ( 
                            <tr className=" bg-opacity-20">
                            
                            <td className="flex px-6 py-4 whitespace-nowrap">
                              <img className="w-5" src="https://ssl.gstatic.com/onebox/media/sports/logos/JTre94vh6WJeLmIL-Dfc1g_48x48.png" alt="" />
                                <span className="ml-2 font-medium"> { kingdom.Rank } </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap"> { kingdom.Kingdom } </td>
                              <td className="px-6 py-4 whitespace-nowrap"> { kingdom.KvK } </td>
                              <td className="px-6 py-4 whitespace-nowrap"> { kingdom.Capped } </td>
                              <td className="px-6 py-4 whitespace-nowrap"> { kingdom.Farmed } </td>
                            </tr>
                          )
                        }) }
                      </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div id="paginate-cover">
            <Pagination paginate={paginate} totalitem={paginationNumber}></Pagination>
          </div>
        </div>
      </section>
    </main>
  )
}
