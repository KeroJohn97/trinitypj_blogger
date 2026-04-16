"use client"
import { supabase } from "@/lib/supabase"
import { ArrowRight, Loader2, ShieldCheck, Eye, EyeOff } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import React, { useState } from "react"
import { ErrorAlert } from "@/components/ui/error-alert"
import { Loader } from "@/components/ui/loader"


// Define the shape of the dictionary prop
interface AdminLoginFormProps {
  dict: any // Replace with your specific dictionary type
}

export default function AdminLoginForm({ dict }: AdminLoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const params = useParams()
  const lang = params?.lang ?? "en-US"

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password })

      if (authError || !data.session) {
        setError("Invalid credentials. Access denied.")
        setLoading(false)
      } else {
        // Redirection should happen now
        // We call refresh first to ensure the middleware sees the new cookies
        await router.refresh()
        router.push(`/${lang}/admin`)
        
        // Safety timeout to reset loading state if redirection is slow
        setTimeout(() => {
          setLoading(false)
        }, 3000)
      }
    } catch (err: any) {
      console.error("Login error:", err)
      setError("An unexpected connection error occurred.")
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Left decorative panel */}
      <div className="hidden flex-col justify-between bg-emerald-600 p-12 lg:flex lg:w-[420px] xl:w-[480px]">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
              <ShieldCheck size={16} className="text-white" strokeWidth={2} />
            </div>
            <span className="text-sm font-bold tracking-wider text-white/90 uppercase">TMCPJ Portal</span>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl leading-snug font-bold text-white">
            Serving the Church,
            <br />
            Behind the Scenes.
          </h2>
          <p className="text-sm leading-relaxed text-emerald-100/80">
            This portal is reserved for authorised church staff and administrators. All activity is monitored.
          </p>
        </div>

        <p className="text-xs text-emerald-200/60">© {new Date().getFullYear()} Trinity Methodist Church PJ</p>
      </div>

      {/* Right login panel */}
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="w-full max-w-sm space-y-10">
          {/* Mobile-only brand header */}
          <div className="flex items-center gap-2.5 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600">
              <ShieldCheck size={16} className="text-white" strokeWidth={2} />
            </div>
            <span className="text-sm font-bold tracking-wider text-emerald-700 uppercase">TMCPJ Portal</span>
          </div>

          {/* Heading */}
          <div className="space-y-1.5">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Admin Sign In</h1>
            <p className="text-sm text-slate-500">Enter your credentials to access the dashboard.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="admin-email"
                  className="block text-[10px] font-bold tracking-widest text-slate-400 uppercase"
                >
                  Email Address
                </label>
                <input
                  id="admin-email"
                  type="email"
                  placeholder="staff@tmcpj.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none transition-all placeholder:text-slate-300 focus:border-emerald-500 focus:ring-3 focus:ring-emerald-500/10"
                  required
                  autoComplete="email"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="admin-password"
                  className="block text-[10px] font-bold tracking-widest text-slate-400 uppercase"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="admin-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-11 text-sm font-medium text-slate-900 outline-none transition-all placeholder:text-slate-300 focus:border-emerald-500 focus:ring-3 focus:ring-emerald-500/10"
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-600 transition-colors focus:outline-none"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Unified Error Handlebars */}
            <ErrorAlert 
              error={error} 
              onClear={() => setError(null)} 
            />

            {/* Unified Loader Handlebars */}
            <Loader loading={loading} text="Signing in to Portal..." />

            <button
              type="submit"
              disabled={loading}
              id="admin-login-submit"
              className="group flex w-full items-center justify-center gap-2.5 rounded-xl bg-emerald-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition-all hover:bg-emerald-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Sign in to Dashboard
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </form>

          <p className="text-center text-[11px] text-slate-400">
            Trouble signing in?{" "}
            <span className="font-semibold text-slate-500">Contact your system administrator.</span>
          </p>
        </div>
      </div>
    </div>
  )
}
