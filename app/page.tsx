import { WalletConnection } from "@/components/wallet-connection"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gradient-bg">
      <h1 className="text-4xl font-bold mb-8 text-primary">Prescify</h1>
      <WalletConnection />
    </main>
  )
}

