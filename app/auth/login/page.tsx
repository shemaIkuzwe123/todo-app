"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { authenticate } from '@/lib/action'
import { LoginShema } from '@/lib/shema'
import { useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import React, { useActionState } from 'react'
import { useFormState } from 'react-dom'

export default function page() {
    const [state, action, isPending] = useActionState(authenticate, undefined)
    console.log("state",state)
    const [form, fields] = useForm({
        state,
        onValidate({ formData }) {
            return parseWithZod(formData, { schema: LoginShema })
        },
        shouldValidate: "onBlur",
        shouldRevalidate: "onInput"

    })
    return (
        <div className=' h-screen w-full flex justify-center items-center'>
            <form className=' flex flex-col gap-4 w-96  rounded-md bg-white p-8' id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
                <h3 className='text-xl font-bold'>Enter your credentials to continue</h3>
                <Input key={fields.email.key} name={fields.email.name} placeholder='Enter your Email' />
                <span className='my-2 text-sm text-destructive'>{fields.email.errors}</span>
                <Input type='password' key={fields.password.key} name={fields.password.name} placeholder='Enter your Password' />
                <span className='my-2 text-sm text-destructive'>{fields.password.errors}</span>
                <Button type='submit' disabled={isPending}>{isPending ? "Logging in.." : "Login "}</Button>
                {/* {state?.status === "error" && <p className='text-red-500'>{state?.message}</p>} */}
            </form>
        </div>
    )
}
