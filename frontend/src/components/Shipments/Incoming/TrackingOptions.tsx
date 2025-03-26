import StringInput from '../../Inputs/StringInput'

const TrackingInputs = () => {
  return (
    <>
      <StringInput label="Tracking Number" />
      <StringInput label="Order Acknowledgement" />
      <StringInput label="Purchase Order" />
      <StringInput label="Sales Order" />
    </>
  )
}

export default TrackingInputs
