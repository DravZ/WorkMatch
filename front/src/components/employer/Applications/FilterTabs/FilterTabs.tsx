import React from 'react';

export interface TabOption<T extends string> {
  id: T;
  label: string;
  count?: number;
}

interface FilterTabsProps<T extends string> {
  tabs: TabOption<T>[];
  activeTab: T;
  onTabChange: (tabId: T) => void;
}

export function FilterTabs<T extends string>({
  tabs,
  activeTab,
  onTabChange,
}: FilterTabsProps<T>) {
  return (
    <div className="bg-white p-1 rounded-3 d-flex align-items-center shadow-sm mb-4">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className="flex-grow-1 border-0 py-2 rounded-2 fw-semibold extra-small transition-all"
            style={{
              backgroundColor: isActive ? '#0f172a' : 'transparent',
              color: isActive ? '#ffffff' : '#64748b',
            }}
          >
            {tab.label}{' '}
            {tab.count !== undefined && (
              <span className="opacity-75 ms-1">{tab.count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}