import React from 'react';
import CookieConsent from 'react-cookie-consent';

export default function Root({children}) {
  return (
    <>
      {children}
      <CookieConsent
        location="bottom"
        buttonText="Alle akzeptieren"
        declineButtonText="Nur notwendige"
        enableDeclineButton
        cookieName="meshrheinland-cookie-consent"
        style={{
          background: '#2B373B',
          alignItems: 'center',
        }}
        buttonStyle={{
          background: '#4CAF50',
          color: '#fff',
          fontSize: '14px',
          borderRadius: '4px',
          padding: '10px 20px',
          margin: '0 10px',
        }}
        declineButtonStyle={{
          background: '#757575',
          color: '#fff',
          fontSize: '14px',
          borderRadius: '4px',
          padding: '10px 20px',
        }}
        expires={365}
        overlay
      >
        <div style={{fontSize: '14px', lineHeight: '1.6'}}>
          <strong>Cookie-Einstellungen</strong>
          <p style={{margin: '8px 0'}}>
            Wir verwenden Cookies, um Ihnen die bestmögliche Nutzung unserer
            Website zu ermöglichen. Notwendige Cookies sind für das Funktionieren
            der Website unerlässlich. Sie können wählen, ob Sie zusätzliche
            Cookies akzeptieren möchten.
          </p>
        </div>
      </CookieConsent>
    </>
  );
}
