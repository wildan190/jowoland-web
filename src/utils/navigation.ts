import { SOCIAL_LINKS } from '@/data/site';

const navBarLinks = [
  { name: 'Beranda', url: '/' },
  { name: 'Portofolio', url: '/portfolio' },
  { name: 'Blog', url: '/blog' },
  { name: 'Tentang', url: '/about' },
  { name: 'Kontak', url: '/contact' },
];

const footerLinks = [
  {
    section: 'Layanan',
    links: [
      { name: 'Jasa Bore Pile', url: '/services/bore-pile' },
      { name: 'Strauss Pile', url: '/services/strauss-pile' },
      { name: 'Portofolio', url: '/portfolio' },
      { name: 'Konsultasi Gratis', url: '/contact' },
    ],
  },
  {
    section: 'Perusahaan',
    links: [
      { name: 'Tentang Kami', url: '/about' },
      { name: 'Blog', url: '/blog' },
      { name: 'Privacy Policy', url: '/privacy-policy' },
      { name: 'Terms of Service', url: '/terms-of-service' },
    ],
  },
];

const socialLinks = {
  facebook: SOCIAL_LINKS.facebook,
  instagram: SOCIAL_LINKS.instagram,
  youtube: SOCIAL_LINKS.youtube,
  linkedin: SOCIAL_LINKS.linkedin,
  tiktok: SOCIAL_LINKS.tiktok,
  pinterest: SOCIAL_LINKS.pinterest,
  maps: SOCIAL_LINKS.maps,
};

export default {
  navBarLinks,
  footerLinks,
  socialLinks,
};
