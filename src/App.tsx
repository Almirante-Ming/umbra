import { useState } from 'react'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { LabSelection } from './pages/LabSelection'
import { SimpleBookingPage } from './components/simple-booking-page'

type CurrentPage = 'login' | 'register' | 'lab-selection' | 'simple-booking'

function App() {
  const [currentPage, setCurrentPage] = useState<CurrentPage>('login')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [selectedLab, setSelectedLab] = useState<string>('')

  const handleLogin = () => {
    setIsAuthenticated(true)
    setCurrentPage('lab-selection')
  }

  const handleRegister = () => {
    setCurrentPage('register')
  }

  const handleRegisterComplete = () => {
    setIsAuthenticated(true)
    setCurrentPage('lab-selection')
  }

  const handleBackToLogin = () => {
    setCurrentPage('login')
  }

  const handleGuestAccess = () => {
    setCurrentPage('simple-booking')
  }

  const handleLabSelect = (labId: string) => {
    console.log('Lab selected:', labId)
    setSelectedLab(labId)
    setCurrentPage('simple-booking')
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setSelectedLab('')
    setCurrentPage('login')
  }

  // Show login page first
  if (currentPage === 'login') {
    return <LoginPage onLogin={handleLogin} onGuestAccess={handleGuestAccess} onRegister={handleRegister} />
  }

  // Show registration page
  if (currentPage === 'register') {
    return <RegisterPage onRegister={handleRegisterComplete} onBack={handleBackToLogin} />
  }

  // Show lab selection page
  if (currentPage === 'lab-selection') {
    return <LabSelection onLabSelect={handleLabSelect} />
  }

  // Show booking pages with navigation
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation */}
      <nav className="bg-gray-800 shadow-sm border-b border-[#00b97e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-white">Umbra</h1>
              {isAuthenticated && selectedLab && (
                <span className="ml-4 text-sm text-gray-300">
                  Lab: <span className="text-[#00b97e] font-medium">{selectedLab}</span>
                </span>
              )}
            </div>
            <div className="flex items-center space-x-4">
              {isAuthenticated && (
                <button
                  onClick={() => setCurrentPage('lab-selection')}
                  className="text-sm text-gray-300 hover:text-[#00b97e] transition-colors"
                >
                  Change Lab
                </button>
              )}
              
              {!isAuthenticated && (
                <button
                  onClick={handleLogin}
                  className="text-sm text-gray-300 hover:text-[#00b97e] transition-colors"
                >
                  Login
                </button>
              )}
              
              <button
                onClick={() => setCurrentPage('simple-booking')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === 'simple-booking'
                    ? 'bg-[#00b97e] text-white'
                    : 'text-gray-300 hover:text-[#00b97e] hover:bg-gray-700'
                }`}
              >
                Booking
              </button>
              
              {isAuthenticated && (
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-red-400 hover:bg-gray-700 transition-colors"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main>
        {currentPage === 'simple-booking' && (
          <div>
            <div className="p-4 bg-[#00b97e] bg-opacity-20 text-[#00b97e] text-sm border-b border-[#00b97e]">
              Debug: Showing booking page for lab: {selectedLab}
            </div>
            <SimpleBookingPage />
          </div>
        )}
        {currentPage !== 'simple-booking' && (
          <div className="p-4 text-center text-gray-400">
            Current page: {currentPage}
          </div>
        )}
      </main>
    </div>
  )
}

export default App