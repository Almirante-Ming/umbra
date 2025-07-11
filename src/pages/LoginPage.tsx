import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface LoginPageProps {
  onLogin: () => void
  onGuestAccess: () => void
  onRegister: () => void
}

export function LoginPage({ onLogin, onGuestAccess, onRegister }: LoginPageProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Here you would typically authenticate the user
    console.log('Login submitted:', formData)
    
    // For now, just call the onLogin callback
    onLogin()
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="w-full max-w-md">
        <Card className="w-full bg-gray-800 border-[#00b97e]">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-white">Welcome to Umbra</CardTitle>
            <CardDescription className="text-gray-300">
              Enter your credentials to access your account
            </CardDescription>
            <CardAction>
              <Button 
                variant="link"
                onClick={onRegister}
                className="text-[#00b97e] hover:text-[#059669]"
              >
                Don't have an account? Sign Up
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-gray-200">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-[#00b97e] focus:ring-[#00b97e]"
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password" className="text-gray-200">Password</Label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline text-[#00b97e] hover:text-[#059669]"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    required 
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-[#00b97e] focus:ring-[#00b97e]"
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full bg-[#00b97e] hover:bg-[#059669] text-white"
              onClick={handleSubmit}
            >
              Sign In
            </Button>
          </CardFooter>
        </Card>
        
        <div className="mt-6 text-center">
          <Button 
            variant="outline" 
            onClick={onGuestAccess}
            className="w-full border-[#00b97e] text-[#00b97e] hover:bg-[#00b97e] hover:text-white"
          >
            Continue as Guest - Book Appointment
          </Button>
        </div>
      </div>
    </div>
  )
}
