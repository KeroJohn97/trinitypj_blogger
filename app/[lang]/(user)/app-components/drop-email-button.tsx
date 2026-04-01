"use client"

interface DropEmailButtonProps {
  dict: {
    button: string
    emailSubject: string
    emailBody: string
  }
}

function DropEmailButton({ dict }: DropEmailButtonProps) {
  const dropEmail = () => {
    // Use translations from props
    const subject = encodeURIComponent(dict.emailSubject)
    const body = encodeURIComponent(dict.emailBody)

    window.location.href = `mailto:alpha@trinitypj.com?subject=${subject}&body=${body}`
  }

  return (
    <button
      onClick={dropEmail}
      className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer rounded-lg px-8 py-3 font-semibold transition-colors"
    >
      {dict.button}
    </button>
  )
}

export default DropEmailButton
