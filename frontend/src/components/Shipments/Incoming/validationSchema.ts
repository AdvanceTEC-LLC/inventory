import {
  object,
  number,
  string,
  array,
  ObjectSchema,
  mixed,
  boolean,
} from 'yup'
import { CrateType, ReceivedShipmentType, StockType } from './types'
import { ManufacturerType } from '../../../types/manufacturer'
import { MaterialType } from '../../../types/material'
import dayjs, { Dayjs } from 'dayjs'

export const receivedShipmentValidationSchema: ObjectSchema<ReceivedShipmentType> =
  object({
    trackingNumber: string().required('Tracking number is required'),
    manufacturer: object<ManufacturerType>()
      .shape({
        id: number().required(),
        name: string().required(),
      })
      .required('Manufacturer is required'),
    receivedDate: mixed<Dayjs>()
      .test(
        'is-dayjs',
        'Received date must be a valid date',
        (value) => dayjs.isDayjs(value) && value.isValid()
      )
      .required('Received date is required'),
    crates: array()
      .of(
        object<CrateType>().shape({
          id: number().required(),
          number: string().required('Crate number is required'),
          stock: array()
            .of(
              object<StockType>().shape({
                id: number().required(),
                material: object<MaterialType>()
                  .shape({
                    id: number().required(),
                    name: string().required(),
                    manufacturer: object<ManufacturerType>().shape({
                      id: number().required(),
                      name: string().required(),
                    }),
                    unit: string().required(),
                  })
                  .required('Material is required'),
                quantity: number().required('Quantity is required'),
              })
            )
            .min(1, 'At least one material is required')
            .required('Stock is required'),
          open: boolean().required(),
        })
      )
      .min(1, 'At least one crate is required')
      .required('Crates are required'),
  })
