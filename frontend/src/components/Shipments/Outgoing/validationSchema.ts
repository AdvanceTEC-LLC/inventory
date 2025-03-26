import {
  object,
  string,
  array,
  mixed,
  boolean,
  number,
  ObjectSchema,
} from 'yup'
import { SentShipmentType } from './types'
import dayjs, { Dayjs } from 'dayjs'

export const outgoingShipmentValidationSchema: ObjectSchema<SentShipmentType> =
  object({
    transmittal: string().required('Transmittal is required'),
    sendDate: mixed<Dayjs>()
      .test(
        'is-dayjs',
        'Send date must be a valid date',
        (value) => dayjs.isDayjs(value) && value.isValid()
      )
      .required('Send date is required'),
    delivered: boolean().default(false),
    assemblyCrates: array()
      .of(
        object().shape({
          id: number().required(),
          crate: object()
            .shape({
              id: number().required(),
              number: string().required(),
              crateLocation: object()
                .shape({
                  id: number().required(),
                  name: string().required(),
                })
                .required(),
              project: object().shape({
                id: number().required(),
                number: number().required(),
                name: string().required(),
                active: boolean().required(),
              }),
            })
            .required(),
          assemblies: array()
            .of(
              object().shape({
                id: number().required(),
                code: string().required(),
                project: object().shape({
                  id: number().required(),
                  number: number().required(),
                  name: string().required(),
                  active: boolean().required(),
                }),
                prefabricated: boolean().required(),
              })
            )
            .required(),
        })
      )
      .min(1, 'At least one crate is required')
      .required('Crates are required'),
  })
