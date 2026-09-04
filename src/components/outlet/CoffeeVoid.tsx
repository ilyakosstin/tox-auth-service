
// flex min-h-screen items-center justify-center bg-coffee-light px-4

export default function CoffeeVoid({children}) {
  return (
    <div className="w-screen min-h-screen bg-coffee-light flex items-center justify-center py-5">
      {children}
    </div>
  )
}