import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Login from './pages/Login'
import Register from './pages/Register'
import Welcome from './pages/Welcome'
import Assess from './pages/Assess'
import Results from './pages/Results'
import MyACs from './pages/MyACs'
import Log from './pages/Log'
import Tips from './pages/Tips'
import BillTracker from './pages/BillTracker'
import AskAI from './pages/AskAI'
import Technician from './pages/Technician'
import Profile from './pages/Profile'
import Navbar from './components/Navbar'
import Layout from './components/Layout'
import Paywall from './components/Paywall'
import AdminPanel from './pages/AdminPanel'

function ProtectedRoute({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" />
}

function AppPage({ children }) {
  const { user, usage } = useAuth()

  if (!user) return <Navigate to="/login" />

  if (usage.visits > 2 && !usage.paid) {
    return <Paywall />
  }

  return (
    <Layout>
      <Navbar />
      {children}
    </Layout>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<AppPage><Welcome /></AppPage>} />
        <Route path="/assess" element={<AppPage><Assess /></AppPage>} />
        <Route path="/results" element={<AppPage><Results /></AppPage>} />
        <Route path="/my-acs" element={<AppPage><MyACs /></AppPage>} />
        <Route path="/log" element={<AppPage><Log /></AppPage>} />
        <Route path="/tips" element={<AppPage><Tips /></AppPage>} />
        <Route path="/bill-tracker" element={<AppPage><BillTracker /></AppPage>} />
        <Route path="/ask-ai" element={<ProtectedRoute><AskAI /></ProtectedRoute>} />
        <Route path="/technician" element={<AppPage><Technician /></AppPage>} />
        <Route path="/profile" element={<AppPage><Profile /></AppPage>} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  )
}