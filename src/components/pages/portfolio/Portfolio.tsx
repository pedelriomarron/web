import { useEffect, useState } from 'react';
import Header from '../../includes/Header';
import { Repo } from './Repo';
import { Text } from '../../../containers/Language';
import { getRepos, type GithubRepo } from '../../../services/RepoService';

export const Portfolio = () => {
    const [repos, setRepos] = useState<GithubRepo[] | null>(null)
    const [error, setError] = useState(false)

    useEffect(() => {
        const abortController = new AbortController()
        getRepos(abortController.signal)
            .then(setRepos)
            .catch(e => { if (e.name !== 'AbortError') setError(true) })
        return () => abortController.abort()
    }, [])

    return (
        <>
            <Header title="header_portfolio" subtitle="header_portfolio_sub" url="/portfolio" />
            <div className="mx-auto max-w-6xl px-6 md:px-12">
                {error
                    ? <p className="text-muted text-center"><Text tid="portfolio_error" /></p>
                    : !repos
                        ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-4">
                            {Array.from({ length: 6 }, (_, i) => <div key={i} className="skeleton h-80 rounded-3xl" />)}
                        </div>
                        : repos.length < 1
                            ? <p className="text-muted text-center"><Text tid="portfolio_empty" /></p>
                            : <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-4">
                                {repos.map((repo, i) => <Repo key={repo.full_name} repo={repo} index={i} />)}
                            </div>
                }
            </div>
        </>
    )
}
