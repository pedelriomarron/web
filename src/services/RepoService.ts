const user: string = "pedelriomarron"
const url: string = `https://api.github.com/users/${user}/repos`;

export interface GithubRepo {
    name: string
    full_name: string
    description: string | null
    homepage: string | null
    html_url: string
    default_branch: string
    stargazers_count: number
    fork: boolean
    pushed_at: string
}

// Session cache: the unauthenticated GitHub API only allows 60 requests/hour
async function cached<T>(key: string, load: () => Promise<T>): Promise<T> {
    try {
        const hit = sessionStorage.getItem(key);
        if (hit) return JSON.parse(hit);
    } catch { /* ignore */ }
    const data = await load();
    try { sessionStorage.setItem(key, JSON.stringify(data)); } catch { /* ignore */ }
    return data;
}

async function request<T>(url: string, signal?: AbortSignal): Promise<T> {
    const response = await fetch(url, { signal });
    if (!response.ok) throw new Error(`GitHub ${response.status}`);
    return response.json();
}

export const previewOf = (repo: GithubRepo) =>
    `https://raw.githubusercontent.com/${repo.full_name}/${repo.default_branch}/config/preview.png`

// Like in 2020, only repos with a config/preview.png make it into the portfolio
function hasPreview(src: string) {
    return new Promise<boolean>(resolve => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = src;
    });
}

export function getRepos(signal?: AbortSignal) {
    return cached('repos', async () => {
        const repos = await request<GithubRepo[]>(url + "?sort=updated&per_page=100", signal);
        const checks = await Promise.all(repos.map(repo => hasPreview(previewOf(repo))));
        return repos.filter((_, i) => checks[i]);
    });
}

export function getLanguages(repo: GithubRepo, signal?: AbortSignal) {
    return cached(`languages:${repo.full_name}`, async () =>
        Object.keys(await request<Record<string, number>>(`https://api.github.com/repos/${repo.full_name}/languages`, signal)));
}
