import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import BrowserOnly from '@docusaurus/BrowserOnly';

const MESHTASTIC_URL = 'https://chat.whatsapp.com/CRYnRrAzhYeDlQEJQZQpKi';
const MESHCORE_URL = 'https://chat.whatsapp.com/JyNcTcgwlJf6Mhhf7vgYWD';

function QrCode({url}: {url: string}): ReactNode {
  return (
    <BrowserOnly fallback={<div style={{width: 200, height: 200}} />}>
      {() => {
        const {QRCodeSVG} = require('qrcode.react');
        return <QRCodeSVG value={url} size={200} level="M" includeMargin={false} />;
      }}
    </BrowserOnly>
  );
}

function Protocol({title, url, docsPath}: {title: string; url: string; docsPath: string}): ReactNode {
  return (
    <div className="col col--6 text--center" style={{padding: '1.5rem 1rem'}}>
      <Heading as="h2">{title}</Heading>
      <div style={{display: 'flex', justifyContent: 'center', margin: '1.25rem 0'}}>
        <QrCode url={url} />
      </div>
      <a className="button button--primary button--lg" href={url} target="_blank" rel="noopener noreferrer">
        WhatsApp-Community beitreten
      </a>
      <p style={{marginTop: '1rem'}}>
        <Link to={docsPath}>Zur Dokumentation</Link>
      </p>
    </div>
  );
}

export default function Join(): ReactNode {
  return (
    <Layout
      title="Mesh Rheinland - Community beitreten"
      description="Du hast unsere Einladung empfangen. Tritt unserer Meshtastic- oder MeshCore-Community im Rheinland bei."
>
      <header className="hero hero--primary">
        <div className="container">
          <Heading as="h1" className="hero__title">
            Du hast gerade unsere Einladung empfangen!
          </Heading>
          <p className="hero__subtitle">
            Willkommen bei Mesh Rheinland. Kommunikation ohne Internet und ohne Mobilfunk.
            Wähle dein Protokoll und tritt der passenden WhatsApp-Community bei.
          </p>
        </div>
      </header>

      <main>
        <div className="container" style={{padding: '2.5rem 1rem 1rem'}}>
          <div className="row">
            <div className="col col--4">
              <h3>Wer wir sind</h3>
              <p>
                Mesh Rheinland ist eine offene Community von über fünfhundert Hobbyisten, Funkamateuren und
                Technikbegeisterten entlang des Rheins. Jeder ist eingeladen mitzumachen,
                unabhängig vom Standort oder Erfahrungsstand.
              </p>
            </div>
            <div className="col col--4">
              <h3>Was uns ausmacht</h3>
              <p>
                Bei uns geht es um mehr als Technik oder Notfunk! Wir fachsimpeln, tauschen Ideen aus,
                helfen uns gegenseitig und treffen uns wann immer möglich. Die Gemeinschaft steht
                im Mittelpunkt.
              </p>
            </div>
            <div className="col col--4">
              <h3>Warum beitreten?</h3>
              <p>
                Ob du gerade erst anfängst oder schon tief im Thema steckst: In der Gruppe
                findest du Gleichgesinnte, bekommst schnell Antworten und gestaltest das Netz
                aktiv mit. Jeder Beitrag hilft, es besser zu machen.
              </p>
            </div>
          </div>
        </div>

        <div className="container" style={{padding: '1rem 0 2.5rem'}}>
          <hr />
          <div className="row">
            <Protocol title="Meshtastic" url={MESHTASTIC_URL} docsPath="/meshtastic/intro" />
            <Protocol title="MeshCore" url={MESHCORE_URL} docsPath="/meshcore/intro" />
          </div>
          <p className="text--center" style={{marginTop: '2rem'}}>
            Du hast diese Einladung ungebeten empfangen oder bevorzugst eine andere Plattform als WhatsApp?
            Wir freuen uns über konstruktives Feedback:{' '}
            <a href="mailto:rennleitung@meshrheinland.de">rennleitung@meshrheinland.de</a>.
          </p>
        </div>
      </main>
    </Layout>
  );
}
