interface ButtonProps {
  text: string
  onClick: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset' | undefined
}

const Button = ({ text, onClick, disabled, type }: ButtonProps) => {
  if (type === 'reset')
    return (
      <button
        type={type ?? 'button'}
        onClick={onClick}
        className="w-fit border-2 border-red-500 text-red-500 px-4 py-1 rounded-full"
      >
        {text}
      </button>
    )

  if (disabled)
    return (
      <button
        type={type ?? 'button'}
        onClick={onClick}
        disabled
        className="text-text-muted border-text-muted border-2 px-6 py-2 rounded-full"
      >
        {text}
      </button>
    )

  return (
    <button
      type={type ?? 'button'}
      onClick={onClick}
      className={`text-white text-sm border-2 px-6 py-2 rounded-full transform transition-transform transition-colors duration-300 ease-in-out
        bg-atec-light hover:bg-atec active:bg-atec-light
        border-atec-light hover:border-atec active:border-atec-light`}
    >
      {text}
    </button>
  )
}

export default Button
