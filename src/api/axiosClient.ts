import React from 'react'
import { useState } from 'react';
import type { SiderBarMenu, SiderBarMenuCard, SiderBarMenuLogo } from '../types/SiderBar';
import { VscMenu } from 'react-icons/vsc'
import { Link } from 'react-router-dom';



type Props = {
    items: SiderBarMenu[];
    card: SiderBarMenuCard;
    logo: SiderBarMenuLogo;
}
const SEPARATOR_AFTER_INDEX = 4;
function SiderBar({ items, card, logo }: Props) {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    return (
        
        <div onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => { setIsOpen(false) }}
            className={` ${isOpen ? 'w-60 '  : 'w-16'} text-white bg-gradient-to-t from-blue-700 via-blue-800 to-blue-900 hover:bg-gradient-to-bt focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 h-screen p-2 pt-8 fixed duration-400 text-white flex flex-col `}>
                {/* logo */}
                <div className={`
                        flex items-center p-2  rounded-md mb-4
                        ${isOpen ? 'justify-center gap-x-4' : 'justify-center'}
                    `}>
                    <img src={logo.fotoUrl} alt="" className={`${isOpen ? "rounded-full w-20 h-20" : "rounded-full w-8 h-8"}`}/>
                </div>

                {/* card de perfil */}
            <div className={`
                        flex items-center cursor-pointer p-2 hover:bg-gray-700 rounded-md mb-4
                        ${isOpen ? 'justify-start gap-x-4' : 'justify-center'}
                    `}>

                <img src={card.fotoUrl} alt="perfil" className="w-8 h-8 rounded-full object-cover" />

                {isOpen && <span className='origin-left duration-200 font-medium'> {"Perfil"} </span>}
            </div>
            {isOpen ? <hr className="border-white my-4" /> : <div className="my-4"></div>}

{/* items del menu */}
            <ul className='flex-1 flex flex-col '>
    {items.map((item, i) => {
        const Icon = item.icon;
        const shouldShowSeparator = i === SEPARATOR_AFTER_INDEX;

        return (
            <React.Fragment key={item.id}>

                    <li>
                  <Link 
                    to={item.url} 
                    className={`flex items-center cursor-pointer p-2 hover:bg-gray-700 rounded-md mt-6
                    ${isOpen ? 'justify-start gap-x-4' : 'justify-center'}`}
                    onClick={item.onClick}
                  >
                    <Icon size={20} />
                    {isOpen && <span>{item.title}</span>}
                  </Link>
                </li>


                {shouldShowSeparator && isOpen && (
                    <hr className="border-white my-4" />
                )}
            </React.Fragment>
        );
    })}
</ul>
        </div>
    )
}

export default SiderBar
