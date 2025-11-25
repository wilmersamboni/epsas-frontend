import React from 'react';
import type { CardsInfo } from '../types/Cards';


const Card = ({title, foto, url}: CardsInfo) => {
  return (
    <div className="relative flex w-80 flex-col rounded-xl  bg-clip-border  shadow-xl/20 bg-gray-200">
      <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl  bg-clip-border    inset-shadow-sm">
      <img src={foto} alt="" />
      </div>
      <div className="p-6">
        <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
          
        </h5>
        <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
          
        </p>
      </div>
      <div className="p-6 pt-0 text-xl font-bold ">
        <h1>{title}</h1>
      </div>

      
    </div>
  );
}

export default Card;
