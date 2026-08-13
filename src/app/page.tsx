import { GoogleAnalytics } from '@next/third-parties/google'
import { NextIntlClientProvider } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'

import HomepageV2 from '@/components/HomepageV2'
import { config } from '@/config'
import { locales } from '@/i18n/request'

export default async function RootPage() {
  setRequestLocale(locales[0])

  const messages = await (
    await import(`@/../messages/translations.${locales[0]}.json`)
  ).default

  return (
    <NextIntlClientProvider locale={locales[0]} messages={messages}>
      <HomepageV2 />
      <GoogleAnalytics gaId={config.gaIdRarimo} />
    </NextIntlClientProvider>
  )
}
