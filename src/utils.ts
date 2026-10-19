// "my_cool-repo" -> "my cool repo"
export function correctTitle(str: string) {
    return str.toLowerCase().replace(/[-_]/g, ' ').trim();
}
