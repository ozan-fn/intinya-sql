import { XPWindowControls } from './XPWindowsControls'

interface XPErrorDialogProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  message: string
  icon?: 'error' | 'warning' | 'info'
}

export function XPErrorDialog({
  isOpen,
  onClose,
  title = 'AnomalySQL.exe',
  message,
  icon = 'error',
}: XPErrorDialogProps) {
  if (!isOpen) return null

  const iconColors = {
    error: 'var(--xp-alert)',
    warning: '#F5D547',
    info: '#5B9BD5',
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
      onClick={(e) => e.stopPropagation()}
    >
      <div 
        className="w-[320px] border border-black shadow-[inset_1px_1px_0_var(--xp-highlight),inset_-1px_-1px_0_var(--xp-shadow-dark),2px_2px_6px_rgba(0,0,0,0.4)]"
        style={{ background: 'var(--xp-face)' }}
      >
        <div 
          className="flex items-center justify-between px-1 py-1 border-b border-black"
          style={{ background: 'var(--xp-navy)' }}
        >
          <span className="text-white text-sm font-bold pl-1" style={{ fontFamily: "'Segoe UI', sans-serif" }}>
            {title}
          </span>
          <XPWindowControls
            disableMinimize
            disableMaximize
            onClose={onClose}
          />
        </div>
        <div className="px-5 py-5 flex gap-4 items-start" style={{ background: 'var(--xp-face)' }}>
          <svg width="32" height="32" viewBox="0 0 32 32" className="shrink-0 mt-1">
            <circle cx="16" cy="16" r="14" fill={iconColors[icon]} stroke="#000" strokeWidth="1" />
            <rect x="14" y="8" width="4" height="12" fill="#fff" />
            <rect x="14" y="22" width="4" height="4" fill="#fff" />
          </svg>
          <p className="text-sm text-black" style={{ fontFamily: "'Segoe UI', sans-serif" }}>
            {message}
          </p>
        </div>
        <div className="flex justify-end px-5 pb-4">
          <button 
            className="px-6 py-1.5 text-sm font-bold border border-black cursor-pointer shadow-[inset_1px_1px_0_var(--xp-highlight),inset_-1px_-1px_0_var(--xp-shadow),inset_2px_2px_0_#DFDFDF,inset_-2px_-2px_0_#ACA899] active:shadow-[inset_-1px_-1px_0_var(--xp-highlight),inset_1px_1px_0_var(--xp-shadow)] text-black" 
            style={{ background: 'var(--xp-face)', fontFamily: "'Segoe UI', sans-serif" }}
            onClick={onClose}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  )
}
