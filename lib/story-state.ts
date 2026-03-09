export interface DiaryEntry {
  id?: string
  content: string
  createdAt?: Date
}

export interface WishMessage {
  id?: string
  senderName: string
  receiverName: string
  message: string
  createdAt?: Date
}

export interface StoryState {
  currentStep: number
  diaryEntries: DiaryEntry[]
  wishMessages: WishMessage[]
}

export const initialStoryState: StoryState = {
  currentStep: 1,
  diaryEntries: [],
  wishMessages: [],
}
