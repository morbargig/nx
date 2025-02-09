import { CommonModule } from '@angular/common';
import {
  Inject,
  Injectable,
  InjectionToken,
  ModuleWithProviders,
  NgModule,
  Provider,
} from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {
  Observable,
  catchError,
  firstValueFrom,
  forkJoin,
  from,
  map,
  of,
  skip,
  throwError,
} from 'rxjs';
import { AppTranslateService } from './app-translate.service';
import { languagesList, removeConstStringValues } from './translations.helper';

@Injectable()
export class TranslateModuleLoader implements TranslateLoader {
  constructor(
    @Inject(TRANSLATE_MODULE_CONFIG)
    private configs?: TranslateModuleConfig<any>[]
  ) {}
  getTranslation(lang: languagesList): Observable<any> {
    const emptyTranslate = () => firstValueFrom(of({ default: {} }));
    // console.log('TranslateModuleConfig getTranslation:', this.configs);
    const lazyTranslations = (
      config: TranslateModuleConfig<any>
    ): Promise<{
      default: removeConstStringValues<translationsObject>;
    }> => {
      switch (lang) {
        case 'none': {
          return emptyTranslate();
          break;
        }
        case 'he':
        case 'en': {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-extra-non-null-assertion
          return config?.translationsChunks?.[lang]!?.();
          break;
        }
        default: {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-extra-non-null-assertion
          return config?.translationsChunks?.['he']!?.();
          break;
        }
      }
    };
    return forkJoin([
      ...this.configs.map((config) =>
        from(lazyTranslations(config) || emptyTranslate()).pipe(
          map((x) => x?.default || {}),
          catchError(() =>
            throwError(
              () => new Error(`Please check language ${lang} is supported`)
            )
          )
        )
      ),
    ]).pipe(
      // tap((x) => {
      //   debugger;
      // }),
      map((x) => Object.assign({}, ...x))
      // tap((x) => {
      //   debugger;
      // })
    );
  }
}

export const TRANSLATE_MODULE_CONFIG: InjectionToken<
  TranslateModuleConfig<any>
> = new InjectionToken<TranslateModuleConfig<any>>('TranslateModuleConfig');

export const TranslateModuleConfigDefault: Partial<TranslateModuleConfig<any>> =
  {};

export const TranslateModuleConfigProvider = (
  config: TranslateModuleConfig<any>
): Provider => {
  const mergedConfig = { ...TranslateModuleConfigDefault, ...config };
  return {
    provide: TRANSLATE_MODULE_CONFIG,
    useValue: mergedConfig,
    multi: true,
  };
};

type TranslateModuleConfigTranslations<
  defaultTranslations extends translationsObject,
  T extends languagesList = languagesList
> = {
  // defaultLanguage: T;
  defaultLanguage?: T;
  supportedLanguages?: T[];
  moduleType: 'root' | 'child' | 'lazyChild';
  translationsChunks: {
    [P in Exclude<T, 'none'>]: P extends 'he'
      ? () => Promise<{ default: defaultTranslations }>
      : () => Promise<{
          default: removeConstStringValues<defaultTranslations>;
        }>;
  };
};

type StringsJSON = { [k: string]: string | StringsJSON };
type translationsObject = {
  [k: `${'LIBS' | 'APPS'}_${string}_${string}`]: StringsJSON;
};

type TranslateModuleConfig<
  defaultTranslations extends translationsObject
  // T extends languagesList = languagesList
> =
  // {
  // [P in T]:
  TranslateModuleConfigTranslations<defaultTranslations>;
// }

type TranslateModuleConfigForRoot<
  defaultTranslations extends translationsObject
  // T extends languagesList = languagesList
> = Omit<Required<TranslateModuleConfig<defaultTranslations>>, 'moduleType'>;

type TranslateModuleConfigForChild<
  defaultTranslations extends translationsObject
  // T extends languagesList = languagesList
> = Omit<
  TranslateModuleConfig<defaultTranslations>,
  'moduleType' | 'defaultLanguage' | 'supportedLanguages'
> & {
  isLazy: boolean;
};

/**
 please import only using forRoot or forChild
 ```ts
   AppTranslateModule.forRoot({
   defaultLanguage: 'he',
   supportedLanguages: ['he'],
      translationsChunks: {
        he: () => firstValueFrom(of({ default: he })),
        en: () => import('./i18n/en'),
      },
  });

  AppTranslateModule.forChild({
    isLazy: true,
      translationsChunks: {
        he: () => firstValueFrom(of({ default: he })),
        en: () => import('./i18n/en'),
      },
  });
 * ```
 * @author Mor Bargig <morb4@fnx.co.il>
 */
@NgModule({
  declarations: [],
  imports: [CommonModule, TranslateModule],
  providers: [AppTranslateService, TranslateModuleLoader],
  exports: [TranslateModule],
})
export class AppTranslateModule {
  constructor(
    appTranslateService: AppTranslateService,
    translateModuleLoader: TranslateModuleLoader,
    @Inject(TRANSLATE_MODULE_CONFIG)
    configs?: TranslateModuleConfig<any>[]
  ) {
    if (!configs?.length) {
      throw new Error(
        'Please use module AppTranslateModule only with forRoot or forChild'
      );
      return;
    }
    const rootConfig = configs?.find((config) => config?.moduleType === 'root');
    if (rootConfig) {
      appTranslateService.init(
        rootConfig?.defaultLanguage,
        rootConfig?.supportedLanguages
      );
    } else {
      const lazyChildConfig = configs?.find(
        (config) => config?.moduleType === 'lazyChild'
      );
      if (lazyChildConfig) {
        const currentLang: languagesList =
          appTranslateService.currentLang || appTranslateService?.defaultLang;
        appTranslateService.currentLang = '' as any;
        appTranslateService.use(currentLang);
      }
    }
    appTranslateService.onLangChange
      .pipe(skip(configs?.length))
      .subscribe((event) => {
        firstValueFrom(translateModuleLoader.getTranslation(event.lang)).then(
          (res) => {
            appTranslateService.setTranslation(event.lang, res, true);
          }
        );
      });
  }
  static forRoot<defaultTranslations extends translationsObject>(
    config: TranslateModuleConfigForRoot<defaultTranslations>
  ): ModuleWithProviders<AppTranslateModule> {
    // TODO: add environment configuration
    const forRoot = TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: TranslateModuleLoader,
      },
      defaultLanguage: config?.defaultLanguage,
    });
    return {
      ngModule: AppTranslateModule,
      providers: [
        TranslateModuleConfigProvider({ ...config, moduleType: 'root' }),
        ...forRoot.providers,
      ],
    };
  }
  static forChild<defaultTranslations extends translationsObject>(
    config: TranslateModuleConfigForChild<defaultTranslations>
  ): ModuleWithProviders<AppTranslateModule> {
    const forChild = TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useClass: TranslateModuleLoader,
      },
      extend: config?.isLazy,
    });
    return {
      ngModule: AppTranslateModule,
      providers: [
        TranslateModuleConfigProvider({
          ...config,
          moduleType: config?.isLazy ? 'lazyChild' : 'child',
        }),
        ...forChild.providers,
      ],
    };
  }
}
