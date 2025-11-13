export interface HealthReport {
  id: string
  symptoms: string[]
  ward: string
  timestamp: Date
  location?: {
    lat: number
    lng: number
  }
}

export interface DiaryEntry {
  id: string
  userId: string
  symptoms: string[]
  notes?: string
  timestamp: Date
  severity: number // 1-5 scale
}

export interface WardData {
  id: string
  name: string
  reportCount: number
  symptoms: { [key: string]: number }
}

export interface DailyStats {
  date: string
  fever: number
  cough: number
  fatigue: number
  cold: number
  bodyPain: number
}

export interface PersonalStats {
  daysSickThisMonth: number
  averageRecoveryTime: number
  totalReports: number
}

export interface Reminder {
  id: string
  name: string
  time: string
  frequency: 'daily' | 'weekly' | 'as_needed'
  enabled: boolean
}