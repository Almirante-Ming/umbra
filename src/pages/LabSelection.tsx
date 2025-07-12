import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, AlertCircle, Loader2 } from 'lucide-react'

interface Lab {
  nickname: string
  name: string
  capacity: number
  location?: string
  active_bookings?: number
  available?: boolean
}

interface LabSelectionProps {
  onLabSelect: (labNickname: string) => void
}

export function LabSelection({ onLabSelect }: LabSelectionProps) {
  const [selectedLab, setSelectedLab] = useState<string>('')
  const [labs, setLabs] = useState<Lab[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLabs = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Import and use the lab service
        const { labService } = await import('../services/lumusService')
        const labsData = await labService.getLabs()
        
        console.log('Got labs from API:', labsData)
        setLabs(labsData)
      } catch (error: any) {
        console.error('Error fetching labs:', error)
        setError('Failed to load laboratory data. Please check your connection and try again.')
        setLabs([]) // Clear any existing data
      } finally {
        setLoading(false)
      }
    }

    fetchLabs()
  }, [])

  const handleLabSelect = (labNickname: string) => {
    setSelectedLab(labNickname)
  }

  const handleRetry = () => {
    // Retry fetching labs
    const fetchLabs = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const { labService } = await import('../services/lumusService')
        const labsData = await labService.getLabs()
        
        console.log('Got labs from API:', labsData)
        setLabs(labsData)
      } catch (error: any) {
        console.error('Error fetching labs:', error)
        setError('Failed to load laboratory data. Please check your connection and try again.')
        setLabs([])
      } finally {
        setLoading(false)
      }
    }

    fetchLabs()
  }

  const handleProceed = () => {
    if (selectedLab) {
      onLabSelect(selectedLab)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Selecione seu Laboratório</h1>
          <p className="text-gray-300">Escolha entre nossos laboratórios técnicos certificados</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <span className="text-red-400 text-sm">{error}</span>
            </div>
            <Button 
              onClick={handleRetry} 
              variant="outline" 
              className="bg-red-900/20 border-red-500 text-red-400 hover:bg-red-900/40"
            >
              Tentar Novamente
            </Button>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-[#00b97e]" />
            <span className="ml-2 text-white">Carregando laboratórios...</span>
          </div>
        ) : (
          <>
            {labs.length === 0 && !error ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                  <p className="text-lg">Nenhum laboratório disponível</p>
                  <p className="text-sm">Não há laboratórios cadastrados no sistema no momento.</p>
                </div>
              </div>
            ) : (
              <div className="space-y-3 mb-8">
                {labs.map((lab) => (
                  <Card 
                    key={lab.nickname} 
                    className={`cursor-pointer transition-all duration-200 hover:shadow-lg bg-gray-800 border-gray-700 ${
                      selectedLab === lab.nickname 
                        ? 'ring-2 ring-[#00b97e] shadow-lg border-[#00b97e] bg-gray-700' 
                        : 'hover:shadow-md hover:border-gray-600 hover:bg-gray-750'
                    }`}
                    onClick={() => handleLabSelect(lab.nickname)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CardTitle className="text-lg text-white">{lab.name}</CardTitle>
                          <span className="text-sm text-gray-400 bg-gray-700 px-2 py-1 rounded-full">
                            {lab.nickname}
                          </span>
                          <span className="text-xs text-gray-500 bg-gray-600 px-2 py-1 rounded-full">
                            Cap: {lab.capacity}
                          </span>
                          {lab.active_bookings !== undefined && (
                            <span className="text-xs text-blue-400 bg-blue-900/20 px-2 py-1 rounded-full">
                              {lab.active_bookings} reservas ativas
                            </span>
                          )}
                        </div>
                        {selectedLab === lab.nickname && (
                          <div className="flex items-center gap-2 text-[#00b97e] font-medium text-sm">
                            <Check className="h-4 w-4" />
                            Selecionado
                          </div>
                        )}
                      </div>
                      {lab.location && (
                        <div className="mt-2">
                          <span className="text-xs text-gray-400">📍 {lab.location}</span>
                        </div>
                      )}
                    </CardHeader>
                  </Card>
                ))}
              </div>
            )}

            {selectedLab && (
              <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-[#00b97e] shadow-lg p-4">
                <div className="max-w-4xl mx-auto flex justify-between items-center">
                  <div className="text-sm text-gray-300">
                    Selecionado: <span className="text-[#00b97e] font-medium">{labs.find(lab => lab.nickname === selectedLab)?.name}</span>
                    <span className="text-gray-400 ml-2">({labs.find(lab => lab.nickname === selectedLab)?.nickname})</span>
                  </div>
                  <Button onClick={handleProceed} className="px-8 bg-[#00b97e] hover:bg-[#059669] text-white">
                    Prosseguir para Reserva
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
