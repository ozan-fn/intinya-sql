type XPWindowControlsProps = {
  onMinimize?: () => void
  onMaximize?: () => void
  onClose?: () => void
  disableMinimize?: boolean
  disableMaximize?: boolean
}

const baseBtn =
  'w-5 h-[18px] flex items-center justify-center text-[11px] font-bold leading-none border border-black cursor-pointer ' +
  'shadow-[inset_1px_1px_0_var(--xp-highlight),inset_-1px_-1px_0_var(--xp-shadow)] ' +
  'active:shadow-[inset_-1px_-1px_0_var(--xp-highlight),inset_1px_1px_0_var(--xp-shadow)] ' +
  'disabled:opacity-50 disabled:cursor-not-allowed'

function XPWinButton({
  label,
  onClick,
  disabled,
  variant = 'default',
}: {
  label: string
  onClick?: () => void
  disabled?: boolean
  variant?: 'default' | 'close'
}) {
  return (
    <button
      type="button"
      aria-label={label === '_' ? 'Minimize' : label === '□' ? 'Maximize' : 'Close'}
      onClick={onClick}
      disabled={disabled}
      style={{ 
        background: variant === 'close' ? '#D6544B' : 'var(--xp-face)',
        color: variant === 'close' ? '#fff' : '#000'
      }}
      className={baseBtn}
    >
      {label}
    </button>
  )
}

export function XPWindowControls({
  onMinimize,
  onMaximize,
  onClose,
  disableMinimize,
  disableMaximize,
}: XPWindowControlsProps) {
  return (
    <div className="flex gap-0.5">
      <XPWinButton label="_" onClick={onMinimize} disabled={disableMinimize} />
      <XPWinButton label="□" onClick={onMaximize} disabled={disableMaximize} />
      <XPWinButton label="✕" onClick={onClose} variant="close" />
    </div>
  )
}