import { connect } from '@/dbConfig/dbConfig'
import { NextRequest, NextResponse } from 'next/server'
import User from '@/models/userModel'
import { sendEmail } from '@/helpers/mailer'

connect()

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json()
    const { email } = reqBody

    const user = await User.findOne({ email })

    if (!user) {
      return NextResponse.json({ error: 'User Not Exits' }, { status: 400 })
    }

    console.log(user)

    // send email for reset password

    await sendEmail({
      email,
      emailType: 'RESET-PASSWORD',
      userId: user?._id,
    })

    return NextResponse.json({
      message: 'Email sent Successfuly',
      success: true,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
