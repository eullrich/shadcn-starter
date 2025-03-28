import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-2">Shadcn Starter Pack</h1>
      <p className="text-lg text-muted-foreground mb-8">
        A minimal starter using Vite, React, TypeScript, and Shadcn/ui.
      </p>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
          <CardDescription>Explore the components and build something amazing.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card is built using the shadcn/ui Card component.</p>
          <p>You can find the components in <code>src/components/ui</code>.</p>
        </CardContent>
        <CardFooter>
          <Button>Learn More</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default App
