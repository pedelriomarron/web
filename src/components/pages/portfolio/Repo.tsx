import { useEffect, useState } from 'react';
import { Eye, Star } from 'lucide-react';
import { correctTitle } from '../../../utils';
import { getLanguages, previewOf, type GithubRepo } from '../../../services/RepoService';
import { GithubIcon } from '../../includes/Brands';
import { Text } from '../../../containers/Language';
import { colorOf } from '../../../nav';
import { trackSpotlight } from '../../../hooks';

export function Repo({ repo, index }: { repo: GithubRepo, index: number }) {
    const [languages, setLanguages] = useState<string[]>([])

    useEffect(() => {
        const abortController = new AbortController()
        getLanguages(repo, abortController.signal).then(setLanguages).catch(() => { })
        return () => abortController.abort()
    }, [repo])

    return (
        <article onPointerMove={trackSpotlight}
            style={{ '--accent': colorOf('/portfolio'), '--i': index } as React.CSSProperties}
            className="spotlight surface rise group flex flex-col overflow-hidden rounded-3xl transition-transform duration-500 ease-(--ease-spring) hover:-translate-y-2">
            <div className="relative aspect-[16/10] md:aspect-video overflow-hidden bg-(--border)">
                <img className="size-full object-cover object-top transition-transform duration-700 ease-(--ease-out-expo) group-hover:scale-105" src={previewOf(repo)} alt="" loading="lazy" />
                {repo.stargazers_count > 0 &&
                    <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-ink/70 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
                        <Star className="size-3 fill-yellow-400 text-yellow-400" /> {repo.stargazers_count}
                    </span>}
            </div>
            <div className="flex flex-1 flex-col p-6 md:p-5">
                <h3 className="text-lg font-bold capitalize">{correctTitle(repo.name)}</h3>
                <p className="text-muted mt-1 line-clamp-2 text-sm">{repo.description ?? "..."}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                    {languages.map(item => <li key={item} className="rounded-full bg-(--border) px-2.5 py-0.5 font-mono text-[11px]">#{item}</li>)}
                </ul>
                <div className="mt-auto flex gap-2 pt-6 md:pt-4">
                    {repo.homepage &&
                        <a rel="noopener noreferrer" target="_blank" href={repo.homepage}
                            className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-xs font-semibold text-white transition hover:-translate-y-0.5 dark:bg-white dark:text-ink">
                            <Eye className="size-3.5" /> <Text tid="portfolio_demo" />
                        </a>}
                    <a rel="noopener noreferrer" target="_blank" href={repo.html_url}
                        className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold ring-1 ring-(--border) transition hover:-translate-y-0.5 hover:bg-(--border)">
                        <GithubIcon className="size-3.5" /> <Text tid="portfolio_code" />
                    </a>
                </div>
            </div>
        </article>
    )
}
