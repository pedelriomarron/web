export class Utils {

    static async  request(url: string, config: any = {}) {
        let response = await fetch(url, config);
        let data = await response.json()
        return data;
    }


}
export function correctTitle(str: string) {
    //Creamos las reglas
    var map: any = {
        '-': '_',
        ' ': '-',
    };
    str = str.toLowerCase();
    for (var pattern in map) {
        str = str.replace(new RegExp(map[pattern], 'g'), pattern);
    };
    return str.trim();
};