module.exports = {
  apps: [
    {
      name: "music",
      script: "bin/www",
      env: {
        "NODE_ENV": "development"
      },
      env_dev: {
        "NODE_ENV": "product"
      }
    }
  ]
}
