import type { translateDictionary } from '@fnx-nx/front/base-client/lib/modules/translate/translations.helper';

export default {
  LIBS_FRONT_DYNAMIC_TABLE_STANDALONE_CELLS_LAZY_CELL_COMPONENTS: {
    watch: 'לצפייה',
    watchJaws: 'לצפייה במסמך נפתח בחלון חדש',
    downloadJaws: 'הורדת קובץ',
  },
} as const satisfies translateDictionary<{
  appOrLib: 'LIBS';
  appOrLibVal: 'FRONT_DYNAMIC_TABLE_STANDALONE_CELLS';
  module: 'LAZY_CELL_COMPONENTS';
}>;
