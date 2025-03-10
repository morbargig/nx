import { Controller, applyDecorators } from '@nestjs/common';
import { BFF_ROUTES_TYPE } from '@softbar-bff-routes';

export function CustomController<C extends keyof BFF_ROUTES_TYPE>(
  controller: C
) {
  return applyDecorators(Controller(controller));
}
