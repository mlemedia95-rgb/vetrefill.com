'use client'

import { useState, useRef, useEffect } from 'react'

const ANIMALS = [
  {
    emoji: '🐱',
    name: 'Cat',
    color: '#FF6B6B',
    trait: 'Independent & Curious',
    description: "Today you're channeling pure cat energy! You'll move through the day with effortless grace and quiet confidence. Trust your instincts — they'll lead you exactly where you need to be. A moment of peaceful solitude will recharge your soul today.",
    tip: '🌟 Today\'s power: Follow your curiosity, it will open unexpected doors.',
  },
  {
    emoji: '🐶',
    name: 'Dog',
    color: '#FF9F43',
    trait: 'Loyal & Joyful',
    description: "Today you radiate warmth and loyalty! Your enthusiasm is contagious — everyone around you will feel uplifted. A simple act of kindness from you will mean the world to someone today. Your positive energy is your greatest superpower.",
    tip: '🌟 Today\'s power: Your genuine smile will open hearts and create lasting bonds.',
  },
  {
    emoji: '🦊',
    name: 'Fox',
    color: '#EE5A24',
    trait: 'Clever & Adaptable',
    description: "Today your sharp mind is your greatest asset! You'll find creative solutions where others see only problems. Your ability to adapt will turn today's challenges into exciting opportunities. Trust your clever instincts — you're always ten steps ahead.",
    tip: '🌟 Today\'s power: Your creativity will surprise even yourself today.',
  },
  {
    emoji: '🦁',
    name: 'Lion',
    color: '#F9CA24',
    trait: 'Brave & Majestic',
    description: "Today you walk with the confidence of a lion! Others will naturally look to you for guidance and strength. Don't hesitate to take the lead — you were born for it. Your courage today will inspire those around you to be their best selves.",
    tip: '🌟 Today\'s power: Step into the spotlight — you deserve to shine!',
  },
  {
    emoji: '🐺',
    name: 'Wolf',
    color: '#6C5CE7',
    trait: 'Wise & Intuitive',
    description: "Today your intuition is razor-sharp! You sense things others miss, giving you a unique advantage. Whether it's a decision or a relationship, trust your gut completely. Your deep wisdom will guide you and those you care about to exactly the right place.",
    tip: '🌟 Today\'s power: Your instincts are perfectly calibrated — listen to them.',
  },
  {
    emoji: '🦋',
    name: 'Butterfly',
    color: '#FD79A8',
    trait: 'Graceful & Transformative',
    description: "Today you're in full bloom! Something beautiful is transforming in your life right now. Embrace change with open arms — it's bringing you closer to the best version of yourself. Your lightness and grace will make every room you enter feel brighter.",
    tip: '🌟 Today\'s power: Transformation is your gift — let your true colors shine.',
  },
  {
    emoji: '🦉',
    name: 'Owl',
    color: '#00B894',
    trait: 'Wise & Perceptive',
    description: "Today your wisdom shines like never before! You see the full picture when others only see fragments. Your thoughtful perspective will be invaluable today — someone needs your unique insight. Take time to reflect; your best ideas come in quiet moments.",
    tip: '🌟 Today\'s power: Your wisdom is a gift — share it generously today.',
  },
  {
    emoji: '🐬',
    name: 'Dolphin',
    color: '#0984E3',
    trait: 'Playful & Intelligent',
    description: "Today is all about joy and connection! Your playful spirit and quick mind make you absolutely irresistible to be around. Seek out laughter and meaningful conversations — they'll fuel your day. Your ability to make deep connections effortlessly is truly special.",
    tip: '🌟 Today\'s power: Your joy is contagious — spread it everywhere you go!',
  },
  {
    emoji: '🦄',
    name: 'Unicorn',
    color: '#A29BFE',
    trait: 'Magical & Unique',
    description: "Today you are absolutely one of a kind! Your unique perspective and magical creativity set you apart from everyone else. Don't be afraid to express your most colorful, authentic self — the world needs exactly what only you can offer. Magic follows you today.",
    tip: '🌟 Today\'s power: Your uniqueness is your greatest strength — never dim it!',
  },
  {
    emoji: '🐻',
    name: 'Bear',
    color: '#55EFC4',
    trait: 'Strong & Nurturing',
    description: "Today you are a pillar of strength and warmth! Those around you feel safe and protected in your presence. Your nurturing energy creates a space where others can truly be themselves. Take pride in being someone others genuinely rely on — it's a rare and beautiful gift.",
    tip: '🌟 Today\'s power: Your strength protects and your warmth heals — both are needed today.',
  },
]

const SEGMENT_COLORS = [
  '#FF6B6B', '#FF9F43', '#EE5A24', '#F9CA24', '#6C5CE7',
  '#FD79A8', '#00B894', '#0984E3', '#A29BFE', '#55EFC4',
]

export default function FunPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [spinning, setSpinning] = useState(false)
  const [result, setResult] = useState<typeof ANIMALS[0] | null>(null)
  const [rotation, setRotation] = useState(0)
  const animFrameRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)
  const targetRotationRef = useRef(0)
  const currentRotationRef = useRef(0)

  const TOTAL = ANIMALS.length
  const SEGMENT_ANGLE = (2 * Math.PI) / TOTAL
  const SPIN_DURATION = 10000 // 10 saniye

  function drawWheel(ctx: CanvasRenderingContext2D, rot: number) {
    const cx = 250
    const cy = 250
    const radius = 230

    ctx.clearRect(0, 0, 500, 500)

    // Gölge
    ctx.save()
    ctx.shadowColor = 'rgba(0,0,0,0.18)'
    ctx.shadowBlur = 24
    ctx.beginPath()
    ctx.arc(cx, cy, radius, 0, 2 * Math.PI)
    ctx.fillStyle = '#fff'
    ctx.fill()
    ctx.restore()

    for (let i = 0; i < TOTAL; i++) {
      const startAngle = rot + i * SEGMENT_ANGLE
      const endAngle = startAngle + SEGMENT_ANGLE

      // Dilim
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.arc(cx, cy, radius, startAngle, endAngle)
      ctx.closePath()
      ctx.fillStyle = SEGMENT_COLORS[i]
      ctx.fill()
      ctx.strokeStyle = '#fff'
      ctx.lineWidth = 3
      ctx.stroke()

      // Emoji + isim
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(startAngle + SEGMENT_ANGLE / 2)
      ctx.textAlign = 'right'

      // Emoji
      ctx.font = '28px serif'
      ctx.fillText(ANIMALS[i].emoji, radius - 16, 10)

      // İsim
      ctx.font = 'bold 13px sans-serif'
      ctx.fillStyle = 'rgba(255,255,255,0.95)'
      ctx.fillText(ANIMALS[i].name, radius - 50, 10)

      ctx.restore()
    }

    // Merkez daire
    ctx.beginPath()
    ctx.arc(cx, cy, 36, 0, 2 * Math.PI)
    const grad = ctx.createRadialGradient(cx, cy, 4, cx, cy, 36)
    grad.addColorStop(0, '#fff')
    grad.addColorStop(1, '#e0e0e0')
    ctx.fillStyle = grad
    ctx.fill()
    ctx.strokeStyle = '#ccc'
    ctx.lineWidth = 2
    ctx.stroke()

    // Merkez ikon
    ctx.font = '22px serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('🎡', cx, cy)
  }

  function drawPointer(ctx: CanvasRenderingContext2D) {
    const cx = 250
    ctx.save()
    ctx.beginPath()
    ctx.moveTo(cx - 14, 8)
    ctx.lineTo(cx + 14, 8)
    ctx.lineTo(cx, 44)
    ctx.closePath()
    ctx.fillStyle = '#e74c3c'
    ctx.shadowColor = 'rgba(231,76,60,0.4)'
    ctx.shadowBlur = 8
    ctx.fill()
    ctx.strokeStyle = '#fff'
    ctx.lineWidth = 2
    ctx.stroke()
    ctx.restore()
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    drawWheel(ctx, currentRotationRef.current)
    drawPointer(ctx)
  }, [])

  function easeOut(t: number) {
    return 1 - Math.pow(1 - t, 4)
  }

  function spin() {
    if (spinning) return
    setResult(null)
    setSpinning(true)

    // Rastgele hedef hayvan
    const winIndex = Math.floor(Math.random() * TOTAL)
    // Çarkın durması gereken açı: ok yukarıda (270° = -π/2), dilimin ortasında duracak
    const targetAngle = -(2 * Math.PI * winIndex / TOTAL + SEGMENT_ANGLE / 2) - Math.PI / 2
    // En az 8 tam tur + hedef açı
    const totalRotation = currentRotationRef.current + (Math.PI * 2 * 10) + (targetAngle - currentRotationRef.current % (Math.PI * 2))
    targetRotationRef.current = totalRotation

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    startTimeRef.current = null

    function animate(timestamp: number) {
      if (!startTimeRef.current) startTimeRef.current = timestamp
      const elapsed = timestamp - startTimeRef.current!
      const progress = Math.min(elapsed / SPIN_DURATION, 1)
      const easedProgress = easeOut(progress)

      const currentRot = currentRotationRef.current + (targetRotationRef.current - currentRotationRef.current) * easedProgress

      drawWheel(ctx!, currentRot)
      drawPointer(ctx!)

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(animate)
      } else {
        currentRotationRef.current = targetRotationRef.current
        setSpinning(false)
        setResult(ANIMALS[winIndex])
      }
    }

    animFrameRef.current = requestAnimationFrame(animate)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '32px 16px' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>

        {/* Başlık */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: '800', color: '#fff', margin: '0 0 8px', textShadow: '0 2px 12px rgba(0,0,0,0.2)' }}>
            🎡 Which Animal Are You Today?
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '16px', margin: 0 }}>
            Spin the wheel and discover your spirit animal for today!
          </p>
        </div>

        {/* Çark kartı */}
        <div style={{ background: 'rgba(255,255,255,0.97)', borderRadius: '24px', padding: '32px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)', textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <canvas
              ref={canvasRef}
              width={500}
              height={500}
              style={{ width: '100%', maxWidth: '400px', display: 'block', margin: '0 auto' }}
            />
          </div>

          <button
            onClick={spin}
            disabled={spinning}
            style={{
              marginTop: '24px',
              padding: '16px 48px',
              fontSize: '18px',
              fontWeight: '700',
              borderRadius: '50px',
              border: 'none',
              cursor: spinning ? 'not-allowed' : 'pointer',
              background: spinning
                ? 'linear-gradient(135deg, #b2bec3, #636e72)'
                : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              color: '#fff',
              boxShadow: spinning ? 'none' : '0 8px 24px rgba(245,87,108,0.4)',
              transform: spinning ? 'scale(0.97)' : 'scale(1)',
              transition: 'all 0.2s ease',
              letterSpacing: '0.5px',
            }}
          >
            {spinning ? '🌀 Spinning...' : '🎯 Spin the Wheel!'}
          </button>
        </div>

        {/* Sonuç kartı */}
        {result && (
          <div style={{
            background: '#fff',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
            animation: 'fadeIn 0.5s ease',
          }}>
            <div style={{
              background: result.color,
              padding: '32px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '72px', marginBottom: '12px', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' }}>
                {result.emoji}
              </div>
              <h2 style={{ color: '#fff', fontSize: '28px', fontWeight: '800', margin: '0 0 4px', textShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
                You are a {result.name}!
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '15px', margin: 0, fontStyle: 'italic' }}>
                ✨ {result.trait}
              </p>
            </div>

            <div style={{ padding: '32px' }}>
              <p style={{ color: '#374151', fontSize: '16px', lineHeight: '1.8', margin: '0 0 24px' }}>
                {result.description}
              </p>

              <div style={{
                background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
                border: '1px solid #bbf7d0',
                borderRadius: '12px',
                padding: '16px 20px',
                marginBottom: '24px',
              }}>
                <p style={{ color: '#15803d', fontSize: '15px', fontWeight: '600', margin: 0 }}>
                  {result.tip}
                </p>
              </div>

              <button
                onClick={spin}
                style={{
                  width: '100%',
                  padding: '14px',
                  fontSize: '16px',
                  fontWeight: '700',
                  borderRadius: '12px',
                  border: 'none',
                  cursor: 'pointer',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: '#fff',
                  boxShadow: '0 4px 16px rgba(102,126,234,0.4)',
                  transition: 'opacity 0.2s',
                }}
                onMouseOver={e => (e.currentTarget.style.opacity = '0.9')}
                onMouseOut={e => (e.currentTarget.style.opacity = '1')}
              >
                🔄 Spin Again!
              </button>
            </div>
          </div>
        )}

        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    </div>
  )
}
