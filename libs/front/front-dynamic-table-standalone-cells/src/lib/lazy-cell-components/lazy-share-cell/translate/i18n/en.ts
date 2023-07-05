import type { removeConstStringValues } from '@fnx-nx/front/base-client/lib/modules/translate/translations.helper';

export default {
  LIBS_FRONT_DYNAMIC_TABLE_STANDALONE_CELLS_LAZY_CELL_COMPONENTS: {
    watch: 'watch',
    watchJaws: 'לצפייה במסמך נפתח בחלון חדש',
    downloadJaws: 'הורדת קובץ',
  },
} as const satisfies removeConstStringValues<typeof import('./he').default>;
