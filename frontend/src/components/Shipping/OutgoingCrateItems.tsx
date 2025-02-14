import { useState } from 'react'
import { useMaterials } from '../../hooks/useMaterialsHook'

const OutgoingCrateItems = () => {
  const [items, setItems] = useState<
    { material: string | undefined; quantity: number | undefined }[]
  >([{ material: undefined, quantity: 0 }])

  const addItem = () => {
    setItems([...items, { material: undefined, quantity: 0 }])
  }

  const updateItem = (
    index: number,
    field: 'material' | 'quantity',
    value: string | number
  ) => {
    const updatedItems = [...items]
    updatedItems[index] = { ...updatedItems[index], [field]: value }
    setItems(updatedItems)
  }

  const { data: materials = [] } = useMaterials()

  return (
    <>
      <table className="w-full">
        <thead>
          <tr>
            <th>Material</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>
                <select
                  value={item.material || ''}
                  onChange={(e) =>
                    updateItem(index, 'material', e.target.value)
                  }
                >
                  <option value="">Select Material</option>
                  {materials.map((material) => (
                    <option key={material.id} value={material.name}>
                      {material.name}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <input
                  type="number"
                  value={item.quantity ?? ''}
                  onChange={(e) =>
                    updateItem(index, 'quantity', Number(e.target.value))
                  }
                />
              </td>
              <td>
                <button
                  onClick={() => setItems(items.filter((_, i) => i !== index))}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={addItem}>Add Item</button>
    </>
  )
}

export default OutgoingCrateItems
