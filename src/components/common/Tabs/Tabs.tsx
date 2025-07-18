'use client';

import { useState, useRef, ReactNode, useMemo, useCallback } from 'react';

import { TabsContext } from '@/providers/TabsContext';

interface TabsProps {
  defaultValue: string;
  children: ReactNode;
  className?: string;
}

export default function Tabs({ defaultValue, children, className = '' }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue);
  const tabRefs = useRef(new Map<string, HTMLButtonElement>());

  const registerTab = useCallback((value: string, element: HTMLButtonElement | null) => {
    if (element) {
      tabRefs.current.set(value, element);
    } else {
      tabRefs.current.delete(value);
    }
  }, []);

  const contextValue = useMemo(
    () => ({
      activeTab,
      setActiveTab,
      registerTab,
      tabElements: tabRefs.current,
    }),
    [activeTab, registerTab],
  );

  return (
    <TabsContext.Provider value={contextValue}>
      <div
        className={`
          ${className}
        `}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
}
