import { applyDecorators, Type } from '@nestjs/common';
import { ResponseDto } from '../dto/response.dto';
import { ApiResponse } from '@nestjs/swagger';
import {
  getSchemaPath,
  ApiResponseMetadata,
  ApiExtraModels,
} from '@nestjs/swagger';
import {
  ReferenceObject,
  SchemaObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

// type ArrayElementType<T> = T extends (infer E)[] ? E : T;

// type dependenciesType<T extends { [key in keyof T] } = any, K extends keyof T = keyof T> = {
//   [P in K]-?: {
//     key: P;
//     childClass: Type<ArrayElementType<T[P]>>;
//     dependencies?: dependenciesType<ArrayElementType<T[P]>>[];
//   }
// }[K]

export const ApiCustomResponse = <TModel extends object>({
  type: dtoClass,
  description,
  typeOfResponse,
}: Omit<ApiResponseMetadata, 'type'> & {
  type?: Type<TModel>;
  typeOfResponse?:
    | 'undefined'
    | 'object'
    | 'boolean'
    | 'number'
    | 'string'
    | 'function'
    | 'symbol'
    | 'bigint';
}) =>
  // dependencies: dependenciesType<TModel, keyof TModel>[] = []
  {
    return applyDecorators(
      // ...recursiveFixModelsLegacy<TModel>(dependencies),
      // eslint-disable-next-line @typescript-eslint/ban-types
      ...(dtoClass ? [ApiExtraModels(dtoClass as Function)] : []),
      ApiResponse({
        description,
        // type: dtoClass,
        schema: {
          // title: `ResponseDtoOf${(dtoClass as Function).name}`,
          allOf: [
            { $ref: getSchemaPath(ResponseDto) },
            {
              properties: {
                response: (function (): SchemaObject | ReferenceObject {
                  if (typeOfResponse) {
                    return { type: typeOfResponse };
                  }
                  switch (typeof dtoClass) {
                    case 'function':
                    case 'string': {
                      return {
                        $ref: getSchemaPath(dtoClass),
                      } as ReferenceObject;
                      // return {
                      //   'allOf': [
                      //     { $ref: getSchemaPath(dtoClass) } as ReferenceObject,
                      //     recursiveFixSchemaLegacy(dependencies)
                      //   ]
                      // }
                    }
                  }
                })(),
              },
            },
          ],
        },
      })
    );
  };

// const recursiveFixModelsLegacy = <T = any>(dependencies: dependenciesType<T>[]): ReturnType<typeof ApiExtraModels>[] => {
//   const res: ReturnType<typeof ApiExtraModels>[] = []
//   const fill = <K = T>(dependencies: dependenciesType<K>[]) => {
//     dependencies?.forEach(i => {
//       res?.push(ApiExtraModels(i?.childClass));
//       i?.dependencies?.length && fill(i?.dependencies)
//     })
//   }
//   fill(dependencies)
//   return res
// }

// const recursiveFixSchemaLegacy = <T = any>(dependencies: dependenciesType<T>[]): ApiResponseSchemaHost['schema'] => ({
//   properties: dependencies?.reduce((p, c) => ({
//     ...p,
//     [c.key]: (function (): SchemaObject | ReferenceObject {
//       switch (typeof c.childClass) {
//         case 'function':
//         case 'string': {
//           return {
//             'allOf': [
//               { $ref: getSchemaPath(c.childClass) } as ReferenceObject,
//               recursiveFixSchemaLegacy(c.dependencies)
//             ]
//           }
//           break
//         }
//       }
//     })()
//   }), {})
// })
