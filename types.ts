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