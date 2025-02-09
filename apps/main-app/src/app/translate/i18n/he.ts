import { translateDictionary } from "@softbar-ngx-translate";

export default {
  'APPS_MAIN_APP_APP': {
    h1: 'אפלקציית דמו תשתיות של softbar'
  }
   } as const satisfies translateDictionary<{
  appOrLib: 'APPS';
  appOrLibVal: 'MAIN_APP';
}>;
