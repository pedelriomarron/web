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
            clean()
        }
        loadProducts()

        async function clean() {
            abortController.abort()
        }



    }, [])





    return (
        <React.Fragment>
            <Header title="header_portfolio" subtitle="header_portfolio_sub" classColor="bg-pink-500"></Header>
            <div className=" mx-auto mt-10 box-border box-content">
                {
                    isLoading
                        ? <Loading />
                        : products.length < 1 ? <div className="has-text-centered">There are no projects</div>
                            : products.length > 0 && <div className="w-full flex flex-wrap flex-col sm:flex-row  box-border md:flex  flex-wrap   ">{products.map((product, i) => <Repo key={i} {...product}>" md:w-1/3 lg:w-1/4 p-2 "</Repo>)}</div>
                }


            </div>
        </React.Fragment>
    )

}