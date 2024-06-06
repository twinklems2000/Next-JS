'use client'

import Button from '@/components/button'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function Profile() {
  const router = useRouter()
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<any>({})

  const handleLogout = async () => {
    try {
      setLoading(true)
      await axios.get('/api/users/logout')
      toast.success('Logout Successfuly')
      router.push('/login')
    } catch (error: any) {
      console.log('error', error)
      toast.error(error.response.data.error)
    } finally {
      setLoading(false)
    }
  }

  const getUserDetails = async () => {
    let result = await axios.get('/api/users/me')
    setData(result?.data?.data?._id)
    setUser(result?.data?.data)
  }

  useEffect(() => {
    getUserDetails()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-black-950 font-semibold font-mono text-4xl">
        {user?.username ? ` Hello, ${user?.username}` : 'Profile'} 👩
      </h1>
      <h3 className="text-violet-800 font-semibold font-mono text-2xl my-4">
        Go To{' '}
        <Link className=" underline  decoration-solid" href={`profile/${data}`}>
          {data ? data : 'Loading...'}
        </Link>
      </h3>
      <Button title="Logout" handleClick={handleLogout} isLoading={loading} />
    </div>
  )
}
