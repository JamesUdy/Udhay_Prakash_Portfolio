import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { routeMeta, SITE_URL, AUTHOR } from '../../utils/seo';

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: AUTHOR,
  url: SITE_URL,
  jobTitle: 'Full Stack Developer',
  sameAs: [
    'https://github.com/UdhayaPrakashM',
    'https://www.linkedin.com/in/udhaya-prakash-m',
  ],
};

export default function HelmetWrapper() {
  const { pathname } = useLocation();
  const meta = routeMeta[pathname] ?? routeMeta['/'];
  const canonical = `${SITE_URL}${meta.path}`;
  const ogImage = meta.ogImage ?? `${SITE_URL}/og-image.png`;

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD Person schema — only on home route */}
      {pathname === '/' && (
        <script type="application/ld+json">
          {JSON.stringify(personSchema)}
        </script>
      )}
    </Helmet>
  );
}
