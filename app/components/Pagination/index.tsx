"use client"
import React,{ useEffect, useState } from "react";

interface IPaginationProps {
    totalitem: number,
    paginate: any,
}

const Pagination = ({totalitem, paginate}:IPaginationProps) => {
    const [currentpage, setCurrentpage] = useState<number>(0);
    const [sayi1, setSayi1] = useState(0);
    const [sayi2, setSayi2] = useState(3);
    const [sayi3, setSayi3] = useState(3);
    const [sayi4, setSayi4] = useState(6);
    const pageNumber = [];


    for (let i = 1; i <= Math.ceil(totalitem); i++) {
        pageNumber.push(i);
    }

    useEffect(()=>{
        setCurrentpage(pageNumber.length)
    },[]);

    let comp;
    if(pageNumber.length > 6){
         comp = <nav aria-label="Page navigation example">
        <ul className="flex justify-end items-center gap-3">
          {pageNumber.includes(currentpage - 1) &&<li className="p-2 bg-[#1F2937] text-white rounded-lg cursor-pointer"> <a className="page-link" href={void(0)} onClick={(e) => {
                    setCurrentpage(currentpage - 1);
                    paginate(currentpage - 1);
                    setSayi1(sayi1 - 1);
                    setSayi2(sayi2 - 1);
                    setSayi3(sayi3 - 1);
                    setSayi4(sayi4 - 1);
                }}>
                    Prev
                </a></li>}
          {pageNumber.slice(sayi1, sayi2).map((number) => {
                    return (
                        <li key={number} className="p-2 bg-[#1F2937] text-white rounded-lg cursor-pointer">
                             <a className="page-link"  href={void(0)} onClick={(e) => {
                            setCurrentpage(number);                        
                            paginate(number);
                        }} > {number} </a></li>
                    )
                
            })} 
          { pageNumber.length > 6 ? (<li className="page-item disabled"><a className="page-link" aria-disabled="true" href={void(0)}>...</a></li>): ""}
          {pageNumber.slice(sayi3, sayi4).map((number) => {
                    return (
                        <li key={number} className="p-2 bg-[#1F2937] text-white rounded-lg cursor-pointer">
                        <a className="page-link"  href={void(0)} onClick={(e) => {
                            setCurrentpage(number);                        
                            paginate(number);
                        }} > {number} </a></li>
                    )
            })} 
          {pageNumber.includes(currentpage + 1) && <li className="p-2 bg-[#1F2937] text-white rounded-lg cursor-pointer"> <a className="page-link" href={void(0)} onClick={(e) => {
                    setCurrentpage(currentpage + 1);
                    paginate(currentpage + 1);
                    setSayi1(sayi1 - 1);
                    setSayi2(sayi2 - 1);
                    setSayi3(sayi3 - 1);
                    setSayi4(sayi4 - 1);
                }}>
                    Next
                </a></li>}
        </ul>
         </nav>
    }
    else {
        comp = <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center align-items-center">
          {pageNumber.includes(currentpage - 1) &&<li className="page-item"> <a className="page-link" href={void(0)} onClick={(e) => {
                    setCurrentpage(currentpage - 1);
                    paginate(currentpage - 1);
                    setSayi1(sayi1 - 1);
                    setSayi2(sayi2 - 1);
                    setSayi3(sayi3 - 1);
                    setSayi4(sayi4 - 1);
                }}>
                    Prev
                </a></li>}
          {pageNumber.slice(sayi1, sayi2).map((number) => {
                    return (
                        <li key={number} className="page-item">
                             <a className="page-link"  href={void(0)} onClick={(e) => {
                            setCurrentpage(number);                        
                            paginate(number);
                        }} > {number} </a></li>
                    )
                
            })} 
          {pageNumber.slice(sayi3, sayi4).map((number) => {
                    return (
                        <li key={number} className="page-item">
                        <a className="page-link"  href={void(0)} onClick={(e) => {
                            setCurrentpage(number);                        
                            paginate(number);
                        }} > {number} </a></li>
                    )
            })} 
          {pageNumber.includes(currentpage + 1) && <li className="page-item"> <a className="page-link" href={void(0)} onClick={(e) => {
                    setCurrentpage(currentpage + 1);
                    paginate(currentpage + 1);
                    setSayi1(sayi1 - 1);
                    setSayi2(sayi2 - 1);
                    setSayi3(sayi3 - 1);
                    setSayi4(sayi4 - 1);
                }}>
                    Next
                </a></li>}
        </ul>
         </nav>
    }

    return (
        <section className="my-4">
           {comp}
        </section>
    )
}

export default Pagination