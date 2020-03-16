import React, { useContext, useEffect } from 'react';
import { languageOptions } from '../../languages/index';
import { LanguageContext } from '../../containers/Language';
import { LangService } from '../../services/LangService';



export default function LanguageSelector() {

    let lang = new LangService()
    const languageContext: any = useContext(LanguageContext);


    const change = (langStr: string) => {
        const selectedLanguage = languageOptions.find((item: any) => item.id === langStr);
        // set selected language by calling context method
        languageContext.setLanguage(selectedLanguage);
        lang.applyLang(langStr)
    }
    const handleLanguageChange = (event: any) => {
        change(event.target.value)
    };


    useEffect(() => {
        change(lang.config.lang)

    })


    const select = () => {

        return <select onChange={handleLanguageChange}
            value={languageContext.language.id} className=" mb-3 mt-3 mr-3  bg-gray-200 border border-gray-200 text-black  py-2 px-4 pr-8  rounded ">
            {languageOptions.map((item: any) => (
                <option
                    key={item.id}
                    value={item.id}
                >
                    {item.text}
                </option>

            ))
            }
        </select >
    }

    return (
        <React.Fragment>

            {select()}

        </React.Fragment>

    );
};