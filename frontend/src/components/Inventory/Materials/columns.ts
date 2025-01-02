import { CellContext, createColumnHelper } from '@tanstack/react-table'
import { MaterialType } from '../../../types/material'

const columnHelper = createColumnHelper<MaterialType>()

export const columns = [
  {
    header: 'Materials',
    columns: [
      columnHelper.accessor('partNumber', {
        header: () => 'Part Number',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('description', {
        header: () => 'Description',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('color', {
        header: () => 'Color',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('vendor.name', {
        header: () => 'Vendor',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('tag', {
        header: () => 'Tag',
        cell: (info) => info.getValue(),
      }),
      {
        header: 'Size',
        cell: (info: CellContext<MaterialType, unknown>) => {
          const { thicknessInches, widthInches, lengthInches } =
            info.row.original
          if (thicknessInches && widthInches && lengthInches) {
            return `${thicknessInches}"T x ${widthInches}"W x ${lengthInches}"L`
          }
          return null
        },
      },
      columnHelper.accessor('squareFeet', {
        header: () => 'Square Feet',
        cell: (info) => info.getValue(),
      }),
    ],
  },
]
