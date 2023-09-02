import { getLanguages } from '..';
import * as packageJSON from '../../package.json';

export function getLanguageFromCode(language_code: string) {
    return getEnumKeyByEnumValue(getLanguages(), language_code);
}

export function getCodeFromLanguage(language: string) {
    let languages = getLanguages();
    return (languages as any)[language as keyof typeof languages];
}

function getEnumKeyByEnumValue(myEnum: any, enumValue: number | string): string {
    let keys = Object.keys(myEnum).filter(x => myEnum[x] === enumValue);
    return keys.length > 0 ? keys[0] : '';
}

export function translationStatistic(totalTranslated: number, totalTranslation: number): string {
    let tt1 = totalTranslated.toString().length, 
        tt2 = totalTranslation.toString().length, j = ''
    if (tt1 < tt2) for (let i = 0; i < tt2 - tt1; i++) j += '0'
    return `${totalTranslation} kelimeden ${j + totalTranslated} tane çevrildi`;
}

export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const current_version = packageJSON.version;
export const default_value = '--';
export const translation_value_limit = 5000;
