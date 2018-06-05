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
      host: 'ec2-18-218-103-1.us-east-2.compute.amazonaws.com',
      key: '~/.ssh/air.pem',
      ref: 'origin/master',
      repo: 'https://github.com/cjessett/cycle-app',
      path: '/home/ubuntu/cycle-app',
      'post-deploy': 'yarn && yarn pm2 startOrRestart ecosystem.config.js',
    },
  },
}
