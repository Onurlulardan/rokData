"use client";
import { useEffect, useState } from "react";
import rokData from "@/app/data/rokdata.json";
import rokdataTypes from "@/app/data/rokdataTypes";
import ReactPaginate from 'react-paginate';
import 'remixicon/fonts/remixicon.css'

export default function Home() {
  const [data, setData] = useState<rokdataTypes[]>([]);
  const [totalKD, setTotalKD] = useState(0);
  const [highestPower, setHighestPower] = useState(0);
  const [lovestPower, setLovestPower] = useState(0);
  const [averageCapped, setAverageCapped] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [searchKey, setSearchKey] = useState("");
  const [selectValue, setSelectValue] = useState('');
 
  const itemsPerPage = 10;
  const endOffset = itemOffset + itemsPerPage;
  let currentItems = rokData.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(rokData.length / itemsPerPage);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % rokData.length;
    setItemOffset(newOffset);
  };

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

  const search = (e: any) => {
    setSearchKey(e);
    let newData = rokData.filter((item) => {
      return item.Kingdom.toLocaleLowerCase().includes(e.toLocaleLowerCase())
    });
    setData(newData);
    setSelectValue("")
  }

  const optionChange = (e: any) => {
    setSearchKey(e);
    switch (e) {
      case "default":
          setData(rokData);
          setSelectValue("default");
        break;
      case "out":
          let outOfSeasonData = rokData.filter(item => item.KvK == "");
          setData(outOfSeasonData);
          setSelectValue("out");
        break;
      case "So8":
          let So8Data = rokData.filter(item => item.KvK == "So8");
          setData(So8Data);
          setSelectValue("So8");
        break;
      case "KoN":
          let KoNData = rokData.filter(item => item.KvK == "KoN");
          setData(KoNData);
          setSelectValue("KoN");
        break;
      case "Orl":
          let OrlData = rokData.filter(item => item.KvK == "Orl");
          setData(OrlData);
          setSelectValue("Orl");
        break;
      case "HA":
          let HAData = rokData.filter(item => item.KvK == "HA");
          setData(HAData);
          setSelectValue("HA");
        break;
      default:
        break;
    }
  }

  const setInfo = (e: any) => {
    let filteredData;
    if(e == "high") {
      setSearchKey(e);
      filteredData = rokData.filter(item => item.Capped == highestPower);
      setData(filteredData);
    }
    if(e == "low") {
      setSearchKey(e);
      filteredData = rokData.filter(item => item.Capped == lovestPower);
      setData(filteredData);
    }
  }

  return (
    <main className="container mx-auto font-Poppins min-h-screen">
      <section className="flex flex-col items-center pt-14 pb-8">
        <div>
          <h1 className="text-[60px] text-[#1F2937] font-bold">Rise of Kingdoms Kingdoms Data</h1>
          <h2 className="text-center mt-2 mb-4 text-[20px] text-[#1F2937]">Data From 1093</h2>
        </div>

        <div id="menu" className="flex gap-8 items-center flex-wrap">
          <input type="text" onChange={(e) => search(e.target.value)} className="bg-[#1F2937] shadow-lg outline-none p-4 rounded-lg text-white min-w-[500px] placeholder-white" placeholder="Search your Kingdom"/>
          <select value={selectValue} onChange={(e) => optionChange(e.target.value)} className="min-w-[250px] shadow-lg rounded-lg bg-[#1F2937] text-white  outline-none p-4">
            <option value={"default"}>Select Kvk Mode</option>
            <option value={"out"}>Out of Season</option>
            <option value={"So8"}>So8</option>
            <option value={"KoN"}>KoN</option>
            <option value={"Orl"}>Orl</option>
            <option value={"HA"}>HA</option>
          </select>
        </div>

        <div id="info-box" className="flex flex-wrap  gap-4 mt-10">
          <div className="bg-[#1F2937] shadow-lg  text-white text-lg p-6 rounded-lg">
            <h3>Total Kingdoms</h3>
            <p className="text-center font-bold"> {totalKD} </p>
          </div>

          <div onClick={(e) => setInfo("high") } className="bg-[#1F2937] shadow-lg  text-white text-lg p-6 rounded-lg cursor-pointer">
            <h3>Highest Capped Power</h3>
            <p className="text-center font-bold"> { `${highestPower.toString().slice(0,2)}.${highestPower.toString().slice(2,5)} B` } </p>
          </div>

          <div onClick={(e) => setInfo("low") } className="bg-[#1F2937] shadow-lg  text-white text-lg p-6 rounded-lg cursor-pointer">
            <h3>Lowest Capped Power</h3>
            <p className="text-center font-bold"> { `${lovestPower.toString().slice(0,2)}.${lovestPower.toString().slice(2,5)} B` } </p>
          </div>

          <div className="bg-[#1F2937] shadow-lg  text-white text-lg p-6 rounded-lg">
            <h3>Average Capped Power</h3>
            <p className="text-center font-bold"> { `${averageCapped.toString().slice(0,2)}.${averageCapped.toString().slice(2,5)} B` } </p>
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
                        <th scope="col" className="px-6 py-3 text-left tracking-wider"> Farmed </th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-800">
                      { searchKey == "" ? 
                      ( currentItems?.map((kingdom, index) => {
                        return ( 
                          <tr key={index} className=" bg-opacity-20">
                          
                          <td className="flex px-6 py-4 whitespace-nowrap">
                              {kingdom.Kingdom.includes("*") ? 
                              ( <i className="ri-star-line"></i> ) 
                              : ""}
                              <span className="ml-2 font-medium"> { kingdom.Rank } </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap"> { kingdom.Kingdom.replace("*", "") } </td>
                            <td className="px-6 py-4 whitespace-nowrap"> { kingdom.KvK } </td>
                            <td className="px-6 py-4 whitespace-nowrap"> { `${kingdom.Capped.toString().slice(0,2)}.${kingdom.Capped.toString().slice(2,5)} B` } </td>
                            <td className="px-6 py-4 whitespace-nowrap"> { `${kingdom.Farmed.toString().slice(0,2)}.${kingdom.Farmed.toString().slice(2,5)} B` } </td>
                          </tr>
                        )
                      }) ) : 
                      ( data?.map((kingdom, index) => {
                        return ( 
                          <tr key={index} className=" bg-opacity-20">
                          
                          <td className="flex px-6 py-4 whitespace-nowrap">
                              {kingdom.Kingdom.includes("*") ? 
                              ( <i className="ri-star-line"></i> ) 
                              : ""}
                              <span className="ml-2 font-medium"> { kingdom.Rank } </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap"> { kingdom.Kingdom.replace("*", "") } </td>
                            <td className="px-6 py-4 whitespace-nowrap"> { kingdom.KvK } </td>
                            <td className="px-6 py-4 whitespace-nowrap"> { `${kingdom.Capped.toString().slice(0,2)}.${kingdom.Capped.toString().slice(2,5)} B` } </td>
                            <td className="px-6 py-4 whitespace-nowrap"> { `${kingdom.Farmed.toString().slice(0,2)}.${kingdom.Farmed.toString().slice(2,5)} B` } </td>
                          </tr>
                        )
                      }) ) }
                      </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div id="paginate-cover" className="flex justify-end">
            {searchKey == "" ? 
            ( <ReactPaginate
              previousLabel="Previous"
              nextLabel="Next"
              pageClassName="bg-[#1F2937] text-white rounded-lg py-1 px-2"
              pageLinkClassName="bg-[#1F2937] text-white rounded-lg py-1 px-2"
              previousClassName="bg-[#1F2937] text-white rounded-lg py-1 px-2"
              previousLinkClassName="bg-[#1F2937] text-white rounded-lg py-1 px-2"
              nextClassName="bg-[#1F2937] text-white rounded-lg py-1 px-2"
              nextLinkClassName="bg-[#1F2937] text-white rounded-lg py-1 px-2"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              pageCount={pageCount}
              marginPagesDisplayed={3}
              pageRangeDisplayed={3}
              onPageChange={(e) => handlePageClick(e)}
              containerClassName="flex gap-3 p-1"
              activeClassName="text-black"
            /> )
            : ""}
            
          </div>
        </div>
      </section>
    </main>
  )
}
