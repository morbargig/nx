import { removeConstStringValues } from '@softbar-ngx-translate';

export default {
  APPS_MAIN_APP_APP: {
  h1: "infrastructures demo application softbar"

  }
} as const satisfies removeConstStringValues<typeof import('./he').default>;
