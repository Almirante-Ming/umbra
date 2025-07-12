import { useState, useEffect } from 'react'

export function TestLabSelection() {
  const [message, setMessage] = useState('Loading...')

  useEffect(() => {
    console.log('TestLabSelection: Component mounted')
    
    try {
      // Try to import the service
      import('../services/lumusService').then((module) => {
        console.log('TestLabSelection: Service imported successfully', module)
        const labs = module.labService.getLabs()
        console.log('TestLabSelection: Labs data:', labs)
        setMessage(`Found ${labs.length} labs: ${labs.map(l => l.name).join(', ')}`)
      }).catch((error) => {
        console.error('TestLabSelection: Error importing service:', error)
        setMessage(`Error importing service: ${error.message}`)
      })
    } catch (error) {
      console.error('TestLabSelection: Error in useEffect:', error)
      setMessage(`Error in useEffect: ${error}`)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-white text-lg p-8 bg-gray-800 rounded-lg">
        <h1 className="text-2xl mb-4">Test Lab Selection</h1>
        <p>{message}</p>
      </div>
    </div>
  )
}
