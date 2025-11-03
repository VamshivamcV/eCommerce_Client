import React from 'react'

type CartIconWithBadgeProps = {
  count?: number
  size?: 'sm' | 'md' | 'lg'
  maxCount?: number
  showZero?: boolean
  showWhenEmpty?: boolean
  ariaLabel?: string
  className?: string
  onClick?: () => void
  animated?: boolean
  color?: string
}

const CartIconWithBadge: React.FC<CartIconWithBadgeProps> = ({
  count = 0,
  size = 'md',
  maxCount = 99,
  showZero = false,
  showWhenEmpty = false,
  ariaLabel = 'Shopping cart',
  className = '',
  onClick,
  animated = true,
  color = 'bg-white text-gray-800'
}) => {
  const displayCount = count > maxCount ? `${maxCount}+` : String(count)

  const sizes: Record<'sm' | 'md' | 'lg', { w: number; h: number; icon: number; badge: string; pad: string }> = {
    sm: { w: 8, h: 8, icon: 16, badge: 'text-xs', pad: 'p-1.5' },
    md: { w: 10, h: 10, icon: 20, badge: 'text-sm', pad: 'p-2' },
    lg: { w: 12, h: 12, icon: 24, badge: 'text-sm', pad: 'p-3' }
  }

  const s = sizes[size] || sizes.md
  const shouldShow = showZero ? true : count > 0

  return (
    <button
      type="button"
      aria-label={ariaLabel + (shouldShow ? `, ${displayCount} items` : '')}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center rounded-full ${s.pad} ${className}`}
    >
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          d="M3 3h2l.4 2M7 13h10l3-8H6.4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="10" cy="20" r="1.6" fill="currentColor" />
        <circle cx="18" cy="20" r="1.6" fill="currentColor" />
      </svg>

      {shouldShow ? (
        <span
          className={`absolute -top-1 -right-1 min-w-[1.25rem] h-5 flex items-center justify-center rounded-full px-1.5 leading-none ${color} ${s.badge} font-semibold shadow-md ${animated ? 'transform transition-all duration-200 ease-out' : ''}`}
          style={{
            paddingLeft: displayCount.length > 2 ? 8 : undefined,
            paddingRight: displayCount.length > 2 ? 8 : undefined
          }}
        >
          {displayCount}
        </span>
      ) : showWhenEmpty ? (
        <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-rose-500 shadow-sm" aria-hidden />
      ) : null}
    </button>
  )
}

export default CartIconWithBadge

/*
Examples:

import CartIconWithBadge from './CartIconWithBadge'

<CartIconWithBadge count={0} size="sm" showWhenEmpty onClick={() => openCart()} />
<CartIconWithBadge count={3} size="md" onClick={() => openCart()} />
<CartIconWithBadge count={123} size="lg" maxCount={99} color="bg-red-600 text-white" />
<CartIconWithBadge count={5} color="bg-white text-gray-800" />
*/

