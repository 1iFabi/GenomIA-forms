import './WhatIsGenomiaSection.css';

const messages = [
  'Descubre tu ancestría',
  'Descubre tus rasgos',
  'Descubre tu salud',
];

export default function WhatIsGenomiaSection() {
  return (
    <section className="what-is-genomia" aria-labelledby="what-is-genomia-title">
      <div className="what-is-genomia__copy">
        <h2 id="what-is-genomia-title">QUÉ ES GenomIA</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Descubre una
          nueva forma de acercarte a la historia que llevas en ti.
        </p>
      </div>

      <div className="what-is-genomia__visual">
        <div className="phone" aria-label="Mensajes de GenomIA">
          <div className="phone__notch" aria-hidden="true" />
          <ol className="phone__messages">
            {messages.map((message) => (
              <li className="phone__message" key={message}>
                {message}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
