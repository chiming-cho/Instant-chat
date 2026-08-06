import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-5xl font-bold text-gray-900">404</h1>
        <p className="text-gray-600">페이지를 찾을 수 없습니다.</p>
        <Link
          href="/"
          className="rounded-lg bg-blue-600 px-4 py-3 text-white hover:bg-blue-700"
        >
          메인으로 돌아가기
        </Link>
      </div>
    </main>
  )
}