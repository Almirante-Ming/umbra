import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from 'lucide-react'

interface Lab {
  id: string
  name: string
  nickname: string
}

interface LabSelectionProps {
  onLabSelect: (labId: string) => void
}

export function LabSelection({ onLabSelect }: LabSelectionProps) {
  const [selectedLab, setSelectedLab] = useState<string>('')

  const labs: Lab[] = [
    {
      id: 'lab-1',
      name: 'Laboratório de Física',
      nickname: 'LF'
    },
    {
      id: 'lab-2',
      name: 'Laboratório de Química',
      nickname: 'LQ'
    },
    {
      id: 'lab-3',
      name: 'Laboratório de Biologia',
      nickname: 'LB'
    },
    {
      id: 'lab-4',
      name: 'Laboratório de Informática',
      nickname: 'LI'
    },
    {
      id: 'lab-5',
      name: 'Laboratório de Eletrônica',
      nickname: 'LE'
    },
    {
      id: 'lab-6',
      name: 'Laboratório de Matemática',
      nickname: 'LM'
    }
  ]

  const handleLabSelect = (labId: string) => {
    setSelectedLab(labId)
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

        <div className="space-y-3 mb-8">
          {labs.map((lab) => (
            <Card 
              key={lab.id} 
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg bg-gray-800 border-gray-700 ${
                selectedLab === lab.id 
                  ? 'ring-2 ring-[#00b97e] shadow-lg border-[#00b97e] bg-gray-700' 
                  : 'hover:shadow-md hover:border-gray-600 hover:bg-gray-750'
              }`}
              onClick={() => handleLabSelect(lab.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-lg text-white">{lab.name}</CardTitle>
                    <span className="text-sm text-gray-400 bg-gray-700 px-2 py-1 rounded-full">
                      {lab.nickname}
                    </span>
                  </div>
                  {selectedLab === lab.id && (
                    <div className="flex items-center gap-2 text-[#00b97e] font-medium text-sm">
                      <Check className="h-4 w-4" />
                      Selecionado
                    </div>
                  )}
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        {selectedLab && (
          <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-[#00b97e] shadow-lg p-4">
            <div className="max-w-4xl mx-auto flex justify-between items-center">
              <div className="text-sm text-gray-300">
                Selecionado: <span className="text-[#00b97e] font-medium">{labs.find(lab => lab.id === selectedLab)?.name}</span>
                <span className="text-gray-400 ml-2">({labs.find(lab => lab.id === selectedLab)?.nickname})</span>
              </div>
              <Button onClick={handleProceed} className="px-8 bg-[#00b97e] hover:bg-[#059669] text-white">
                Prosseguir para Reserva
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
