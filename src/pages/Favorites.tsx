import React from 'react';
import {useAppSelector} from "../hooks/redux";

const Favorites = () => {
   const {favorites} =  useAppSelector(state => state.github)

    if(favorites.length === 0) return <p className='text-center mt-10'>Избранного пока нет</p>
    return (
        <div className='flex justify-center pt-10 mx-auto h-screen w-screen'>
            <ul className='list-none '>
                {favorites.map(f => (
                    <li className='mt-2' key={f}>
                        <a href={f} target="_blank">{f}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Favorites;