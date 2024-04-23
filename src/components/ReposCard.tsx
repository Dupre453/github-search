import React from 'react';
import {IRepo} from "../models/models";
import {useActions} from "../hooks/actions";
import {useAppSelector} from "../hooks/redux";


export function ReposCard({repo}: {repo: IRepo})  {

    const {favorites} = useAppSelector(state => state.github)

    const [isFav, setIsFav] = React.useState(favorites.includes(repo.html_url))
    const {addFavorite,removeFavorite} = useActions()

    const addToFav = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        addFavorite(repo.html_url)
        setIsFav(true)
    }

    const removeFromFav = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        removeFavorite(repo.html_url)
        setIsFav(false)
    }


    return (
        <div className='border py-4 px-5 rounded mb-2 hover:shadow-md hover: bg-blue-200 transition-all hover:text-blue-900'>
            <a href={repo.html_url} target='_blank'>
            <h2 className='text-lg font-bold'>
                {repo.full_name}
            </h2>
            <p className='text-sm'>
                Forks: <span className='font-bold mr-2'>{repo.forks}</span>
                Watchers: <span className='font-bold'>{repo.watchers}</span>
            </p>
            <p className='text-sm font-thin'>{repo?.description}</p>

                {!isFav && <button
                    className='py-1 px-4 mr-3 mt-2 bg-blue-700 text-amber-50 rounded-3xl hover:bg-blue-400 transition-all'
                    onClick={addToFav}>Добавить
                </button>}

                {isFav && <button
                    className='py-1 px-4 mt-2 bg-purple-800 text-amber-50 rounded-3xl hover:bg-purple-400 transition-all'
                    onClick={removeFromFav}>Удалить
                </button>}
            </a>
        </div>
    );
};
