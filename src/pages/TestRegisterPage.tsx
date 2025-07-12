interface RegisterPageProps {
  onRegister: () => void
  onBack: () => void
}

export function TestRegisterPage({ onRegister, onBack }: RegisterPageProps) {
  console.log('TestRegisterPage: Component rendering')
  
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#1a1a1a', 
      color: 'white', 
      padding: '20px',
      fontSize: '18px'
    }}>
      <h1>Register Page - Test</h1>
      <p>This is a test to see if the RegisterPage is rendering.</p>
      
      <div style={{ marginTop: '20px' }}>
        <button 
          onClick={onBack}
          style={{
            background: '#555',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            marginRight: '10px',
            cursor: 'pointer'
          }}
        >
          Back to Login
        </button>
        
        <button 
          onClick={onRegister}
          style={{
            background: '#00b97e',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Mock Register
        </button>
      </div>
    </div>
  )
}
