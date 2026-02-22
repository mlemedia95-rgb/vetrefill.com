import Groq from 'groq-sdk'
import type { Category } from '@/lib/types'

function getGroqClient() {
  return new Groq({
    apiKey: process.env.GROQ_API_KEY,
  })
}

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  dogs: ['dog', 'puppy', 'canine', 'labrador', 'golden retriever', 'poodle', 'bulldog', 'husky', 'dachshund', 'beagle', 'k9', 'hound'],
  cats: ['cat', 'kitten', 'feline', 'tabby', 'siamese', 'persian', 'maine coon', 'ragdoll', 'meow'],
  wildlife: ['wild', 'wildlife', 'elephant', 'lion', 'tiger', 'bear', 'wolf', 'conservation', 'habitat', 'endangered', 'species', 'jungle', 'forest', 'safari', 'cheetah', 'leopard', 'rhino', 'hippo', 'giraffe', 'zebra', 'whale', 'shark', 'dolphin', 'seal'],
  birds: ['bird', 'parrot', 'eagle', 'owl', 'penguin', 'falcon', 'hawk', 'avian', 'robin', 'sparrow', 'pigeon', 'flamingo', 'pelican', 'hummingbird', 'nest', 'feather', 'wing', 'beak'],
  exotic: ['exotic', 'reptile', 'snake', 'lizard', 'tortoise', 'turtle', 'gecko', 'iguana', 'ferret', 'rabbit', 'hamster', 'guinea pig', 'chinchilla', 'hedgehog'],
}

export function detectCategory(title: string, content: string): Category {
  const text = (title + ' ' + content).toLowerCase()
  for (const [cat, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some(kw => text.includes(kw))) {
      return cat as Category
    }
  }
  return 'general'
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 70)
    + '-' + Date.now().toString(36)
}

export function estimateReadingTime(content: string): number {
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

export async function rewriteArticle(
  originalTitle: string,
  originalContent: string,
  defaultCategory: string = 'general'
): Promise<{ title: string; content: string; excerpt: string; tags: string[] }> {
  const prompt = `You are an engaging animal news writer for a popular English-language website. Rewrite the following animal-related news article to be informative, friendly, and captivating.

Guidelines:
- Write in clear, accessible English suitable for animal lovers worldwide
- Keep all facts accurate — do not invent new information
- Target length: 350-500 words
- Use 2-3 subheadings with <h2> tags
- Format as clean HTML: use <p> for paragraphs, <h2> for headings, <ul>/<li> for lists if appropriate
- Add a "Did You Know?" or interesting fact section if relevant
- Maintain a warm, enthusiastic, positive tone
- Start with a compelling opening sentence

Original Title: ${originalTitle}
Original Content: ${originalContent.substring(0, 2500)}

Respond ONLY with a JSON object in this exact format (no markdown, no code blocks):
{"title":"Your engaging title here (max 80 chars)","content":"<p>Full article HTML...</p>","excerpt":"One compelling sentence summary (max 155 chars)","tags":["tag1","tag2","tag3","tag4"]}`

  try {
    const groq = getGroqClient()
    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 2000,
      response_format: { type: 'json_object' },
    })

    const raw = response.choices[0]?.message?.content || '{}'
    const result = JSON.parse(raw)

    return {
      title: (result.title || originalTitle).substring(0, 100),
      content: result.content || `<p>${originalContent.substring(0, 500)}</p>`,
      excerpt: (result.excerpt || originalContent.substring(0, 155)).substring(0, 160),
      tags: Array.isArray(result.tags) ? result.tags.slice(0, 5) : [],
    }
  } catch (err) {
    console.error('Groq rewrite error:', err)
    // Fallback: orijinal içeriği kullan
    return {
      title: originalTitle.substring(0, 100),
      content: `<p>${originalContent.substring(0, 800)}</p>`,
      excerpt: originalContent.substring(0, 155),
      tags: [defaultCategory],
    }
  }
}
