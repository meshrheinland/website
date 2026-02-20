import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div style={{maxWidth: '800px', margin: '2rem auto', fontSize: '1.1rem'}}>
          <p>
            Im Rheinland nutzen wir zwei LoRa-basierte Mesh-Netzwerke: <strong>Meshtastic</strong> und <strong>MeshCore</strong>.
            Beide ermöglichen Kommunikation ohne Internet oder Mobilfunk – mit unterschiedlichen Stärken und Schwächen.
          </p>
        </div>
      </div>
    </header>
  );
}

const EVENT_DATE = new Date('2026-02-21T00:00:00');

function getEventLabel(): string | null {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diffDays = Math.round(
    (EVENT_DATE.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );
  if (diffDays === 1) return 'Morgen:';
  if (diffDays === 0) return 'Heute:';
  if (diffDays === -1) return 'Gestern:';
  return null;
}

function EventBanner(): ReactNode {
  const label = getEventLabel();
  if (!label) return null;

  return (
    <div style={{
      background: 'linear-gradient(135deg, #c0392b 0%, #922b21 100%)',
      color: '#fff',
      padding: '1.5rem 2rem',
    }}>
      <div className="container">
        <div style={{textAlign: 'center'}}>
          <p style={{fontSize: '1.25rem', fontWeight: 'bold', margin: '0 0 0.25rem'}}>
            {label} Notfunkübung DARC Distrikt G – 21. Februar 2026
          </p>
          <p style={{margin: '0 0 0.75rem', opacity: 0.9}}>
            Meshtastic & MeshCore im Einsatz – Großraum Aachen · Köln · Bonn, ab 14:00 Uhr
          </p>
          <Link
            className="button button--lg"
            to="/naechste-notfunk-uebung"
            style={{background: '#fff', color: '#c0392b', fontWeight: 'bold'}}>
            Alle Infos zur Übung →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Willkommen bei ${siteConfig.title}`}
      description="Meshtastic und MeshCore Community im Rheinland">
      <EventBanner />
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
