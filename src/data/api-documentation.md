# API Endpoints Documentation

## Base URL
```
http://localhost:3001/api
```

## Authentication
All requests require an Authorization header with a Bearer token:
```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### 1. Get All Bookings
```
GET /bookings
```
**Query Parameters:**
- `startDate` (optional): Filter bookings from this date (YYYY-MM-DD)
- `endDate` (optional): Filter bookings until this date (YYYY-MM-DD)

**Example Request:**
```bash
GET /bookings?startDate=2025-07-15&endDate=2025-07-31
```

**Example Response:**
```json
{
  "bookings": [
    {
      "id": "1",
      "date": "2025-07-15",
      "times": ["09:00", "10:00"],
      "userName": "João Silva",
      "course": "physics",
      "annotation": "Experimento de óptica",
      "repeatType": "none",
      "labId": "LF",
      "status": "confirmed",
      "createdAt": "2025-07-10T10:30:00Z"
    }
  ],
  "availableTimeSlots": [
    "07:00", "07:45", "08:30", "09:05", "09:15", "10:00", "10:45",
    "11:30", "12:15", "13:00", "13:45", "14:30", "15:05", "15:15",
    "16:00", "16:45", "17:30", "18:15", "19:00", "19:45", "20:30",
    "21:05", "21:15", "22:00", "22:45", "23:30"
  ],
  "courses": [
    { "id": "mathematics", "name": "Matemática" },
    { "id": "physics", "name": "Física" },
    { "id": "chemistry", "name": "Química" }
  ]
}
```

### 2. Get Bookings by Date
```
GET /bookings/date/:date
```
**Path Parameters:**
- `date`: Date in YYYY-MM-DD format

**Example Request:**
```bash
GET /bookings/date/2025-07-15
```

**Example Response:**
```json
{
  "bookings": [
    {
      "id": "1",
      "date": "2025-07-15",
      "times": ["09:00", "10:00"],
      "userName": "João Silva",
      "course": "physics",
      "annotation": "Experimento de óptica",
      "repeatType": "none",
      "labId": "LF",
      "status": "confirmed",
      "createdAt": "2025-07-10T10:30:00Z"
    }
  ]
}
```

### 3. Create Booking
```
POST /bookings
```
**Request Body:**
```json
{
  "date": "2025-07-15",
  "times": ["09:00", "10:00"],
  "userName": "João Silva",
  "course": "physics",
  "annotation": "Experimento de óptica",
  "repeatType": "none",
  "labId": "LF"
}
```

**Example Response:**
```json
{
  "booking": {
    "id": "123",
    "date": "2025-07-15",
    "times": ["09:00", "10:00"],
    "userName": "João Silva",
    "course": "physics",
    "annotation": "Experimento de óptica",
    "repeatType": "none",
    "labId": "LF",
    "status": "confirmed",
    "createdAt": "2025-07-11T14:30:00Z"
  },
  "message": "Reserva criada com sucesso",
  "success": true
}
```

### 4. Update Booking
```
PUT /bookings/:id
```
**Path Parameters:**
- `id`: Booking ID

**Request Body:**
```json
{
  "date": "2025-07-16",
  "times": ["11:00", "12:00"],
  "annotation": "Experimento atualizado",
  "repeatType": "weekly"
}
```

**Example Response:**
```json
{
  "booking": {
    "id": "123",
    "date": "2025-07-16",
    "times": ["11:00", "12:00"],
    "userName": "João Silva",
    "course": "physics",
    "annotation": "Experimento atualizado",
    "repeatType": "weekly",
    "labId": "LF",
    "status": "confirmed",
    "createdAt": "2025-07-10T10:30:00Z",
    "updatedAt": "2025-07-11T14:30:00Z"
  },
  "message": "Reserva atualizada com sucesso",
  "success": true
}
```

### 5. Delete Booking
```
DELETE /bookings/:id
```
**Path Parameters:**
- `id`: Booking ID

**Example Response:**
```json
{
  "success": true,
  "message": "Reserva cancelada com sucesso"
}
```

### 6. Get Available Time Slots
```
GET /bookings/available-slots/:date
```
**Path Parameters:**
- `date`: Date in YYYY-MM-DD format

**Query Parameters:**
- `labId` (optional): Filter by laboratory ID

**Example Request:**
```bash
GET /bookings/available-slots/2025-07-15?labId=LF
```

**Example Response:**
```json
{
  "availableTimeSlots": [
    "07:00", "07:45", "08:30", "11:30", "12:15", "13:00", "13:45",
    "14:30", "15:05", "15:15", "16:00", "16:45", "17:30", "18:15",
    "19:00", "19:45", "20:30", "21:05", "21:15", "22:00", "22:45", "23:30"
  ]
}
```

### 7. Get User Bookings
```
GET /bookings/user/:userId
```
**Path Parameters:**
- `userId`: User ID

**Example Response:**
```json
{
  "bookings": [
    {
      "id": "1",
      "date": "2025-07-15",
      "times": ["09:00", "10:00"],
      "userName": "João Silva",
      "course": "physics",
      "annotation": "Experimento de óptica",
      "repeatType": "none",
      "labId": "LF",
      "status": "confirmed",
      "createdAt": "2025-07-10T10:30:00Z"
    }
  ]
}
```

## Error Responses

### 400 Bad Request
```json
{
  "error": "Bad Request",
  "message": "Invalid request data",
  "details": {
    "field": "date",
    "message": "Date is required"
  }
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Invalid or missing authentication token"
}
```

### 404 Not Found
```json
{
  "error": "Not Found",
  "message": "Booking not found"
}
```

### 409 Conflict
```json
{
  "error": "Conflict",
  "message": "Time slot already booked",
  "details": {
    "conflictingTimes": ["09:00", "10:00"]
  }
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal Server Error",
  "message": "An unexpected error occurred"
}
```

## Data Types

### Booking Object
```typescript
interface BookingData {
  id?: string;
  date: string; // YYYY-MM-DD
  times: string[]; // Array of time slots like ["09:00", "10:00"]
  userName: string;
  course: string;
  annotation: string;
  repeatType: 'none' | 'daily' | 'weekly' | 'monthly';
  labId?: string;
  status?: 'pending' | 'confirmed' | 'cancelled';
  createdAt?: string; // ISO 8601 datetime
  updatedAt?: string; // ISO 8601 datetime
}
```

### Course Object
```typescript
interface Course {
  id: string;
  name: string;
}
```

## Environment Variables

Create a `.env` file in your React app with:
```
REACT_APP_API_URL=http://localhost:3001/api
```

## Authentication

The API expects a JWT token in the Authorization header. The token should be stored in localStorage with the key `authToken`.

Example:
```javascript
localStorage.setItem('authToken', 'your-jwt-token-here');
```

## Notes

1. All times are in 24-hour format (HH:MM)
2. Dates are in YYYY-MM-DD format
3. The API uses Brazilian Portuguese for user-facing messages
4. Booking conflicts are automatically detected and will return a 409 error
5. Repeated bookings are created as separate booking records
6. The API supports pagination for large result sets (add `?page=1&limit=50` to GET requests)
