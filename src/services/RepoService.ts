import { Utils } from "../utils";

const user: string = "pedelriomarron"
const url: string = `https://api.github.com/users/${user}/repos`;

export async function getRepos(config: any) {
    let data = await Utils.request(url, config);
    return data


}

