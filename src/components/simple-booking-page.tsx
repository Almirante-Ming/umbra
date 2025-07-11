import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CalendarDays, Clock, MapPin, ChevronLeft, ChevronRight } from 'lucide-react'

interface BookingFormData {
  userName: string
  course: string
  annotation: string
  repeatType: 'none' | 'daily' | 'weekly' | 'monthly'
}

export function SimpleBookingPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTimes, setSelectedTimes] = useState<string[]>([])
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [bookingData, setBookingData] = useState<BookingFormData>({
    userName: 'João Silva', // This would be bypassed by login in real implementation
    course: '',
    annotation: '',
    repeatType: 'none'
  })

  const availableCourses = [
    { id: 'mathematics', name: 'Matemática' },
    { id: 'physics', name: 'Física' },
    { id: 'chemistry', name: 'Química' },
    { id: 'biology', name: 'Biologia' },
    { id: 'computer-science', name: 'Ciência da Computação' },
    { id: 'engineering', name: 'Engenharia' },
    { id: 'electronics', name: 'Eletrônica' },
    { id: 'automation', name: 'Automação' }
  ]

  // Custom time slots as specified
  const timeSlots = [
    '07:00', '07:45', '08:30', '09:05', '09:15', '10:00', '10:45', 
    '11:30', '12:15', '13:00', '13:45', '14:30', '15:05', '15:15', 
    '16:00', '16:45', '17:30', '18:15', '19:00', '19:45', '20:30', 
    '21:05', '21:15', '22:00', '22:45', '23:30'
  ]

  const bookedSlots = {
    '2025-07-15': ['09:00', '10:00', '14:00'],
    '2025-07-16': ['11:00', '15:30'],
    '2025-07-17': ['13:00', '16:00']
  }

  const generateCalendar = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDayOfMonth = new Date(year, month, 1)
    const lastDayOfMonth = new Date(year, month + 1, 0)
    const firstDayOfWeek = firstDayOfMonth.getDay()
    const daysInMonth = lastDayOfMonth.getDate()
    
    const days = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null)
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }
    
    return days
  }

  const formatDate = (day: number) => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const date = new Date(year, month, day)
    return date.toISOString().split('T')[0]
  }

  const isDateAvailable = (day: number) => {
    const today = new Date()
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    return date >= today
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate)
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1)
    } else {
      newDate.setMonth(newDate.getMonth() + 1)
    }
    setCurrentDate(newDate)
  }

  const handleDateSelect = (day: number) => {
    const dateStr = formatDate(day)
    setSelectedDate(dateStr)
    setShowBookingForm(false)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTimes(prev => {
      if (prev.includes(time)) {
        // Remove time if already selected
        return prev.filter(t => t !== time)
      } else {
        // Add time if not selected
        return [...prev, time].sort()
      }
    })
    
    // Show booking form when at least one time is selected
    if (selectedTimes.length > 0 || !selectedTimes.includes(time)) {
      setShowBookingForm(true)
    }
  }

  const handleReserveFullDay = () => {
    // Get all available time slots for the selected date (not booked)
    const availableSlots = timeSlots.filter(time => !isTimeSlotBooked(time))
    setSelectedTimes(availableSlots)
    setShowBookingForm(true)
  }

  const isTimeSlotBooked = (time: string) => {
    return bookedSlots[selectedDate as keyof typeof bookedSlots]?.includes(time)
  }

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    console.log('Booking submitted:', {
      ...bookingData,
      date: selectedDate,
      times: selectedTimes
    })
    
    // Create repeated bookings if needed
    if (bookingData.repeatType !== 'none') {
      createRepeatedBookings()
    }
    
    setBookingData({
      userName: 'João Silva', // Keep the user name from login
      course: '',
      annotation: '',
      repeatType: 'none'
    })
    setShowBookingForm(false)
    setSelectedDate('')
    setSelectedTimes([])
    
    alert('Reserva enviada com sucesso!')
  }

  const createRepeatedBookings = () => {
    const baseDate = new Date(selectedDate)
    const bookings = []
    
    // Create repeated bookings based on repeat type
    for (let i = 1; i <= 10; i++) { // Create 10 repeated bookings as example
      const nextDate = new Date(baseDate)
      
      switch (bookingData.repeatType) {
        case 'daily':
          nextDate.setDate(baseDate.getDate() + i)
          break
        case 'weekly':
          nextDate.setDate(baseDate.getDate() + (i * 7))
          break
        case 'monthly':
          nextDate.setMonth(baseDate.getMonth() + i)
          break
        default:
          continue
      }
      
      bookings.push({
        date: nextDate.toISOString().split('T')[0],
        times: selectedTimes,
        ...bookingData
      })
    }
    
    console.log('Repeated bookings created:', bookings)
    return bookings
  }

  const handleInputChange = (field: keyof BookingFormData, value: string) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className="bg-gray-900 min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Reservar Laboratório</h1>
          <p className="text-gray-300">Selecione uma data e horário para sua reserva</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="border-b border-gray-800">
                <CardTitle className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5" />
                  Selecionar Data e Horário
                </CardTitle>
                <CardDescription>
                  Escolha sua data e horário preferidos
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigateMonth('prev')}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <h2 className="text-lg font-semibold">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigateMonth('next')}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {dayNames.map((day) => (
                    <div key={day} className="p-2 text-center text-sm font-medium text-gray-400">
                      {day}
                    </div>
                  ))}
                  {generateCalendar().map((day, index) => (
                    <div key={index} className="p-2">
                      {day && (
                        <Button
                          variant={selectedDate === formatDate(day) ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleDateSelect(day)}
                          disabled={!isDateAvailable(day)}
                          className="w-full h-10"
                        >
                          {day}
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Time Slots */}
                {selectedDate && (
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-medium text-white">Horários Disponíveis</h3>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleReserveFullDay}
                          className="text-xs bg-[#00b97e] hover:bg-[#00b97e]/80 text-white border-[#00b97e]"
                        >
                          Reservar Dia Inteiro
                        </Button>
                        {selectedTimes.length > 0 && (
                          <>
                            <span className="text-sm text-[#00b97e]">
                              {selectedTimes.length} horário{selectedTimes.length > 1 ? 's' : ''} selecionado{selectedTimes.length > 1 ? 's' : ''}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedTimes([])}
                              className="text-xs"
                            >
                              Limpar Tudo
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="text-sm text-gray-300 mb-3">
                      {new Date(selectedDate).toLocaleDateString('pt-BR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    <div className="text-xs text-gray-400 mb-3">
                      Clique nos horários individuais para selecioná-los, ou use "Reservar Dia Inteiro" para selecionar todos os horários disponíveis
                    </div>
                    <div className="grid grid-cols-6 gap-2">
                      {timeSlots.map((time) => (
                        <Button
                          key={time}
                          variant={selectedTimes.includes(time) ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleTimeSelect(time)}
                          disabled={isTimeSlotBooked(time)}
                          className="text-sm"
                        >
                          {time}
                          {isTimeSlotBooked(time) && (
                            <span className="ml-1 text-xs">(Ocupado)</span>
                          )}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Booking Form Section */}
          <div className="space-y-6 relative">
            {/* Booking Form */}
            {showBookingForm && selectedTimes.length > 0 && (
              <Card>
                <CardHeader className="border-b border-gray-800">
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Detalhes da Reserva
                  </CardTitle>
                  <CardDescription>
                    {new Date(selectedDate).toLocaleDateString('pt-BR', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })} às {selectedTimes.join(', ')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="userName">Nome do Usuário</Label>
                      <Input
                        id="userName"
                        type="text"
                        value={bookingData.userName}
                        onChange={(e) => handleInputChange('userName', e.target.value)}
                        disabled
                        className="bg-gray-700 text-gray-400"
                        placeholder="Preenchido pelo login"
                      />
                      <p className="text-xs text-gray-400 mt-1">Este campo é preenchido automaticamente pelo seu login</p>
                    </div>
                    
                    <div>
                      <Label htmlFor="course">Disciplina</Label>
                      <select
                        id="course"
                        value={bookingData.course}
                        onChange={(e) => handleInputChange('course', e.target.value)}
                        required
                        className="w-full p-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-[#00b97e] focus:border-[#00b97e]"
                      >
                        <option value="">Selecione uma disciplina</option>
                        {availableCourses.map((course) => (
                          <option key={course.id} value={course.id}>
                            {course.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <Label htmlFor="annotation">Observações</Label>
                      <textarea
                        id="annotation"
                        value={bookingData.annotation}
                        onChange={(e) => handleInputChange('annotation', e.target.value)}
                        placeholder="Adicione observações ou comentários sobre esta reserva..."
                        rows={3}
                        className="w-full p-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-[#00b97e] focus:border-[#00b97e] placeholder-gray-400"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="repeatType">Repetir Reserva</Label>
                      <select
                        id="repeatType"
                        value={bookingData.repeatType}
                        onChange={(e) => handleInputChange('repeatType', e.target.value as 'none' | 'daily' | 'weekly' | 'monthly')}
                        className="w-full p-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-[#00b97e] focus:border-[#00b97e]"
                      >
                        <option value="none">Não repetir</option>
                        <option value="daily">Diariamente</option>
                        <option value="weekly">Semanalmente</option>
                        <option value="monthly">Mensalmente</option>
                      </select>
                      {bookingData.repeatType !== 'none' && (
                        <p className="text-xs text-[#00b97e] mt-1">
                          Isso criará 10 reservas repetidas {bookingData.repeatType === 'daily' ? 'diariamente' : bookingData.repeatType === 'weekly' ? 'semanalmente' : 'mensalmente'}
                        </p>
                      )}
                    </div>
                    
                    <Button type="submit" className="w-full">
                      Confirmar Reserva
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
