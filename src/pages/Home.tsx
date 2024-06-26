import React from 'react';
import {useLazyGetUserReposQuery, useSearchUsersQuery} from "../store/github/github.api";
import {useDebounce} from "../hooks/debounce";
import {ReposCard} from "../components/ReposCard";


 const Home = () => {

    const [dropDown, setDropDown] = React.useState(false)
    const [search, setSearch] = React.useState<string>('')
    const debounced = useDebounce(search)
    const {isLoading, isError, data} = useSearchUsersQuery(debounced , {
        skip: debounced.length < 3,
        refetchOnFocus: true
    })

    const [fetchRepos, {isLoading: areReposLoading, data: repos}] = useLazyGetUserReposQuery()

    React.useEffect(() => {
     setDropDown(debounced.length > 3 && data?.length! > 0)

    }, [debounced, data])


    const clickHandler = (username: string) => {
        fetchRepos(username)
        setDropDown(false)
    }

    return (
        <div className='flex justify-center pt-10 mx-auto h-screen w-screen'>
            {isError && <p className='text-center text-amber-700'>что-то пошло не так!</p>}

            <div className='relative w-[560px]'>
                <input
                    type="text"
                    className='border py-2 px-4 w-full h-[42px] mb-2'
                    placeholder='Поиск по Гитхабу'
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                />
                {dropDown && <ul className='list-none absolute top-[42px] left-0 right-0 max-h-[200px] overflow-y-scroll shadow-md bg-white'>
                    {isLoading && <p className='text-center'>Загрузка...</p>}
                    {
                        data?.map(user => (
                            <li
                            key={user.id}
                            onClick={() => clickHandler(user.login)}
                            className='py-2 px-4 hover:bg-blue-200 hover:text-blue-900 transition-colors cursor-pointer'
                            >
                                {user.login}
                            </li>
                        ))
                    }
                </ul>}
                <div className='container'>
                    {areReposLoading && <p>Репозитории загружаются...</p>}
                    { repos?.map((repo) =><ReposCard repo={repo} key={repo.id}/>)}
                </div>
            </div>
        </div>
    );
};

export default Home;