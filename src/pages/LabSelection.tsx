import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Clock, Star } from 'lucide-react'

interface Lab {
  id: string
  name: string
  address: string
  phone: string
  rating: number
  openHours: string
  specialties: string[]
  image: string
}

interface LabSelectionProps {
  onLabSelect: (labId: string) => void
}

export function LabSelection({ onLabSelect }: LabSelectionProps) {
  const [selectedLab, setSelectedLab] = useState<string>('')

  const labs: Lab[] = [
    {
      id: 'lab-1',
      name: 'Central Medical Lab',
      address: '123 Main Street, Downtown',
      phone: '(555) 123-4567',
      rating: 4.8,
      openHours: '7:00 AM - 6:00 PM',
      specialties: ['Blood Tests', 'Radiology', 'Pathology'],
      image: '/api/placeholder/300/200'
    },
    {
      id: 'lab-2',
      name: 'North Valley Diagnostics',
      address: '456 Oak Avenue, North Valley',
      phone: '(555) 234-5678',
      rating: 4.6,
      openHours: '8:00 AM - 5:00 PM',
      specialties: ['MRI', 'CT Scan', 'Ultrasound'],
      image: '/api/placeholder/300/200'
    },
    {
      id: 'lab-3',
      name: 'Westside Health Center',
      address: '789 Pine Road, Westside',
      phone: '(555) 345-6789',
      rating: 4.9,
      openHours: '6:00 AM - 8:00 PM',
      specialties: ['Cardiology', 'Neurology', 'Oncology'],
      image: '/api/placeholder/300/200'
    },
    {
      id: 'lab-4',
      name: 'East Coast Medical',
      address: '321 Elm Street, East Coast',
      phone: '(555) 456-7890',
      rating: 4.7,
      openHours: '7:30 AM - 6:30 PM',
      specialties: ['Dermatology', 'Orthopedics', 'Pediatrics'],
      image: '/api/placeholder/300/200'
    },
    {
      id: 'lab-5',
      name: 'South Bay Diagnostics',
      address: '654 Maple Lane, South Bay',
      phone: '(555) 567-8901',
      rating: 4.5,
      openHours: '8:00 AM - 7:00 PM',
      specialties: ['Genetics', 'Immunology', 'Microbiology'],
      image: '/api/placeholder/300/200'
    },
    {
      id: 'lab-6',
      name: 'Metro Health Labs',
      address: '987 Cedar Boulevard, Metro',
      phone: '(555) 678-9012',
      rating: 4.8,
      openHours: '24/7 Emergency Services',
      specialties: ['Emergency Care', 'Trauma', 'Critical Care'],
      image: '/api/placeholder/300/200'
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

  const renderRating = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? 'text-[#00b97e] fill-current' : 'text-gray-500'
            }`}
          />
        ))}
        <span className="text-sm text-gray-300 ml-1">{rating}</span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Select Your Lab</h1>
          <p className="text-gray-300">Choose from our network of certified medical laboratories</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {labs.map((lab) => (
            <Card 
              key={lab.id} 
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg bg-gray-800 border-gray-700 ${
                selectedLab === lab.id 
                  ? 'ring-2 ring-[#00b97e] shadow-lg border-[#00b97e]' 
                  : 'hover:shadow-md hover:border-gray-600'
              }`}
              onClick={() => handleLabSelect(lab.id)}
            >
              <CardHeader className="pb-3">
                <div className="aspect-video bg-gray-700 rounded-lg mb-3 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Lab Image</span>
                </div>
                <CardTitle className="text-lg text-white">{lab.name}</CardTitle>
                <CardDescription className="flex items-center gap-1 text-gray-300">
                  <MapPin className="h-4 w-4" />
                  {lab.address}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-300">{lab.phone}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-300">{lab.openHours}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  {renderRating(lab.rating)}
                  {selectedLab === lab.id && (
                    <div className="text-[#00b97e] font-medium text-sm">Selected</div>
                  )}
                </div>
                
                <div className="pt-2">
                  <div className="text-sm font-medium text-gray-200 mb-1">Specialties:</div>
                  <div className="flex flex-wrap gap-1">
                    {lab.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="inline-block bg-[#00b97e] bg-opacity-20 text-[#00b97e] text-xs px-2 py-1 rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedLab && (
          <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-[#00b97e] shadow-lg p-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <div className="text-sm text-gray-300">
                Selected: <span className="text-[#00b97e] font-medium">{labs.find(lab => lab.id === selectedLab)?.name}</span>
              </div>
              <Button onClick={handleProceed} className="px-8 bg-[#00b97e] hover:bg-[#059669] text-white">
                Proceed to Booking
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
