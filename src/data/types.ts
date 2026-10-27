export interface Person {
  id: string
  name: string
  aliases?: string[]
  honorific?: string
  roles?: string[]
}

export interface FatherConnection {
  from: string
  to: string
  type: 'father'
}
