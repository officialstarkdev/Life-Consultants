import PageHero from '../components/PageHero';
import MotionReveal from '../components/MotionReveal';
import { certificateImages } from '../data/media';
import { useSEO } from '../hooks/useSEO';

function certificateLabel(path: string) {
  const file = path.split('/').pop()?.replace(/\.(jpg|jpeg|png|webp)$/i, '') || 'Certificate';
  return file.replace(/-/g, ' ');
}

export default function Certifications() {
  useSEO('Certifications | Life Consultants', 'Certifications and memberships listed by Life Consultants.');

  return (
    <>
      <PageHero eyebrow="Certifications" title="Credentials & memberships" body="Certificates and memberships are displayed from the local public image library." />
      <section className="section-pad">
        <div className="container-site grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificateImages.map((image, i) => (
            <MotionReveal key={image} delay={(i % 3) * 0.04}>
              <article className="certificate-card">
                <div className="certificate-card__media">
                  <img src={image} alt={certificateLabel(image)} loading="lazy" decoding="async" />
                </div>
                <div className="certificate-card__body">
                  <div className="eyebrow">Credential {String(i + 1).padStart(2, '0')}</div>
                  <h2>{certificateLabel(image)}</h2>
                </div>
              </article>
            </MotionReveal>
          ))}
        </div>
      </section>
    </>
  );
}
