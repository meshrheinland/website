import React, { useEffect, useRef } from 'react';
import iframeResize from '@iframe-resizer/parent';

export default function PowerArchitectWidget() {
  const ref = useRef(null);

  useEffect(() => {
    iframeResize({ checkOrigin: false }, ref.current);
  }, []);

  return (
    <iframe
      ref={ref}
      src="https://power-architect.meshrheinland.de"
      style={{ width: '1px', minWidth: '100%', border: 'none', display: 'block' }}
      scrolling="no"
    />
  );
}
