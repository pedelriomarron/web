import React, { useState, useEffect } from 'react';
import Header from '../../includes/Header';
import Loading from '../../includes/Loading';

import { Repo } from './Repo'
import { getRepos } from '../../../services/RepoService';





export const Portfolio = () => {



    const [isLoading, setIsLoading] = useState(true)
    const [products, setProducts] = useState([])

    useEffect(() => {

        const abortController = new AbortController()
        const signal = abortController.signal

        async function loadProducts() {
            const response: any = await getRepos({ signal });
            setProducts(response)
            setIsLoading(false)
        }
        loadProducts()
        return () => abortController.abort()




    }, [])





    return (
        <React.Fragment>
            <Header title="Portfolio" subtitle="Show my repos " classColor="bg-green-200"></Header>
            <div className="p-3">
                {
                    isLoading
                        ? <Loading />
                        : products.length < 1 ? <div className="has-text-centered">No hay Repos disponibles</div>
                            : products.length > 0 && <div className="flex flex-wrap justify-center w-full">{products.map((product, i) => <div key={i} className=" md:w-1/3 lg:w-1/4 p-2"><Repo  {...product} /></div>)}</div>
                }


            </div>
        </React.Fragment>
    )

}