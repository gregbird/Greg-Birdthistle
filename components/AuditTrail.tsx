import React, { useState } from 'react';
import * as Lucide from 'lucide-react';
import type { AuditEntry } from '../types';

interface AuditTrailProps {
  auditTrail: AuditEntry[];
}

const getChangeTypeIcon = (changeType: string) => {
  switch (changeType) {
    case 'Created Project':
      return <Lucide.Briefcase className="w-4 h-4" />;
    case 'Created Assessment':
    case 'Updated Assessment':
      return <Lucide.FileText className="w-4 h-4" />;
    case 'Created Action':
    case 'Updated Action':
      return <Lucide.CheckSquare className="w-4 h-4" />;
    case 'Updated GIS Mapping':
      return <Lucide.Map className="w-4 h-4" />;
    case 'Data Input':
      return <Lucide.Database className="w-4 h-4" />;
    default:
      return <Lucide.Activity className="w-4 h-4" />;
  }
};

const getChangeTypeColor = (changeType: string) => {
  switch (changeType) {
    case 'Created Project':
      return 'bg-blue-100 text-blue-800';
    case 'Created Assessment':
    case 'Updated Assessment':
      return 'bg-purple-100 text-purple-800';
    case 'Created Action':
    case 'Updated Action':
      return 'bg-green-100 text-green-800';
    case 'Updated GIS Mapping':
      return 'bg-cyan-100 text-cyan-800';
    case 'Data Input':
      return 'bg-orange-100 text-orange-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const AuditTrail: React.FC<AuditTrailProps> = ({ auditTrail }) => {
  const [filterChangeType, setFilterChangeType] = useState<string>('All');
  const [filterUserName, setFilterUserName] = useState<string>('All');

  const changeTypes = ['All', ...new Set(auditTrail.map(entry => entry.changeType))];
  const userNames = ['All', ...new Set(auditTrail.map(entry => entry.userName))];

  const filteredAuditTrail = auditTrail.filter(entry => {
    const typeMatch = filterChangeType === 'All' || entry.changeType === filterChangeType;
    const userMatch = filterUserName === 'All' || entry.userName === filterUserName;
    return typeMatch && userMatch;
  });

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary mb-2">Audit Trail</h1>
        <p className="text-gray-600">Track all changes and activities across the platform</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Change Type</label>
          <select
            value={filterChangeType}
            onChange={(e) => setFilterChangeType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {changeTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Filter by User</label>
          <select
            value={filterUserName}
            onChange={(e) => setFilterUserName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {userNames.map(name => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date & Time</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">User Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Change Type</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Item Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Site Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAuditTrail.length > 0 ? (
                filteredAuditTrail.map((entry, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="font-medium">{new Date(entry.timestamp).toLocaleDateString()}</div>
                      <div className="text-gray-500">{new Date(entry.timestamp).toLocaleTimeString()}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-primary text-secondary flex items-center justify-center text-xs font-bold">
                          {entry.userName.charAt(0)}
                        </div>
                        <span>{entry.userName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getChangeTypeColor(entry.changeType)}`}>
                        {getChangeTypeIcon(entry.changeType)}
                        <span>{entry.changeType}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">{entry.itemName}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{entry.siteName || '-'}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{entry.details || '-'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    <Lucide.Search className="w-10 h-10 mx-auto mb-2 opacity-30" />
                    <p>No audit entries match your filters</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        Showing {filteredAuditTrail.length} of {auditTrail.length} entries
      </div>
    </div>
  );
};

export default AuditTrail;
