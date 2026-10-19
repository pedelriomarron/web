import en, { type Dictionary } from './en';
import es from './es';

export type LangId = 'en' | 'es';
export type TextId = keyof Dictionary;

export const dictionaryList: Record<LangId, Dictionary> = {
    en,
    es
};

export const languageOptions: { id: LangId, text: string }[] = [
    { id: 'es', text: 'ES' },
    { id: 'en', text: 'EN' }
];
