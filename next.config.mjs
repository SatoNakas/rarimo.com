import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    domains: ['storage.googleapis.com'],
  },
  webpack(config) {
    const svgIconsRegex = /assets\/icons\/.+\.svg$/
    const fileLoaderRule = config.module.rules.find(rule =>
      rule.test?.test?.('.svg'),
    )
    fileLoaderRule.exclude = svgIconsRegex

    config.module.rules.push({
      test: svgIconsRegex,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: 'preset-default',
                  params: { overrides: { removeViewBox: false } },
                },
              ],
            },
          },
        },
      ],
    })
    return config
  },
}

export default withNextIntl(config)
