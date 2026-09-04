

export default function CentralWindow({children}) {
  return (
    <div className="w-full max-w-[600px] rounded-2xl bg-gray-100 p-6 shadow-xl">
      {children}
    </div>
  )
}