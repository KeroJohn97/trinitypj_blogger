"use client" // This line must be at the very top of the file

function DropEmailButton() {
  const dropEmail = () => {
    const subject = encodeURIComponent("Interested in Alpha Online Program")
    const body = encodeURIComponent(
      `Hi Trinity PJ Alpha Team,\n\nI’d love to register my interest for the next Alpha Online program.\n\nName:\nContact:\nPreferred Language:\n\nLooking forward to hearing from you!`
    )
    window.location.href = `mailto:alpha@trinitypj.com?subject=${subject}&body=${body}`
  }

  return (
    <button
      onClick={dropEmail}
      className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer rounded-lg px-8 py-3 font-semibold transition-colors"
    >
      Drop an Email to Us
    </button>
  )
}

export default DropEmailButton
