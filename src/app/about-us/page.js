import ImageFlowLogoImg from '@/components/ImageFlowLogoImg';

export const metadata = {
  title: 'About Us — ImageFlow',
  description:
    'Learn about The Webrise Company, the team behind ImageFlow, and our mission to simplify life with software.',
};

export default function AboutUsPage() {
  return (
    <main style={{ padding: 'clamp(40px, 8vw, 88px) 0 100px' }}>
      <div className="container" style={{ maxWidth: 720 }}>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 36 }}>
          <ImageFlowLogoImg height={88} />
        </div>

        <article style={{
          fontSize: 17,
          color: 'var(--muted)',
          lineHeight: 1.85,
        }}>
          <p style={{ color: 'var(--ink)', fontWeight: 600, fontSize: 'clamp(18px, 2vw, 20px)', marginBottom: 22 }}>
            The Owners, Harshit Negi and Saurav Kumar, are the proprietors and the force behind this company. From a small room, with a basic computer and limited resources, they began with passion and determination.
          </p>
          <p style={{ marginBottom: 22 }}>
            The Webrise Company, based in Delhi, was established on May 1st, 2026. We are dedicated to crafting various websites, apps, and software, constantly working to simplify the lives of creators, citizens, and students. Our mission is to provide professional solutions and continue to grow with our skilled development team.
          </p>
          <p style={{ marginBottom: 0 }}>
            <strong style={{ color: 'var(--ink)' }}>ImageFlow</strong> is one of our public offerings—privacy-first tools that run entirely in your browser so anyone can work with images confidently, without uploads or accounts.
          </p>
        </article>

      </div>
    </main>
  );
}
