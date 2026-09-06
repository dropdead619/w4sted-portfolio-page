export type ProjectLinkType = 'ios' | 'android' | 'desktop'

export interface IProjectLink {
  type: ProjectLinkType
  href: string
  label: string
}

export interface IProject {
  id: string
  title: string
  domain: string
  year: string
  role: string
  summary: string
  points: string[]
  stack: string[]
  accent: string
  links?: IProjectLink[]
}

export interface IRole {
  id: string
  title: string
  dates: string
  /** Sort/label key used by the timeline scrubber. */
  period: string
  points: string[]
}

export interface IExperience {
  id: string
  company: string
  location: string
  dates: string
  companyImg?: string
  /** Two-letter monogram used when no logo asset exists. */
  monogram: string
  /** One company can hold several roles (a promotion path). */
  roles: IRole[]
  stack: string[]
  current?: boolean
}

export interface ISkillGroup {
  label: string
  items: string[]
}

export interface IStat {
  value: number
  suffix: string
  label: string
}
