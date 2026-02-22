'use client'

import { useState } from 'react'
import { Twitter, Facebook, Link2, Check } from 'lucide-react'

interface ShareButtonsProps {
  title: string
  url: string
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-500 font-medium mr-1">Share:</span>

      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 px-3 py-1.5 bg-black text-white text-xs font-semibold rounded-full hover:bg-gray-800 transition-colors"
      >
        <Twitter className="w-3.5 h-3.5" />
        X
      </a>

      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-full hover:bg-blue-700 transition-colors"
      >
        <Facebook className="w-3.5 h-3.5" />
        Share
      </a>

      <a
        href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500 text-white text-xs font-semibold rounded-full hover:bg-green-600 transition-colors"
      >
        WhatsApp
      </a>

      <button
        onClick={handleCopy}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full hover:bg-gray-200 transition-colors"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Link2 className="w-3.5 h-3.5" />}
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  )
}
