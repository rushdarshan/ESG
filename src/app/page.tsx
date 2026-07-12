export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">
        EcoSphere
      </h1>
      <p className="mt-4 text-lg text-gray-600">
        Unified E+S+G Platform
      </p>
      <div className="mt-8 flex gap-6">
        <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800">
          Environmental
        </span>
        <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800">
          Social
        </span>
        <span className="rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-800">
          Governance
        </span>
      </div>
    </main>
  );
}
