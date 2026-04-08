"use client"
import { Footer } from "@/components/footer"
import { supabase } from "@/lib/supabase"
import { ArrowRight, Loader2, Lock } from "lucide-react"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

// Define the shape of the dictionary prop
interface AdminLoginFormProps {
  dict: any // Replace with your specific dictionary type
}

export default function AdminLoginForm({ dict }: AdminLoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError("Invalid credentials. Access denied.")
      setLoading(false)
    } else {
      router.push("/admin")
      router.refresh()
    }
  }

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-[#FDFDFD] p-6 selection:bg-emerald-100">
        <div className="w-full max-w-sm space-y-12 text-center">
          {/* Branding Area */}
          <div className="animate-in fade-in slide-in-from-bottom-4 space-y-4 duration-700">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[22px] bg-slate-900 text-white shadow-2xl shadow-slate-200">
              <Lock size={28} strokeWidth={1.5} />
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900">TMCPJ Portal Access</h1>
              <p className="text-sm font-medium text-slate-400">Authorized personnel only</p>
            </div>
          </div>

          {/* Form Area */}
          <form
            onSubmit={handleLogin}
            className="animate-in fade-in slide-in-from-bottom-6 space-y-6 delay-150 duration-1000"
          >
            <div className="space-y-4 text-left">
              <div className="space-y-1.5">
                <label className="ml-1 text-[10px] font-bold tracking-widest text-slate-400 uppercase">Identity</label>
                <input
                  type="email"
                  placeholder="email@church.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl border border-transparent bg-slate-50 px-5 py-4 font-medium transition-all outline-none focus:border-emerald-100 focus:bg-white focus:ring-4 focus:ring-emerald-500/5"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="ml-1 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                  Security Key
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl border border-transparent bg-slate-50 px-5 py-4 font-medium transition-all outline-none focus:border-emerald-100 focus:bg-white focus:ring-4 focus:ring-emerald-500/5"
                  required
                />
              </div>
            </div>

            {error && <p className="animate-pulse text-xs font-bold text-red-500">{error}</p>}

            <button
              disabled={loading}
              className="group flex w-full items-center justify-center gap-3 rounded-[20px] bg-slate-900 py-4 text-sm font-bold text-white shadow-xl shadow-slate-200 transition-all hover:bg-black active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <>
                  Sign In <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          <p className="text-[11px] font-medium text-slate-300">Trouble logging in? Contact the administrator.</p>
        </div>
      </div>
      <Footer dict={dict.footer} />
    </>
  )
}
