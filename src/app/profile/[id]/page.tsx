'use client'

export default function UserProfile({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-black-950 font-semibold font-mono text-4xl">
        User Profile {params.id}
      </h1>
    </div>
  )
}
