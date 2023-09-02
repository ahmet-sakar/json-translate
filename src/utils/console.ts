import { translatorsNames } from '..';
import { current_version } from './micro';

var figlet = require('figlet');
const cli_name = 'jsontt';
const success_color = '\x1b[32m';
const error_color = '\x1b[31m';
const info_color = '\x1b[34m';
const warn_color = '\x1b[33m';

export function success(message: string) {
    console.log(success_color, `${message}`, '\x1b[0m');
}

export function error(message: string) {
    console.log(error_color, `${message}`, '\x1b[0m');
}

export function info(message: string) {
    console.log(info_color, `${message}`, '\x1b[0m');
}

export function warn(message: string) {
    console.log(warn_color, `${message}`, '\x1b[0m');
}

export const commands = { help1: '--help', help2: '-h' };
export const language_choices: { [key: string]: string } = {
    GoogleTranslate: `Google Translate (104 Dil)`,
    BingTranslate: 'Bing Microsoft Translate (110 Dil) \x1b[33m**YENİ**\x1b[0m',
    LibreTranslate: `Libre Translate (29 Dil)`,
    ArgosTranslate: `Argos Translate (17 Dil)`,
};

export const supportedLanguagesUrl = `Desteklenen Diller : ${info_color}https://github.com/mololab/json-translator/blob/master/docs/LANGUAGES.md\x1b[0m`;
export const messages = {
    cli: {
        header: `\n${success_color + figlet.textSync('json translator')}\x1b[0m\n`,
        prompt: `
  Kullanım: ${cli_name} / npm run start <path/file.json>
  Açıklama: Bu paket, JSON dosyalarınızı veya nesnelerinizi ücretsiz olarak farklı dillere çevirme olanağı sağlayacaktır.
  
  Proxy liste dosyası kullanım :  ${cli_name} <path/file.json> <path/proxy_list.txt>
  Seçeneklerle kullanım        :  ${cli_name} <path/file.json> --translator <TranslationService> --from <Language> --to <Languages...>
  Desteklenen Diller           :  ${info_color}https://github.com/mololab/json-translator/blob/master/docs/LANGUAGES.md\x1b[0m
        `,
        prompt2: `
  Kullanım: jsontt <path/file.json>
  Açıklama: Bu paket, JSON dosyalarınızı veya nesnelerinizi ücretsiz olarak farklı dillere çevirme olanağı sağlayacaktır.
  Options:
      -V, --version               Sürüm numarasını gösterir
      -T, --translator <Çeviri>   Çeviri Hizmetini seçin (\'google\, \'libre\', \'argos\', \'bing\')
      -f, --from <Dil>            Çevirilecek dil, ör: --from en
      -t, --to <Dil(ler)>         İstenilen dil(ler), ör: --to ar fr
      -h, --help                  Komutları gösterir
  
  Proxy liste dosyası kullanım :  ${cli_name} <path/file.json> <path/proxy_list.txt>
  Seçeneklerle kullanım        :  ${cli_name} <path/file.json> --translator <TranslationService> --from <Language> --to <Languages...>
  Desteklenen Diller           :  ${info_color}https://github.com/mololab/json-translator/blob/master/docs/LANGUAGES.md\x1b[0m
        `,
        welcome: `\n Hoşgeldiniz\n     cli ${current_version}\n${success_color + figlet.textSync('json-translator')}\x1b[0m\n`,
        description: ' Açıklama: Bu paket, JSON dosyalarınızı veya nesnelerinizi ücretsiz olarak farklı dillere çevirme olanağı sağlayacaktır.',
        usage: '<path/file.json>',
        usageWithProxy: `  Proxy liste dosyası kullanım : ${cli_name} <path/file.json> <path/proxy_list.txt>`,
        usageByOps: `  Seçeneklerle kullanım        : ${cli_name} <path/file.json> --translator <TranslationService> --from <Language> --to <Languages...>`,
        paths: 'gerekli json dosya yolu <path/file.json> veya proxy listesi içeren json dosyası txt dosya yolu <path/file.json> <path/proxy_list.txt>',
        translator: 'çeviri hizmetini belirtin',
        from: 'çevrilecek dil(ler), ör: --from en',
        to: 'Çeviri yapılacak diller, ör: --to ar fr zh-CN',
        from_source: 'Hangi kaynaktan?',
        from_message: 'Hangi dilden?',
        to_message: 'Hangi dile (Boşluk tuşuyla birden fazla seçilebilir)',
        translator_not_available: `Çevirmen kullanılamıyor. (seçenekler: ${translatorsNames})`,
        from_not_available: `buradaki çeviri dili mevcut değil\n${supportedLanguagesUrl}`,
        to_not_available: `Çeviri yapılacak diller mevcut değil\n${supportedLanguagesUrl}`,
        no_selected_language: 'Herhangi bir dil seçmediniz. Lütfen tekrar deneyin ve boşluk çubuğunu kullanarak dilleri seçin.',
        proxy_File_notValid_or_not_empty_options: `
        - Lütfen "-T, --translator <Çeviri>" seçeneğinin değerinin uyumlu olduğundan emin olun
        - Lütfen "-f, --from <Dil>" seçeneğinin değerinin uyumlu olduğundan emin olun
        - Lütfen "-t, --to <Diller...>" seçeneğinin değerinin uyumlu olduğundan emin olun
        - Lütfen "<path/proxy_list.txt>" adresinde proxy listesi dosyası için geçerli bir yol sağladığınızdan emin olun.".
        `, creation_done: 'Tüm dosyalar oluşturuldu! Bunları orijinal JSON dosyasıyla aynı klasörde bulabilirsiniz.',
    }, object: {},
    file: {
        no_path: 'Klasör bulunamadı.',
        no_file_in_path: 'Dosya bulunamadı.',
        cannot_translate: 'Dosya çevrilemedi.',
        cannot_save_file: 'Dosya kaydedilemedi.',
    }, cgi: {
        name: `\n${success_color + figlet.textSync('json translator')}\x1b[0m\n`,
        usage: '  Kullanım: jsontt <path/file.json>',
        description: '  Açıklama: Bu paket, JSON dosyalarınızı veya nesnelerinizi ücretsiz olarak farklı dillere çevirme olanağı sağlayacaktır.',
        options: '  Options:',
        opt1: '    -V, --version               Sürüm numarasını gösterir',
        opt2: '    -T, --translator <Çeviri>   Çeviri Hizmetini seçin (\'google\, \'libre\', \'argos\', \'bing\')',
        opt3: '    -f, --from <Dil>            Çevirilecek dil, ör: --from en',
        opt4: '    -t, --to <Dil(ler)>         İstenilen dil(ler), ör: --to ar fr',
        opt5: '    -h, --help                  Komutları gösterir\n',
        usageWithProxy: `  Proxy liste dosyası kullanım : ${cli_name} <path/file.json> <path/proxy_list.txt>`,
        usageByOps: `  Seçeneklerle kullanım        : ${cli_name} <path/file.json> --translator <TranslationService> --from <Language> --to <Languages...>`,
        supportedLanguages: `  Desteklenen Diller           : ${info_color}https://github.com/mololab/json-translator/blob/master/docs/LANGUAGES.md\x1b[0m`
    }
};
