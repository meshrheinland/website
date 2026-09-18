import type {ReactNode} from 'react';
import clsx from 'clsx';
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

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="LoRa-Mesh-Community im Rheinland"
      description="LoRa-Mesh-Community im Rheinland und Umgebung. Kommunikation ohne Internet und Mobilfunk – Schnellstart, regionale Einstellungen und häufige Fragen.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
