import coffeeBeans from '#/assets/coffee-beans.png'

export function Branding({ size = 'md', text = 'Tox.ID' }: { size?: 'sm' | 'md' | 'lg', text: string }) {
  const iconClass =
    size === 'lg' ? 'h-14 w-14' : size === 'sm' ? 'h-7 w-7' : 'h-10 w-10'
  const textClass =
    size === 'lg' ? 'text-3xl' : size === 'sm' ? 'text-lg' : 'text-2xl'

  return (
    <div className="flex items-center gap-2 w-max">
      <img
        src={coffeeBeans}
        alt="Coffee beans"
        className={`${iconClass} rounded-full object-cover`}
      />
      <span className={`${textClass} font-bold tracking-wide text-stone-800`}>
        {text}
      </span>
    </div>
  )
}
