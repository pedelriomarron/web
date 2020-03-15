export class LangService {

    ajustes: Ajustes = {
        lang: window.navigator.language.substring(0, 2)
    }

    constructor() {
        this.cargarAjustes();
    }

    guardarAjustes() {
        localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
    }
    cargarAjustes() {
        if (localStorage.getItem('ajustes')) {
            this.ajustes = JSON.parse(localStorage.getItem('ajustes') + "");

        } else {
        }
        this.applyLang(this.ajustes.lang);

    }
    applyLang(lang: string) {

        this.ajustes.lang = lang;
        this.guardarAjustes();
    }
}

interface Ajustes {
    lang: string;
}