import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from 'lucide-react'

interface RegisterPageProps {
  onRegister: () => void
  onBack: () => void
}

export function RegisterPage({ onRegister, onBack }: RegisterPageProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    address: '',
    emergencyContact: '',
    emergencyPhone: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    const newErrors: Record<string, string> = {}
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Nome é obrigatório'
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Sobrenome é obrigatório'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'E-mail inválido'
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório'
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Senha é obrigatória'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres'
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Senhas não coincidem'
    }
    
    if (!formData.dateOfBirth.trim()) {
      newErrors.dateOfBirth = 'Data de nascimento é obrigatória'
    }
    
    setErrors(newErrors)
    
    if (Object.keys(newErrors).length === 0) {
      console.log('Registration submitted:', formData)
      onRegister()
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={onBack}
            className="flex items-center gap-2 text-gray-300 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para Login
          </Button>
        </div>

        <Card className="w-full bg-gray-800 border-2 border-[#00b97e]">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-white">Criar Sua Conta</CardTitle>
            <CardDescription className="text-gray-300">
              Junte-se ao Umbra para gerenciar suas reservas de laboratório
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Informações Pessoais</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-gray-200">Nome *</Label>
                    <Input
                      id="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className={`bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-[#00b97e] focus:ring-[#00b97e] ${errors.firstName ? 'border-red-500' : ''}`}
                      placeholder="Digite seu nome"
                    />
                    {errors.firstName && (
                      <p className="text-sm text-red-400 mt-1">{errors.firstName}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="lastName" className="text-gray-200">Sobrenome *</Label>
                    <Input
                      id="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className={`bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-[#00b97e] focus:ring-[#00b97e] ${errors.lastName ? 'border-red-500' : ''}`}
                      placeholder="Digite seu sobrenome"
                    />
                    {errors.lastName && (
                      <p className="text-sm text-red-400 mt-1">{errors.lastName}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="dateOfBirth" className="text-gray-200">Data de Nascimento *</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    className={`bg-gray-700 border-gray-600 text-white focus:border-[#00b97e] focus:ring-[#00b97e] ${errors.dateOfBirth ? 'border-red-500' : ''}`}
                  />
                  {errors.dateOfBirth && (
                    <p className="text-sm text-red-400 mt-1">{errors.dateOfBirth}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="address" className="text-gray-200">Endereço</Label>
                  <Input
                    id="address"
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-[#00b97e] focus:ring-[#00b97e]"
                    placeholder="Digite seu endereço completo"
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Informações de Contato</h3>
                
                <div>
                  <Label htmlFor="email" className="text-gray-200">E-mail *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-[#00b97e] focus:ring-[#00b97e] ${errors.email ? 'border-red-500' : ''}`}
                    placeholder="Digite seu e-mail"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-400 mt-1">{errors.email}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="phone" className="text-gray-200">Telefone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-[#00b97e] focus:ring-[#00b97e] ${errors.phone ? 'border-red-500' : ''}`}
                    placeholder="Digite seu telefone"
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-400 mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Contato de Emergência</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="emergencyContact" className="text-gray-200">Nome do Contato</Label>
                    <Input
                      id="emergencyContact"
                      type="text"
                      value={formData.emergencyContact}
                      onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-[#00b97e] focus:ring-[#00b97e]"
                      placeholder="Nome da pessoa de contato"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="emergencyPhone" className="text-gray-200">Telefone de Emergência</Label>
                    <Input
                      id="emergencyPhone"
                      type="tel"
                      value={formData.emergencyPhone}
                      onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-[#00b97e] focus:ring-[#00b97e]"
                      placeholder="Telefone da pessoa de contato"
                    />
                  </div>
                </div>
              </div>

              {/* Account Security */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Segurança da Conta</h3>
                
                <div>
                  <Label htmlFor="password" className="text-gray-200">Senha *</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={`bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-[#00b97e] focus:ring-[#00b97e] ${errors.password ? 'border-red-500' : ''}`}
                    placeholder="Crie uma senha forte"
                  />
                  {errors.password && (
                    <p className="text-sm text-red-400 mt-1">{errors.password}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="confirmPassword" className="text-gray-200">Confirmar Senha *</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className={`bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-[#00b97e] focus:ring-[#00b97e] ${errors.confirmPassword ? 'border-red-500' : ''}`}
                    placeholder="Confirme sua senha"
                  />
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-400 mt-1">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>

              <Button type="submit" className="w-full bg-[#00b97e] hover:bg-[#059669] text-white">
                Criar Conta
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
