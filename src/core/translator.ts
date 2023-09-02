import { translate } from '@vitalets/google-translate-api';
import * as bingTranslator from 'bing-translate-api';
import createHttpProxyAgent from 'http-proxy-agent';
import { LanguageCode, Sources } from '..';
import { warn } from '../utils/console';
import { default_value } from '../utils/micro';
import axios from 'axios';
import * as ignorer from './ignorer';
import { safeValueTransition } from './core';

export async function plaintranslate(str: string, from: LanguageCode, to: LanguageCode): Promise<string> {
    let { // map the subset of string need to be ignored
        word: ignored_str, 
        double_brackets_map, 
        single_brackets_map 
    } = ignorer.map(str);
    try { // translate in try-catch to keep continuity
        let translatedStr = await translateSourceFunction(global.source)(ignored_str, from, to); // translate with proper source
        translatedStr = ignorer.unMap(translatedStr, double_brackets_map, single_brackets_map); // put ignored values back
        global.totalTranslated = global.totalTranslated + 1;
        return translatedStr;
    } catch (e) { // error case -> return
        warn(`\nerror while translating \n\t"${str}" \nassigned "--" instead of exit from cli.`);
        global.totalTranslated = global.totalTranslated + 1;
        return default_value;
    }
}

function translateSourceFunction(source: string) {
    switch (source) {
        case Sources.LibreTranslate:
            return translateWithLibre;

        case Sources.ArgosTranslate:
            return translateWithArgos;

        case Sources.BingTranslate:
            return translateWithBing;

        default:
            return translateWithGoogle;
    }
}

async function translateWithLibre(str: string, from: LanguageCode, to: LanguageCode): Promise<string> {
    let body = {
        q: safeValueTransition(str),
        source: from,
        target: to,
        format: 'text',
        api_key: '',
        secret: '2NEKGMB',
    };

    const { data } = await axios.post(
        'https://libretranslate.com/translate', body, 
        { headers: { Origin: 'https://libretranslate.com' } }
    );

    return data?.translatedText ? data?.translatedText : default_value;
}

async function translateWithArgos( str: string, from: LanguageCode, to: LanguageCode): Promise<string> {
    let body = {
        q: safeValueTransition(str),
        source: from,
        target: to,
    };

    const { data } = await axios.post(
        'https://translate.argosopentech.com/translate', body, {
            headers: {
                Origin: 'https://translate.argosopentech.com',
                Referer: 'https://translate.argosopentech.com'
            }
        }
    );

    return data?.translatedText ? data?.translatedText : default_value;
}

async function translateWithBing(str: string, from: LanguageCode, to: LanguageCode): Promise<string> {
    const { translation } = await bingTranslator.translate(safeValueTransition(str), from, to, false);
    return translation;
}

async function translateWithGoogle(str: string, from: LanguageCode, to: LanguageCode): Promise<string> {
    if (global.proxyList && global.proxyList.length > 0 && global.proxyIndex !== -1) { // if proxy list provided
        let proxy = global.proxyList[global.proxyIndex];
        if (proxy) { // new proxy exist
            let agent = createHttpProxyAgent(`http://${proxy}`);
            let translatedStr = await translateWithGoogleByProxySupport(str, from, to, { agent, timeout: 4000 });
            return translatedStr;
        } else {
            warn('No new proxy exists, continuing without proxy');
            global.proxyIndex = -1;
            let translatedStr = await translateWithGoogleByProxySupport(str, from, to);
            return translatedStr;
        }
    } else { // translate without proxy
        let translatedStr = await translateWithGoogleByProxySupport(str, from, to);
        return translatedStr;
    }
}

async function translateWithGoogleByProxySupport(str: string, from: LanguageCode, to: LanguageCode, options?: { agent: any; timeout: number }) {
    const { text } = await translate(safeValueTransition(str), {
        from: from, to: to,
        fetchOptions: { agent: options !== undefined ? options.agent : undefined },
    });

    return text;
}
