import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { MapPin, Phone, Mail, Clock, Check } from 'lucide-react'
import { SectionHeader } from '../ui/section-header'
import { Button } from '../ui/button'
import { cn } from '../../lib/cn'

interface FormState {
  firstName: string
  lastName: string
  phone: string
  email: string
  message: string
}

type FormErrors = Partial<Record<keyof FormState, string>>
type Status = 'idle' | 'submitting' | 'success' | 'error'

const initialState: FormState = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  message: '',
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function Contact() {
  const { t } = useTranslation()
  const [values, setValues] = useState<FormState>(initialState)
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<Status>('idle')

  const contactDetails = [
    { Icon: MapPin, label: t('contact.labels.address'), value: t('contact.address') },
    { Icon: Phone, label: t('contact.labels.phone'), value: t('contact.phone'), href: `tel:${t('contact.phone').replace(/\s/g, '')}` },
    { Icon: Mail, label: t('contact.labels.email'), value: t('contact.email'), href: `mailto:${t('contact.email')}` },
    { Icon: Clock, label: t('contact.labels.hours'), value: t('contact.hours') },
  ]

  const validate = (state: FormState): FormErrors => {
    const next: FormErrors = {}
    if (!state.firstName.trim()) next.firstName = t('contact.form.errors.firstName')
    if (!state.lastName.trim()) next.lastName = t('contact.form.errors.lastName')
    if (!EMAIL_RE.test(state.email.trim())) next.email = t('contact.form.errors.email')
    if (!state.message.trim()) next.message = t('contact.form.errors.message')
    return next
  }

  const update = (field: keyof FormState) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setStatus('submitting')
    try {
      // TODO: wire this up to Formspree, EmailJS, or a backend endpoint.
      // For now we POST to a placeholder and log the payload to the console.
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      }).catch(() => null)

      console.info('[contact] form submission', values, 'response:', response?.status ?? 'no-endpoint')

      // Treat a missing placeholder endpoint as success in this demo build.
      setStatus('success')
      setValues(initialState)
    } catch (error) {
      console.error('[contact] submission failed', error)
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="bg-sand-100">
      <div className="container-page py-24 md:py-32">
        <SectionHeader number="06" label={t('contact.sectionLabel')}>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="display text-[clamp(1.75rem,4vw,3rem)] leading-tight">
                {t('contact.headline')}
              </h2>
              <p className="mt-4 max-w-sm text-base text-ink-500">{t('contact.subhead')}</p>

              <dl className="mt-10 space-y-6">
                {contactDetails.map(({ Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full hairline text-ink-900">
                      <Icon size={16} strokeWidth={1.5} />
                    </span>
                    <div>
                      <dt className="eyebrow">{label}</dt>
                      <dd className="mt-1 text-sm text-ink-700">
                        {href ? (
                          <a href={href} className="transition-colors hover:text-ink-900">
                            {value}
                          </a>
                        ) : (
                          value
                        )}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  id="firstName"
                  label={t('contact.form.firstName')}
                  value={values.firstName}
                  onChange={update('firstName')}
                  error={errors.firstName}
                  autoComplete="given-name"
                />
                <Field
                  id="lastName"
                  label={t('contact.form.lastName')}
                  value={values.lastName}
                  onChange={update('lastName')}
                  error={errors.lastName}
                  autoComplete="family-name"
                />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  id="phone"
                  type="tel"
                  label={t('contact.form.phone')}
                  value={values.phone}
                  onChange={update('phone')}
                  autoComplete="tel"
                />
                <Field
                  id="email"
                  type="email"
                  label={t('contact.form.email')}
                  value={values.email}
                  onChange={update('email')}
                  error={errors.email}
                  autoComplete="email"
                  required
                />
              </div>
              <Field
                id="message"
                label={t('contact.form.message')}
                value={values.message}
                onChange={update('message')}
                error={errors.message}
                multiline
                required
              />

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button as="button" type="submit" disabled={status === 'submitting'}>
                  {status === 'submitting' ? t('common.loading') : t('contact.form.submit')}
                </Button>

                {status === 'success' && (
                  <p className="flex items-center gap-2 text-sm text-bronze-dark" role="status">
                    <Check size={16} strokeWidth={1.5} />
                    {t('contact.form.success')}
                  </p>
                )}
                {status === 'error' && (
                  <p className="text-sm text-red-700" role="alert">
                    {t('contact.form.error')}
                  </p>
                )}
              </div>
            </form>
          </div>
        </SectionHeader>
      </div>
    </section>
  )
}

interface FieldProps {
  id: string
  label: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  error?: string
  type?: string
  multiline?: boolean
  required?: boolean
  autoComplete?: string
}

function Field({ id, label, value, onChange, error, type = 'text', multiline, required, autoComplete }: FieldProps) {
  const baseClass = cn(
    'w-full rounded-sm border bg-sand-50 px-4 py-3 text-sm text-ink-900 transition-colors',
    'placeholder:text-bronze/60 focus:border-ink-900 focus:outline-none',
    error ? 'border-red-400' : 'border-ink-900/15',
  )

  return (
    <div className={multiline ? 'space-y-2' : 'space-y-2'}>
      <label htmlFor={id} className="eyebrow block">
        {label}
        {required && <span aria-hidden className="text-bronze"> *</span>}
      </label>
      {multiline ? (
        <textarea
          id={id}
          name={id}
          rows={5}
          value={value}
          onChange={onChange}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(baseClass, 'resize-y')}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={baseClass}
        />
      )}
      {error && (
        <p id={`${id}-error`} className="text-xs text-red-700" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
