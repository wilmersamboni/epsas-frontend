import React from 'react'
import type { HeaderInput } from '../types/Header'


type Props = {
    headerData: HeaderInput
}


function Header({ headerData }: Props) {
    return (
      <div>
  <header className='
    text-white 
    bg-gradient-to-l from-[#007832] via-[#00304D] to-[#00304D]
    fixed w-full top-0 left-0 h-16 
    flex items-center justify-between px-4 
    shadow-md z-50
  '>
      
      {/* 1. Elemento Izquierdo */}
      <div className="w-1/3"></div>

      {/* 2. Título Centrado */}
      <h1 className='text-3xl font-bold tracking-wide'>
        {headerData.title}
      </h1>

      {/* 3. Elemento Derecho (Búsqueda) */}
      <div className="w-1/3 flex justify-end items-center">
          <label 
            htmlFor="search-input" 
            className="mr-2 text-lg text-white/90"
          >
            Buscar:
          </label>

          <input 
              type="search" 
              name="search"
              placeholder={headerData.search}
              id="search-input" 
              className="
                h-9 pl-3 pr-4 text-sm 
                text-[#00304D] 
                bg-[#F6F6F6] 
                border border-[#39A900]/40 
                rounded-lg 
                focus:outline-none 
                focus:ring-2 
                focus:ring-[#39A900]
                focus:border-[#39A900]
                transition
              "
          />
      </div>
  </header>
</div>
    )
}

export default Header