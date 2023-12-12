function withStoreConfig(nextConfig = {}) {
  const features = nextConfig.features || {}
  delete nextConfig.features

  nextConfig.env = nextConfig.env || {}

  Object.entries(features).forEach(([key, value]) => {
    if (value) {
      nextConfig.env[`FEATURE_${key.toUpperCase()}_ENABLED`] = value
      //  BELOW IS ORIGINAL SETTING THAT WAS FORCING BOOLEAN VALUE true INSTEAD OF USING PROPERTY VALUE
      // nextConfig.env[`FEATURE_${key.toUpperCase()}_ENABLED`] = "true"

    }
  })

  return nextConfig
}

module.exports = { withStoreConfig }
