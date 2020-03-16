export class LangService {

    langAvailable: Array<string> = ["en", "es"]
    langDefault: string = "en"
    config: config = {
        lang: window.navigator.language.substring(0, 2)
    }

    constructor() {
        this.cargarconfig();
    }

    guardarconfig() {
        localStorage.setItem('config', JSON.stringify(this.config));
    }
    cargarconfig() {

        if (this.config.lang) {
            if (localStorage.getItem('config')) {
                this.config = JSON.parse(localStorage.getItem('config') + "");
            }
        }
        if (!this.langAvailable.includes(this.config.lang)) {
            this.config.lang = this.langDefault
        }

        this.applyLang(this.config.lang);

    }
    applyLang(lang: string) {

        this.config.lang = lang;
        this.guardarconfig();
    }
}

interface config {
    lang: string;
}