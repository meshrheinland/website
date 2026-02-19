import React, { useEffect, useRef } from 'react';
import { initialize } from '@open-iframe-resizer/core';

export default function PowerArchitectWidget() {
  const ref = useRef(null);

  useEffect(() => {
    initialize({ checkOrigin: false }, ref.current);
  }, []);

  return (
    <iframe
      ref={ref}
      src="https://power-architect.meshrheinland.de"
      style={{ width: '1px', minWidth: '100%', border: 'none', display: 'block' }}
      scrolling="no"
      allow="clipboard-write"
    />
  );
}
