'use client'

import Button from '@/components/button'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function ForgotPassword() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(false)

  const handleResetPassword = async () => {
    try {
      setLoading(true)
      const result = await axios.post('/api/users/resetpassword', {
        token,
        password,
      })
      console.log('result', result)
      toast.success(result?.data?.message)
      router.push('/login')
    } catch (error: any) {
      console.log(error)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const urlToken = window.location.search.split('=')[1]
    setToken(urlToken || '')
  }, [])

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-black-950 font-semibold font-mono text-4xl mb-8">
          Reset Password
        </h1>
        <div className="flex flex-col">
          <label className="text-black-950 font-mono text-2xl mt-2">
            New Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="p-2 my-2 border-2 border-violet-500 rounded focus:outline-none focus:ring focus:ring-violet-400"
            placeholder="Password"
            type="password"
          />
          <Button
            title="Submit"
            handleClick={handleResetPassword}
            isLoading={loading}
          />
        </div>
      </div>
    </>
  )
}
