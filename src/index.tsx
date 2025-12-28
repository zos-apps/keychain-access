import React, { useState } from 'react';

interface KeychainAccessProps {
  onClose: () => void;
}

interface KeychainItem {
  id: string;
  name: string;
  type: 'password' | 'secure-note' | 'certificate';
  account?: string;
  url?: string;
  created: string;
}

const mockItems: KeychainItem[] = [
  { id: '1', name: 'github.com', type: 'password', account: 'zeekay', url: 'https://github.com', created: '2024-01-15' },
  { id: '2', name: 'AWS Access Key', type: 'secure-note', created: '2024-02-20' },
  { id: '3', name: 'SSH Key Passphrase', type: 'password', account: 'id_rsa', created: '2023-12-01' },
  { id: '4', name: 'npm Token', type: 'secure-note', created: '2024-03-10' },
  { id: '5', name: 'Development Certificate', type: 'certificate', created: '2024-01-01' },
];

const KeychainAccess: React.FC<KeychainAccessProps> = ({ onClose }) => {
  const [items] = useState(mockItems);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [filter, setFilter] = useState<'all' | 'password' | 'secure-note' | 'certificate'>('all');

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.account?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || item.type === filter;
    return matchesSearch && matchesFilter;
  });

  const selectedItem = items.find(i => i.id === selectedId);

  const getIcon = (type: KeychainItem['type']) => {
    switch (type) {
      case 'password': return '🔑';
      case 'secure-note': return '📄';
      case 'certificate': return '📜';
    }
  };

  return (
    <div className="h-full flex bg-[#2d2d2d] text-white">
      <div className="w-64 border-r border-white/10 flex flex-col">
        <div className="p-3 border-b border-white/10">
          <input
            type="text"
            placeholder="Search keychain..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 bg-white/10 rounded-lg text-sm placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="p-2 border-b border-white/10 flex gap-1">
          {(['all', 'password', 'secure-note', 'certificate'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-2 py-1 rounded text-xs capitalize transition-colors
                ${filter === f ? 'bg-blue-600' : 'bg-white/10 hover:bg-white/20'}
              `}
            >
              {f === 'all' ? 'All' : f === 'secure-note' ? 'Notes' : f === 'certificate' ? 'Certs' : 'Pass'}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredItems.map(item => (
            <div
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              className={`p-3 cursor-pointer border-b border-white/5 transition-colors
                ${selectedId === item.id ? 'bg-blue-600/30' : 'hover:bg-white/5'}
              `}
            >
              <div className="flex items-center gap-2">
                <span>{getIcon(item.type)}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{item.name}</div>
                  {item.account && (
                    <div className="text-xs text-white/50 truncate">{item.account}</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 border-t border-white/10">
          <button className="w-full py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-medium transition-colors">
            + Add Item
          </button>
        </div>
      </div>

      <div className="flex-1 p-6">
        {selectedItem ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{getIcon(selectedItem.type)}</span>
              <div>
                <h2 className="text-xl font-semibold">{selectedItem.name}</h2>
                <div className="text-sm text-white/50 capitalize">{selectedItem.type.replace('-', ' ')}</div>
              </div>
            </div>

            <div className="space-y-3 mt-6">
              {selectedItem.account && (
                <div className="p-3 bg-white/5 rounded-lg">
                  <div className="text-xs text-white/50 mb-1">Account</div>
                  <div className="font-mono">{selectedItem.account}</div>
                </div>
              )}

              {selectedItem.type === 'password' && (
                <div className="p-3 bg-white/5 rounded-lg">
                  <div className="text-xs text-white/50 mb-1">Password</div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono">
                      {showPassword ? 'sup3rs3cr3t!' : '••••••••••••'}
                    </span>
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-blue-400 text-sm hover:text-blue-300"
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>
              )}

              {selectedItem.url && (
                <div className="p-3 bg-white/5 rounded-lg">
                  <div className="text-xs text-white/50 mb-1">URL</div>
                  <div className="text-blue-400">{selectedItem.url}</div>
                </div>
              )}

              <div className="p-3 bg-white/5 rounded-lg">
                <div className="text-xs text-white/50 mb-1">Created</div>
                <div>{selectedItem.created}</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-white/40">
            <div className="text-center">
              <div className="text-4xl mb-4">🔐</div>
              <p>Select an item to view details</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KeychainAccess;
