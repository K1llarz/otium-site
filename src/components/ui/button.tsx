import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { cn } from '../../lib/cn'

type Variant = 'primary' | 'outline' | 'ghost'

const variantClass: Record<Variant, string> = {
  primary: 'btn-primary',
  outline: 'btn-outline',
  ghost: 'btn-ghost',
}

interface BaseProps {
  variant?: Variant
  className?: string
  children: ReactNode
}

interface ButtonAsButton extends BaseProps {
  as?: 'button'
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
  disabled?: boolean
}

interface ButtonAsLink extends BaseProps {
  as: 'link'
  to: string
}

interface ButtonAsAnchor extends BaseProps {
  as: 'anchor'
  href: string
}

type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsAnchor

export function Button(props: ButtonProps) {
  const { variant = 'primary', className, children } = props
  const classes = cn(variantClass[variant], className)

  if (props.as === 'link') {
    return (
      <Link to={props.to} className={classes}>
        {children}
      </Link>
    )
  }

  if (props.as === 'anchor') {
    return (
      <a href={props.href} className={classes}>
        {children}
      </a>
    )
  }

  return (
    <button
      type={props.type ?? 'button'}
      onClick={props.onClick}
      disabled={props.disabled}
      className={cn(classes, props.disabled && 'opacity-50 pointer-events-none')}
    >
      {children}
    </button>
  )
}
