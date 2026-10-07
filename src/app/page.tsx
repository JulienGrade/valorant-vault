import Link from "next/link";

export default function HomePage() {
  return (
      <main id="main-content">
        <section className="hero">
          <div className="container hero__layout">
            <div className="hero__content">
              <p className="eyebrow">Projet pédagogique Next.js</p>

              <h1>Choisissez votre prochain agent.</h1>

              <p className="hero__description">
                Découvrez les agents de Valorant, leurs rôles et leurs
                compétences. Constituez ensuite votre propre sélection de
                favoris.
              </p>

              <div className="hero__actions">
                <Link className="button button--primary" href="/agents">
                  Découvrir les agents
                </Link>

                <Link className="button button--secondary" href="/favoris">
                  Voir mes favoris
                </Link>
              </div>
            </div>

            <div className="hero__visual" aria-hidden="true">
              <div className="agent-card">
                <span className="agent-card__number">01</span>

                <div className="agent-card__content">
                  <p>Valorant Protocol</p>
                  <strong>VAULT</strong>
                  <span>Agents Database</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container presentation">
          <div className="section-heading">
            <p className="eyebrow">L’application</p>

            <h2>Une API réelle dans une interface dynamique.</h2>

            <p>
              Valorant Vault utilise les données publiques de Valorant-API pour
              présenter les agents et leurs compétences dans une application
              développée avec Next.js.
            </p>
          </div>

          <div className="feature-grid">
            <article>
              <span>01</span>
              <h3>Explorer</h3>
              <p>Parcourez la liste des agents disponibles dans le jeu.</p>
            </article>

            <article>
              <span>02</span>
              <h3>Comprendre</h3>
              <p>Consultez le rôle et les compétences propres à chaque agent.</p>
            </article>

            <article>
              <span>03</span>
              <h3>Collectionner</h3>
              <p>Conservez vos agents préférés directement dans le navigateur.</p>
            </article>
          </div>
        </section>
      </main>
  );
}