import { fetchWordPress } from '@/lib/wordpress/client';
import type { BlogPost, WPPost } from '@/lib/wordpress/types';
import { isWordPressConfigured } from '@/lib/env';
import { IMAGES } from '@/data/images';

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

function mapPost(post: WPPost): BlogPost {
  const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];

  return {
    id: post.id || 0,
    slug: post.slug || '',
    title: stripHtml(post.title?.rendered || 'Untitled'),
    excerpt: stripHtml(post.excerpt?.rendered || ''),
    content: post.content?.rendered || '',
    date: post.date || new Date().toISOString(),
    image: featuredMedia?.source_url ?? IMAGES.blog.default,
    imageAlt: featuredMedia?.alt_text ?? stripHtml(post.title?.rendered || 'Blog image'),
  };
}

export async function getBlogPosts(limit = 12): Promise<BlogPost[]> {
  if (!isWordPressConfigured()) return [];

  try {
    const posts = await fetchWordPress<WPPost[]>('/wp/v2/posts', {
      per_page: limit,
      _embed: '1',
      orderby: 'date',
      order: 'desc',
    });

    if (!Array.isArray(posts)) {
      console.warn('[WordPress] Response is not an array:', posts);
      return [];
    }

    return posts
      .filter(post => post && typeof post === 'object')
      .map(mapPost);
  } catch (error) {
    console.warn('[WordPress] Gagal mengambil artikel blog:', error);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!isWordPressConfigured()) return null;

  try {
    const posts = await fetchWordPress<WPPost[]>('/wp/v2/posts', {
      slug,
      _embed: '1',
    });

    if (!Array.isArray(posts) || !posts.length) return null;

    const post = posts[0];
    if (!post || typeof post !== 'object') return null;

    return mapPost(post);
  } catch (error) {
    console.warn(`[WordPress] Gagal mengambil artikel "${slug}":`, error);
    return null;
  }
}
