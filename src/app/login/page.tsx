'use client'

import Button from '@/components/button'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function Login() {
  const router = useRouter()
  const [user, setUser] = useState({
    username: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    try {
      setLoading(true)
      const result = await axios.post('/api/users/login', user)
      console.log('result', result)
      toast.success(result?.data?.message)
      router.push('/profile')
    } catch (error: any) {
      console.log('error', error)
      toast.error(error.response.data.error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-black-950 font-semibold font-mono text-4xl mb-8">
        Login 🔓
      </h1>
      <div className="flex flex-col">
        <label className="text-black-950 font-mono text-2xl mt-2">
          Username
        </label>
        <input
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          value={user.username}
          className="p-2 my-2 border-2 border-violet-500 rounded focus:outline-none focus:ring focus:ring-violet-400"
          placeholder="Username"
          type="text"
        />
        <label className="text-black-950 font-mono text-2xl mt-2">
          Password
        </label>
        <input
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          value={user.password}
          className="p-2 my-2 border-2 border-violet-500 rounded focus:outline-none focus:ring focus:ring-violet-400"
          placeholder="Password"
          type="password"
        />
        <Button
          title="Login"
          type="submit"
          handleClick={handleLogin}
          isLoading={loading}
        />
      </div>
      <Link
        href="/signup"
        className="text-violet-950 underline  decoration-solid"
      >
        Signup
      </Link>
      <Link
        href="/forgotpassword"
        className="text-violet-950 underline  decoration-solid"
      >
        Forgot Password ?
      </Link>
    </div>
  )
}
