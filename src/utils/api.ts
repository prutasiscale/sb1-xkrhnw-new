import axios from 'axios';
import { Config, Inventory } from '../types';

const API_BASE_URL = 'http://192.168.1.197:9998';

const mockConfig: Config = {
  api: {
    host: 'localhost',
    port: 3000
  },
  inventory_path: '/etc/ansible/inventory.ini',
  widgets: {
    status: { script_path: '/etc/ansible/playbooks/status.yml' },
    services: { script_path: '/etc/ansible/playbooks/nmap.yml' },
    cpu: { script_path: '/etc/ansible/playbooks/cpu_usage.yml' },
    ram: { script_path: '/etc/ansible/playbooks/check_ram_usage.yml' },
    disk: { script_path: '/etc/ansible/playbooks/chk_rt_var.yml' }
  }
};

const mockInventory: Inventory = {
  nuc_sensors: {
    hosts: {
      '192.168.1.204': { ansible_host: '192.168.1.204', ansible_user: 'pruta', ansible_become_pass: '******', ansible_ssh_private_key_file: '/etc/ansible/.ssh/id_ed25519' },
      '192.168.1.206': { ansible_host: '192.168.1.206', ansible_user: 'pruta', ansible_become_pass: '******', ansible_ssh_private_key_file: '/etc/ansible/.ssh/id_ed25519' }
    }
  },
  elasticsearch: {
    hosts: {
      '192.168.1.210': { ansible_host: '192.168.1.210', ansible_user: 'pruta', ansible_ssh_private_key_file: '/etc/ansible/.ssh/id_ed25519', ansible_become_pass: '******' },
      '192.168.1.211': { ansible_host: '192.168.1.211', ansible_user: 'pruta', ansible_ssh_private_key_file: '/etc/ansible/.ssh/id_ed25519', ansible_become_pass: '******' },
      '192.168.1.212': { ansible_host: '192.168.1.212', ansible_user: 'pruta', ansible_ssh_private_key_file: '/etc/ansible/.ssh/id_ed25519', ansible_become_pass: '******' },
      '192.168.1.213': { ansible_host: '192.168.1.213', ansible_user: 'pruta', ansible_ssh_private_key_file: '/etc/ansible/.ssh/id_ed25519', ansible_become_pass: '******' },
      '192.168.1.230': { ansible_host: '192.168.1.230', ansible_user: 'pruta', ansible_ssh_private_key_file: '/etc/ansible/.ssh/id_ed25519', ansible_become_pass: '******' },
      '192.168.1.231': { ansible_host: '192.168.1.231', ansible_user: 'pruta', ansible_ssh_private_key_file: '/etc/ansible/.ssh/id_ed25519', ansible_become_pass: '******' },
      '192.168.1.240': { ansible_host: '192.168.1.240', ansible_user: 'pruta', ansible_ssh_private_key_file: '/etc/ansible/.ssh/id_ed25519', ansible_become_pass: '******' },
      '192.168.1.241': { ansible_host: '192.168.1.241', ansible_user: 'pruta', ansible_ssh_private_key_file: '/etc/ansible/.ssh/id_ed25519', ansible_become_pass: '******' }
    }
  },
  kibana: {
    hosts: {
      '192.168.1.214': { ansible_host: '192.168.1.214', ansible_user: 'pruta', ansible_ssh_private_key_file: '/etc/ansible/.ssh/id_ed25519', ansible_become_pass: '******' },
      '192.168.1.232': { ansible_host: '192.168.1.232', ansible_user: 'pruta', ansible_ssh_private_key_file: '/etc/ansible/.ssh/id_ed25519', ansible_become_pass: '******' }
    }
  },
  openvpn: {
    hosts: {
      '192.168.1.254': { ansible_host: '192.168.1.254', ansible_user: 'pruta', ansible_ssh_private_key_file: '/etc/ansible/.ssh/id_ed25519', ansible_become_pass: '******' },
      '192.168.1.253': { ansible_host: '192.168.1.253', ansible_user: 'pruta', ansible_ssh_private_key_file: '/etc/ansible/.ssh/id_ed25519', ansible_become_pass: '******' },
      '192.168.1.200': { ansible_host: '192.168.1.200', ansible_user: 'pruta', ansible_ssh_private_key_file: '/etc/ansible/.ssh/id_ed25519', ansible_become_pass: '******' }
    }
  },
  pve: {
    hosts: {
      '192.168.1.216': { ansible_host: '192.168.1.216', ansible_user: 'pruta', ansible_ssh_private_key_file: '/etc/ansible/.ssh/id_ed25519', ansible_become_pass: '******' },
      '192.168.1.217': { ansible_host: '192.168.1.217', ansible_user: 'pruta', ansible_ssh_private_key_file: '/etc/ansible/.ssh/id_ed25519', ansible_become_pass: '******' },
      '192.168.1.218': { ansible_host: '192.168.1.218', ansible_user: 'pruta', ansible_ssh_private_key_file: '/etc/ansible/.ssh/id_ed25519', ansible_become_pass: '******' },
      '192.168.1.219': { ansible_host: '192.168.1.219', ansible_user: 'pruta', ansible_ssh_private_key_file: '/etc/ansible/.ssh/id_ed25519', ansible_become_pass: '******' },
      '192.168.1.220': { ansible_host: '192.168.1.220', ansible_user: 'pruta', ansible_ssh_private_key_file: '/etc/ansible/.ssh/id_ed25519', ansible_become_pass: '******' },
      '192.168.1.221': { ansible_host: '192.168.1.221', ansible_user: 'pruta', ansible_ssh_private_key_file: '/etc/ansible/.ssh/id_ed25519', ansible_become_pass: '******' },
      '192.168.1.222': { ansible_host: '192.168.1.222', ansible_user: 'pruta', ansible_ssh_private_key_file: '/etc/ansible/.ssh/id_ed25519', ansible_become_pass: '******' },
      '192.168.1.223': { ansible_host: '192.168.1.223', ansible_user: 'pruta', ansible_ssh_private_key_file: '/etc/ansible/.ssh/id_ed25519', ansible_become_pass: '******' },
      '192.168.1.224': { ansible_host: '192.168.1.224', ansible_user: 'pruta', ansible_ssh_private_key_file: '/etc/ansible/.ssh/id_ed25519', ansible_become_pass: '******' }
    }
  },
  ubuwin: {
    hosts: {
      '192.168.1.182': { ansible_host: '192.168.1.182', ansible_user: 'pruta', ansible_ssh_private_key_file: '/etc/ansible/.ssh/id_ed25519', ansible_become_pass: '******' }
    }
  },
  arcanna: {
    hosts: {
      '192.168.1.199': { ansible_host: '192.168.1.199', ansible_user: 'pruta', ansible_ssh_private_key_file: '/etc/ansible/.ssh/id_ed25519', ansible_become_pass: '******' },
      '192.168.1.201': { ansible_host: '192.168.1.201', ansible_user: 'pruta', ansible_ssh_private_key_file: '/etc/ansible/.ssh/id_ed25519', ansible_become_pass: '******' },
      '192.168.1.207': { ansible_host: '192.168.1.207', ansible_user: 'pruta', ansible_ssh_private_key_file: '/etc/ansible/.ssh/id_ed25519', ansible_become_pass: '******' }
    }
  }
};

export const fetchConfig = async (): Promise<Config> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/config`);
    return response.data;
  } catch (error) {
    console.warn('Failed to fetch config, using mock data:', error);
    return mockConfig;
  }
};

export const fetchInventory = async (): Promise<Inventory> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/inventory`);
    return response.data;
  } catch (error) {
    console.warn('Failed to fetch inventory, using mock data:', error);
    return mockInventory;
  }
};

export const fetchWidgetData = async (scriptPath: string, host: string): Promise<any> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/widget/${encodeURIComponent(scriptPath)}`, {
      params: { host },
    });
    return response.data;
  } catch (error) {
    console.warn(`Failed to fetch widget data for ${scriptPath}, using mock data:`, error);
    return getMockWidgetData(scriptPath);
  }
};

function getMockWidgetData(scriptPath: string): any {
  if (scriptPath.includes('chk_rt_var')) {
    return {
      disk_usage: {
        stdout_lines: [
          "Filesystem                         Size  Used Avail Use% Mounted on",
          "/dev/mapper/ubuntu--vg-ubuntu--lv   98G   17G   77G  18% /",
          "/dev/mapper/ubuntu--vg-lv--0       2.8T  2.4T  318G  89% /var"
        ]
      }
    };
  } else if (scriptPath.includes('check_ram_usage')) {
    return {
      ram_usage_percent: { stdout: (Math.random() * 100).toFixed(2) },
      total_ram_gb: { stdout: "30" },
      available_ram_mb: { stdout: (Math.random() * 30000).toFixed(0) }
    };
  } else if (scriptPath.includes('cpu_usage')) {
    return {
      cpu_usage: { stdout: (Math.random() * 100).toFixed(2) }
    };
  } else if (scriptPath.includes('nmap')) {
    return {
      nmap_result: { stdout: "22/tcp open  ssh\n80/tcp open  http\n443/tcp open https" }
    };
  } else if (scriptPath.includes('status')) {
    return {
      status: { 
        stdout: Math.random() > 0.9 ? "DOWN" : "UP - Uptime: 39 days, 15:01, 1 user, load average: 0.26, 0.25, 0.28" 
      }
    };
  }
  return { status: 'Mock data for ' + scriptPath };
}