import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { firstValueFrom, map, Observable } from 'rxjs';
import { KeyChain, languagesList } from './translations.helper';
import { BaseComponentDirective } from './base/base-component.directive';

const languageLocalStorageKey = 'language';
type getTranslateKeys<T extends string> =
  T extends `${infer Prefix}{{ ${infer Word} }}${infer Suffix}`
    ? Word extends string
      ? getTranslateKeys<Prefix> | Word | getTranslateKeys<Suffix>
      : never
    : never;

// Define a type that extracts the final value type from the object based on the key chain

type ReplaceKeys<
  T extends string,
  U extends Record<string, any>
> = T extends `${infer Prefix}{{ ${infer Key} }}${infer Suffix}`
  ? Key extends keyof U
    ? `${Prefix}${U[Key]}${ReplaceKeys<Suffix, U>}`
    : `${Prefix}{{ ${Key} }}${ReplaceKeys<`{{${Key}}}${Suffix}`, U>}`
  : T;

type MergeObjects<T extends object[]> = T extends [infer First, ...infer Rest]
  ? First & MergeObjects<Rest extends object[] ? Rest : []>
  : object;

type ValueInObjKeyChain<
  T,
  K extends string
> = K extends `${infer Head}.${infer Tail}`
  ? Head extends keyof T
    ? ValueInObjKeyChain<T[Head], Tail>
    : never
  : K extends keyof T
  ? T[K]
  : never;

@Injectable({
  providedIn: 'root',
})
export class AppTranslateService<
  TranslationArr extends object[] = null,
  T extends object = TranslationArr extends null
    ? null
    : MergeObjects<TranslationArr>
> extends BaseComponentDirective {
  constructor(
    private translateService: TranslateService,
    @Inject(LOCALE_ID) public locale: string
  ) {
    super();
    this.onLangChange = this.translateService.onLangChange.pipe(
      this.takeUntilDestroy(),
      map(
        (event: LangChangeEvent) =>
          event as LangChangeEvent & { lang: languagesList }
      )
    );
    this.onLangChange.subscribe((event: LangChangeEvent) => {
      localStorage.setItem(languageLocalStorageKey, event.lang);
    });
  }

  public readonly onLangChange:Observable<LangChangeEvent & {
    lang: languagesList;
}> 

  // TODO: fix type and extend functionality
  public instant = <
    K extends string = T extends null ? string : KeyChain<T>,
    KeyChainKey extends string = K extends KeyChain<T>
      ? ValueInObjKeyChain<T, K> extends string
        ? ValueInObjKeyChain<T, K>
        : string
      : K,
    interpolateParamsTypeKeys extends string = string extends KeyChainKey
      ? string
      : getTranslateKeys<KeyChainKey>,
    interpolateParamsType extends {
      [key in interpolateParamsTypeKeys]: string;
    } = {
      [key in interpolateParamsTypeKeys]: string;
    }
  >(
    key: K,
    interpolateParams?: interpolateParamsType
  ): ReplaceKeys<KeyChainKey, typeof interpolateParams> => {
    if (!key) return null;
    return this.translateService.instant(key, interpolateParams);
  };

  public setTranslation(
    lang: languagesList,
    translations: object,
    shouldMerge?: boolean
  ) {
    return this.translateService.setTranslation(
      lang,
      translations,
      shouldMerge
    );
  }

  public get translations() {
    return this.translateService.translations;
  }

  public use(language: languagesList) {
    this.translateService;
    if (language === 'none') {
      this.translateService.resetLang(this.translateService.defaultLang);
      this.translateService.resetLang(this.translateService.currentLang);
    }
    //  else {
    // this.translateService.resetLang(language);
    // this.translateService.setTranslation(language, {});
    // }
    return this.translateService.use(language);
  }

  /**
   * Initializes i18n for the application.
   * Loads language from local storage if present, or sets default language.
   * @param defaultLanguage The default language to use.
   * @param supportedLanguages The list of supported languages.
   */
  public init<T extends languagesList>(
    defaultLanguage: T,
    supportedLanguages: T[]
  ): Promise<any> {
    const userLanguage: string = this.getUsersLocale(this.locale);
    const mainLang =
      supportedLanguages?.find((i) =>
        i?.startsWith(localStorage.getItem(languageLocalStorageKey))
      ) ||
      supportedLanguages?.find((i) => i?.startsWith(userLanguage)) ||
      defaultLanguage;
    this.translateService.addLangs(supportedLanguages);
    this.translateService.setDefaultLang(defaultLanguage);
    debugger
    return firstValueFrom(this.use(mainLang));
  }

  private getUsersLocale(defaultValue: string): string {
    if (
      typeof window === 'undefined' ||
      typeof window.navigator === 'undefined'
    ) {
      return defaultValue;
    }
    const wn = window.navigator as any;
    let lang = wn.languages
      ? (wn.languages as string[])?.find((i) => i?.includes(defaultValue)) ||
        wn?.languages[0]
      : defaultValue;
    lang = lang || wn.language || wn.browserLanguage || wn.userLanguage;
    return lang;
  }

  get currentLang(): languagesList {
    return this.translateService.currentLang as languagesList;
  }

  set currentLang(val: languagesList) {
    this.translateService.currentLang = val;
  }

  get defaultLang(): languagesList {
    return this.translateService.defaultLang as languagesList;
  }
}
