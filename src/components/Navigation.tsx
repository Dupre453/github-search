import React from 'react';
import {Link} from "react-router-dom";

const Navigation = () => {
    return (
        <nav className='flex justify-between items-center h-[80px] px-20 border-b-2 text-black font-bold'>
            <h4 className='cursor-pointer'>GitHub Поиск</h4>
            
            <span>
                <Link to='/' className='mr-10'>Главная</Link>
                  <Link to='/favorites'>Избранное</Link>
            </span>
        </nav>
    );
};

export default Navigation;