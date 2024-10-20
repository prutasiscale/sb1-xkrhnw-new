import React, { useState, useEffect } from 'react';
import HostTable from './components/HostTable';
import WidgetContainer from './components/WidgetContainer';
import WorldClocks from './components/WorldClocks';
import { fetchConfig, fetchInventory } from './utils/api';
import { Config, Inventory } from './types';

const App: React.FC = () => {
  const [config, setConfig] = useState<Config | null>(null);
  const [inventory, setInventory] = useState<Inventory | null>(null);
  const [selectedHost, setSelectedHost] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [configData, inventoryData] = await Promise.all([fetchConfig(), fetchInventory()]);
        setConfig(configData);
        setInventory(inventoryData);
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Failed to load data. Please check your network connection and try again.');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleHostSelect = (host: string) => {
    setSelectedHost(host);
  };

  const getSummary = () => {
    if (!inventory) return { totalHosts: 0, totalGroups: 0, hostsUp: 0, hostsDown: 0 };
    
    const groups = Object.keys(inventory);
    let totalHosts = 0;
    let hostsUp = 0;

    groups.forEach(group => {
      const hosts = Object.keys(inventory[group].hosts);
      totalHosts += hosts.length;
      // Simulating up/down status. In a real scenario, you'd use actual status data.
      hostsUp += hosts.filter(() => Math.random() > 0.1).length;
    });

    return {
      totalHosts,
      totalGroups: groups.length,
      hostsUp,
      hostsDown: totalHosts - hostsUp
    };
  };

  const summary = getSummary();

  if (loading) {
    return <div className="text-center mt-8 text-sm">Loading data...</div>;
  }

  if (error) {
    return (
      <div className="text-red-500 text-center mt-8 text-sm">
        <p>{error}</p>
        <button 
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-2 sm:p-4 flex flex-col">
      <div className="max-w-7xl mx-auto w-full mb-4">
        <div className="bg-white rounded-lg shadow-sm p-2 flex justify-between items-center text-xs">
          <span>
            Total Hosts: <span className="font-semibold text-blue-600">{summary.totalHosts}</span>
          </span>
          <span>
            Groups: <span className="font-semibold text-purple-600">{summary.totalGroups}</span>
          </span>
          <span>
            Hosts Up: <span className="font-semibold text-green-600">{summary.hostsUp}</span>
          </span>
          <span>
            Hosts Down: <span className="font-semibold text-red-600">{summary.hostsDown}</span>
          </span>
        </div>
      </div>
      <div className="max-w-7xl mx-auto space-y-2 flex-grow">
        {inventory && (
          <div className="bg-white rounded-lg shadow-lg p-2">
            <HostTable
              inventory={inventory}
              onHostSelect={handleHostSelect}
            />
          </div>
        )}
        {config && (
          <div className="bg-white rounded-lg shadow-lg p-2">
            <WidgetContainer
              config={config}
              selectedHost={selectedHost}
            />
          </div>
        )}
      </div>
      <div className="mt-4">
        <WorldClocks />
      </div>
    </div>
  );
};

export default App;