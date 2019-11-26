const args = [ 'start' ];
const opts = { stdio: 'inherit', cwd: 'marriott', shell: true };
require('child_process').spawn('npm', args, opts);