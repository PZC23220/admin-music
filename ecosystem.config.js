module.exports = {
  apps: [
    {
      name: "music",
      script: "bin/www",
      out_file : "/logs/music_out.log",
      error_file : "/logs/music_error.log",
      env: {
        "NODE_ENV": "development"
      },
      env_dev: {
        "NODE_ENV": "product"
      }
    },
    {
      name: "opt",
      script: "/home/admin-elementUI/bin/www",
      out_file : "/logs/opt_out.log",
      error_file : "/logs/opt_error.log",
      env: {
        "NODE_ENV": "development"
      },
      env_dev: {
        "NODE_ENV": "product"
      }
    }
  ]
}
