import { BFF_ROUTES_TYPE } from '@fnx-nx/api-interfaces';
import { Controller, applyDecorators } from '@nestjs/common';

export function CustomController<C extends keyof BFF_ROUTES_TYPE>(
  controller: C
) {
  return applyDecorators(Controller(controller));
}
