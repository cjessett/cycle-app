module.exports = {
  apps: [{
    name: 'cycle-app',
    script: './server.js',
    wait_ready: true,
    autorestart: false,
    error_file: 'err.log',
    out_file: 'out.log',
    log_date_format: 'YYYY-MM-DD HH:mm Z',
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'cjessett.com',
      key: '~/.ssh/buoyfeed.pem',
      ref: 'origin/master',
      repo: 'git@github.com:cjessett/cycle-app.git',
      path: '/home/ubuntu/cycle-app',
      'post-deploy': 'yarn && yarn pm2 startOrRestart ecosystem.config.js',
    },
  },
}
