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

const EVENT_START = new Date('2026-11-28T00:00:00');
const EVENT_END = new Date('2026-11-29T00:00:00');

const MS_PER_DAY = 1000 * 60 * 60 * 24;

function getEventLabel(): string | null {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const daysUntilStart = Math.round((EVENT_START.getTime() - today.getTime()) / MS_PER_DAY);
  const daysSinceEnd = Math.round((today.getTime() - EVENT_END.getTime()) / MS_PER_DAY);
  if (daysUntilStart > 7 || daysSinceEnd > 0) return null;
  if (daysUntilStart <= 0) return 'Heute:';
  if (daysUntilStart === 1) return 'Morgen:';
  return `In ${daysUntilStart} Tagen:`;
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
            {label} 10. Notfunkübung Distrikt Köln-Aachen, 28.–29. November 2026
          </p>
          <p style={{margin: '0 0 0.75rem', opacity: 0.9}}>
            Komplexes Übungsszenario – zweitägige Großübung
          </p>
          <Link
            className="button button--lg"
            to="/notfunk/naechste-uebung"
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
      title="LoRa-Mesh-Community im Rheinland"
      description="LoRa-Mesh-Community im Rheinland und Umgebung. Kommunikation ohne Internet und Mobilfunk – Schnellstart, regionale Einstellungen und häufige Fragen.">
      <EventBanner />
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
