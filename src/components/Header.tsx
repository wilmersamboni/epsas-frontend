import React from 'react'
import type { HeaderInput } from '../types/Header'


type Props = {
    headerData: HeaderInput
}


function Header({ headerData }: Props) {
    return (
        <div>
            <header className='text-white bg-gradient-to-l from-blue-700 via-blue-800 to-blue-900  focus:ring-4  fixed w-full top-0 left-0 h-16 items-center text-white flex justify-between px-4'>
                
                {/* 1. Elemento Izquierdo de Relleno (Para centrar el H1) */}
                <div className="w-1/3">
                    
                </div>

                {/* 2. Título Centrado */}
                <h1 className='text-3xl font-bold'> {headerData.title}</h1>

                {/* 3. Elemento Derecho (Búsqueda) */}
                <div className="w-1/3 flex justify-end items-center">
                    <label htmlFor="search-input" className="mr-2  text-lg">Buscar : </label>
                    <input 
                        type="search" 
                        name="search"
                        placeholder={headerData.search}
                        id="search-input" 
                        className="h-8 pl-3 pr-4 text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1"
                    />
                </div>
            </header>
        </div>
    )
}

export default Header