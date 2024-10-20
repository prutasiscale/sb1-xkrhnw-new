const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');

const app = express();
const port = 9998;

app.use(cors());
app.use(express.static('dist')); // Serve static files from the 'dist' directory

app.get('/config', (req, res) => {
  // Return your config object
  res.json({
    api: { host: 'localhost', port: 9998 },
    inventory_path: '/etc/ansible/inventory.ini',
    widgets: {
      status: { script_path: '/etc/ansible/playbooks/status.yml' },
      services: { script_path: '/etc/ansible/playbooks/nmap.yml' },
      cpu: { script_path: '/etc/ansible/playbooks/cpu_usage.yml' },
      ram: { script_path: '/etc/ansible/playbooks/check_ram_usage.yml' },
      disk: { script_path: '/etc/ansible/playbooks/chk_rt_var.yml' }
    }
  });
});

app.get('/inventory', (req, res) => {
  exec('ansible-inventory --list', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).json({ error: 'Failed to fetch inventory' });
    }
    res.json(JSON.parse(stdout));
  });
});

app.get('/widget/:scriptPath', (req, res) => {
  const { scriptPath } = req.params;
  const { host } = req.query;

  if (!scriptPath || !host) {
    return res.status(400).json({ error: 'Missing scriptPath or host' });
  }

  const command = `ansible-playbook ${scriptPath} -i /etc/ansible/inventory.ini --limit ${host}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).json({ error: 'Failed to execute playbook' });
    }
    res.json({ output: stdout });
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`API server running at http://0.0.0.0:${port}`);
});