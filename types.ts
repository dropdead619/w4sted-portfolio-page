export interface IProjectLink {
    type: 'ios' | 'android' | 'desktop',
    href: string
}

export interface IProject {
    id: number
    title: string
    imgSrc: string
    description: string
    mainPointsList: string[]
    skills: string
    links?: IProjectLink[]
}

export interface ITimelineItem {
    id: number
    title: string
    dates: string
    company: string
    companyImg?: string
    mainPointsList: string[]
    stack: string[]
}