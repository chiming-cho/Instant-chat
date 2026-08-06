'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Home() {
  const router = useRouter()
  const [code, setCode] = useState('')

  const handleJoin = () => {
    const trimmed = code.trim()

    if (!/^\d{4}$/.test(trimmed)) {
      alert('네 자리 숫자 코드를 입력해주세요.')
      return
    }

    router.push(`/${trimmed}`)
  }

  const handleCreate = () => {
    alert('방 생성 기능은 다음 step에서 구현합니다.')
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md flex flex-col items-center gap-6">
        <h1 className="text-4xl font-bold text-gray-900">instant-chat</h1>
        <p className="text-sm text-gray-500 text-center">
          로그인 없이 네 자리 코드로 빠르게 연결
        </p>

        <div className="w-full flex gap-2">
          <input
            type="text"
            inputMode="numeric"
            maxLength={4}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
            placeholder="네 자리 코드"
            className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-center text-lg outline-none focus:border-blue-500"
          />
          <button
            onClick={handleJoin}
            className="rounded-lg bg-blue-600 px-4 py-3 text-white hover:bg-blue-700"
          >
            참여
          </button>
        </div>

        <button
          onClick={handleCreate}
          className="w-full rounded-lg bg-green-600 px-4 py-3 text-white hover:bg-green-700"
        >
          새 방 생성
        </button>

        <Link href="/about" className="text-sm text-gray-500 hover:text-gray-700">
          About us
        </Link>
      </div>
    </main>
  )
}