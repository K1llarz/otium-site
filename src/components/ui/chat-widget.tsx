/**
 * ChatWidget — a floating multi-messenger contact button.
 * ---------------------------------------------------------------------------
 * Self-contained: depends only on React. All styles are injected at runtime,
 * so it works in any project regardless of CSS framework. Brand icons are
 * inline SVG (crisp at any size, no icon dependency).
 *
 * USAGE
 *   import { ChatWidget } from './components/ui/chat-widget'
 *
 *   <ChatWidget
 *     whatsappNumber="995555123456"
 *     viberNumber="995555123456"
 *     telegramUsername="otium"
 *   />
 *
 * Only the channels you pass are rendered. Optional props:
 *   position      "bottom-right" (default) | "bottom-left"
 *   showLabels    show the platform name pill next to each icon (default true)
 *   accentColor   main button colour (default "#4f46e5")
 *   whatsappMessage  pre-filled WhatsApp message text
 *   ariaLabel     accessible label for the main button
 *
 * ACCESSIBILITY
 *   - aria-label / aria-expanded / aria-haspopup on the toggle
 *   - Tab cycles the options, Enter activates, Escape closes (focus returns
 *     to the toggle), focus moves into the menu on open
 *   - Closes on outside click / touch
 *
 * To use in a plain-JS project, rename to .jsx and remove the type annotations.
 * ---------------------------------------------------------------------------
 */
import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type ReactNode,
  type CSSProperties,
} from 'react'

/* ------------------------------------------------------------------ types */

type Position = 'bottom-right' | 'bottom-left'

export interface ChatWidgetProps {
  whatsappNumber?: string
  viberNumber?: string
  telegramUsername?: string
  position?: Position
  showLabels?: boolean
  accentColor?: string
  whatsappMessage?: string
  ariaLabel?: string
}

interface MessengerOption {
  id: string
  label: string
  href: string
  color: string
  /** External links open in a new tab; native protocols (viber://) do not. */
  external: boolean
  icon: ReactNode
}

/* --------------------------------------------------------------- icons */

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  )
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.061 3.345-.479.329-.913.489-1.302.481-.428-.009-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  )
}

function ViberIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M11.4 0C9.473.028 5.333.344 3.02 2.467 1.302 4.182.696 6.7.633 9.82c-.06 3.11-.135 8.943 5.46 10.517h.003l-.004 2.4s-.037.973.602 1.17c.776.242 1.13-.493 1.876-1.293.41-.443.973-1.092 1.398-1.592 3.83.323 6.772-.413 7.105-.522.775-.252 5.158-.81 5.872-6.63.737-6 .353-9.785-2.298-11.503-.8-.733-3.517-2.717-9.617-2.744 0 0-.45-.027-1.23.001zm.063 1.985c.667-.003 1.07.027 1.07.027 5.16.023 7.634 1.585 8.302 2.197 2.243 1.434 3.39 4.847 2.768 9.842l-.001.005c-.603 4.857-4.16 5.163-4.816 5.373-.279.09-2.853.722-6.088.512 0 0-2.412 2.91-3.165 3.666-.119.119-.258.167-.351.144-.131-.032-.167-.188-.166-.417l.02-3.965c-4.74-1.314-4.462-6.232-4.405-8.805.056-2.573.55-4.683 2.004-6.118 2.602-2.392 5.81-2.46 6.95-2.46l.001.001zm.426 2.83a.214.214 0 0 0-.214.213.214.214 0 0 0 .213.215c1.612.012 2.948.547 4.012 1.601 1.06 1.05 1.586 2.483 1.598 4.342a.214.214 0 0 0 .214.213h.001a.214.214 0 0 0 .213-.215c-.013-1.96-.59-3.522-1.727-4.648-1.132-1.122-2.598-1.7-4.31-1.72a.214.214 0 0 0-.003 0zm.382 1.55a.214.214 0 0 0-.197.214.214.214 0 0 0 .205.214c.969.05 1.66.348 2.16.857.503.512.789 1.236.83 2.215a.214.214 0 0 0 .222.205.214.214 0 0 0 .205-.223c-.045-1.07-.374-1.918-.952-2.506-.58-.59-1.382-.925-2.443-.976a.214.214 0 0 0-.03 0zm-3.422.07a.65.65 0 0 0-.431.12l-.013.01c-.317.232-.604.515-.858.819a.215.215 0 0 0-.022.03c-.485.64-.312 1.3-.098 1.814l.004.007c.218.473.719 1.373 1.578 2.337.858.965 1.7 1.57 2.173 1.788l.008.004c.515.214 1.175.387 1.815-.098a.215.215 0 0 0 .03-.022c.304-.254.587-.541.819-.858l.01-.013a.65.65 0 0 0-.167-.95l-1.293-.773a.65.65 0 0 0-.867.194l-.287.426c-.096.143-.288.207-.446.148-.412-.153-.983-.48-1.613-1.11-.63-.63-.957-1.201-1.11-1.613-.059-.158.005-.35.148-.446l.426-.287a.65.65 0 0 0 .194-.867l-.773-1.293a.65.65 0 0 0-.5-.317zm2.836.243a.214.214 0 0 0-.043.426c.673.127 1.143.39 1.473.732.332.345.575.844.687 1.524a.214.214 0 1 0 .422-.07c-.122-.742-.398-1.327-.802-1.747-.402-.42-.95-.71-1.706-.852a.214.214 0 0 0-.041-.003z" />
    </svg>
  )
}

function ChatBubbleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

/* --------------------------------------------------------------- styles */

const STYLE_ID = 'chat-widget-styles-v1'

const STYLES = `
.cw-root {
  position: fixed;
  z-index: 2147483000;
  display: flex;
  flex-direction: column;
  align-items: var(--cw-align);
  font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
}
.cw-root.cw-right { right: max(1.25rem, env(safe-area-inset-right)); }
.cw-root.cw-left  { left:  max(1.25rem, env(safe-area-inset-left)); }
.cw-root { bottom: max(1.25rem, env(safe-area-inset-bottom)); }

/* options menu (absolute so it never reserves layout space when closed) */
.cw-menu {
  position: absolute;
  bottom: 4.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: var(--cw-align);
}
.cw-root.cw-right .cw-menu { right: 0; }
.cw-root.cw-left  .cw-menu { left: 0; }

.cw-option {
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  text-decoration: none;
  opacity: 0;
  transform: translateY(0.625rem) scale(0.9);
  pointer-events: none;
  transition: opacity 0.25s ease, transform 0.25s cubic-bezier(0.32, 0.72, 0, 1);
}
.cw-root.cw-left .cw-option { flex-direction: row-reverse; }
.cw-menu.cw-open .cw-option {
  opacity: 1;
  transform: translateY(0) scale(1);
  pointer-events: auto;
}

.cw-option-label {
  background: #ffffff;
  color: #1f2937;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1;
  padding: 0.5rem 0.75rem;
  border-radius: 0.625rem;
  white-space: nowrap;
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.12);
}

.cw-icon-circle {
  width: 3.25rem;
  height: 3.25rem;
  border-radius: 9999px;
  display: grid;
  place-items: center;
  color: #ffffff;
  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.22);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.cw-icon-circle svg { width: 1.5rem; height: 1.5rem; display: block; }
.cw-option:hover .cw-icon-circle,
.cw-option:focus-visible .cw-icon-circle {
  transform: translateY(-2px) scale(1.07);
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.3);
}

/* main floating button */
.cw-fab {
  position: relative;
  width: 3.75rem;
  height: 3.75rem;
  min-width: 44px;
  min-height: 44px;
  border: none;
  border-radius: 9999px;
  background: var(--cw-accent);
  color: #ffffff;
  cursor: pointer;
  display: grid;
  place-items: center;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.28);
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease;
  -webkit-tap-highlight-color: transparent;
}
.cw-fab:hover { transform: scale(1.06); }
.cw-fab:active { transform: scale(0.92); }
.cw-fab.cw-pulse { animation: cw-pulse 2.4s ease-out infinite; }

.cw-fab-icon {
  position: absolute;
  display: grid;
  place-items: center;
  transition: opacity 0.25s ease, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.cw-fab-icon svg { width: 1.625rem; height: 1.625rem; display: block; }
.cw-fab-icon.cw-chat   { opacity: 1; transform: rotate(0deg); }
.cw-fab-icon.cw-close  { opacity: 0; transform: rotate(-90deg); }
.cw-fab.cw-open .cw-fab-icon.cw-chat  { opacity: 0; transform: rotate(90deg); }
.cw-fab.cw-open .cw-fab-icon.cw-close { opacity: 1; transform: rotate(0deg); }

.cw-fab:focus-visible,
.cw-option:focus-visible {
  outline: 2px solid var(--cw-accent);
  outline-offset: 3px;
  border-radius: 9999px;
}

@keyframes cw-pulse {
  0%   { box-shadow: 0 8px 24px rgba(15, 23, 42, 0.28), 0 0 0 0 color-mix(in srgb, var(--cw-accent) 55%, transparent); }
  70%  { box-shadow: 0 8px 24px rgba(15, 23, 42, 0.28), 0 0 0 16px color-mix(in srgb, var(--cw-accent) 0%, transparent); }
  100% { box-shadow: 0 8px 24px rgba(15, 23, 42, 0.28), 0 0 0 0 color-mix(in srgb, var(--cw-accent) 0%, transparent); }
}

@media (prefers-reduced-motion: reduce) {
  .cw-option, .cw-fab, .cw-fab-icon, .cw-icon-circle { transition: none; }
  .cw-fab.cw-pulse { animation: none; }
}
`

function useInjectedStyles() {
  useEffect(() => {
    if (document.getElementById(STYLE_ID)) return
    const tag = document.createElement('style')
    tag.id = STYLE_ID
    tag.textContent = STYLES
    document.head.appendChild(tag)
  }, [])
}

/* --------------------------------------------------------------- helpers */

/** Strip everything except digits from a phone number string. */
function digitsOnly(value: string): string {
  return value.replace(/\D/g, '')
}

/* --------------------------------------------------------------- component */

export function ChatWidget({
  whatsappNumber,
  viberNumber,
  telegramUsername,
  position = 'bottom-right',
  showLabels = true,
  accentColor = '#4f46e5',
  whatsappMessage,
  ariaLabel = 'Chat with us',
}: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  // Pulse only while the widget has never been opened (idle attention cue).
  const [hasInteracted, setHasInteracted] = useState(false)

  const rootRef = useRef<HTMLDivElement>(null)
  const fabRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useInjectedStyles()

  /* Build the list from whichever channels were provided. */
  const options: MessengerOption[] = []
  if (whatsappNumber) {
    const text = whatsappMessage ? `?text=${encodeURIComponent(whatsappMessage)}` : ''
    options.push({
      id: 'whatsapp',
      label: 'WhatsApp',
      color: '#25D366',
      external: true,
      href: `https://wa.me/${digitsOnly(whatsappNumber)}${text}`,
      icon: <WhatsAppIcon />,
    })
  }
  if (viberNumber) {
    options.push({
      id: 'viber',
      label: 'Viber',
      color: '#7360F2',
      external: false,
      href: `viber://chat?number=${encodeURIComponent(digitsOnly(viberNumber))}`,
      icon: <ViberIcon />,
    })
  }
  if (telegramUsername) {
    options.push({
      id: 'telegram',
      label: 'Telegram',
      color: '#229ED9',
      external: true,
      href: `https://t.me/${telegramUsername.replace(/^@/, '')}`,
      icon: <TelegramIcon />,
    })
  }

  const close = useCallback(() => setIsOpen(false), [])

  const toggle = useCallback(() => {
    setHasInteracted(true)
    setIsOpen((prev) => !prev)
  }, [])

  /* Close on outside click / touch while open. */
  useEffect(() => {
    if (!isOpen) return
    const handlePointer = (event: MouseEvent | TouchEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        close()
      }
    }
    document.addEventListener('mousedown', handlePointer)
    document.addEventListener('touchstart', handlePointer)
    return () => {
      document.removeEventListener('mousedown', handlePointer)
      document.removeEventListener('touchstart', handlePointer)
    }
  }, [isOpen, close])

  /* Escape closes the menu and returns focus to the toggle. */
  useEffect(() => {
    if (!isOpen) return
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close()
        fabRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, close])

  /* Move focus into the menu when it opens (focus management). */
  useEffect(() => {
    if (isOpen) {
      menuRef.current?.querySelector<HTMLAnchorElement>('a')?.focus()
    }
  }, [isOpen])

  if (options.length === 0) return null

  // CSS custom properties drive the accent colour and which edge the
  // labels/icons align to. Cast because custom props aren't in CSSProperties.
  const rootStyle = {
    '--cw-accent': accentColor,
    '--cw-align': position === 'bottom-left' ? 'flex-start' : 'flex-end',
  } as CSSProperties
  const positionClass = position === 'bottom-left' ? 'cw-left' : 'cw-right'

  return (
    <div ref={rootRef} className={`cw-root ${positionClass}`} style={rootStyle}>
      <div
        ref={menuRef}
        className={`cw-menu ${isOpen ? 'cw-open' : ''}`}
        role="menu"
        aria-label="Messaging options"
        aria-hidden={!isOpen}
      >
        {options.map((option, index) => (
          <a
            key={option.id}
            className="cw-option"
            role="menuitem"
            href={option.href}
            tabIndex={isOpen ? 0 : -1}
            aria-label={`Contact us on ${option.label}`}
            target={option.external ? '_blank' : undefined}
            rel={option.external ? 'noopener noreferrer' : undefined}
            onClick={close}
            style={{
              // staggered reveal: items closest to the button appear first
              transitionDelay: isOpen
                ? `${index * 55}ms`
                : `${(options.length - 1 - index) * 40}ms`,
            }}
          >
            {showLabels && <span className="cw-option-label">{option.label}</span>}
            <span className="cw-icon-circle" style={{ background: option.color }}>
              {option.icon}
            </span>
          </a>
        ))}
      </div>

      <button
        ref={fabRef}
        type="button"
        className={`cw-fab ${isOpen ? 'cw-open' : ''} ${!isOpen && !hasInteracted ? 'cw-pulse' : ''}`}
        onClick={toggle}
        aria-label={ariaLabel}
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        <span className="cw-fab-icon cw-chat">
          <ChatBubbleIcon />
        </span>
        <span className="cw-fab-icon cw-close">
          <CloseIcon />
        </span>
      </button>
    </div>
  )
}

export default ChatWidget
