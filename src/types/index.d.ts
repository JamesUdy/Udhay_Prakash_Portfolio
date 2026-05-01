declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}

declare module '*.avif' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}

declare module '*.webm' {
  const src: string;
  export default src;
}

declare module '*.mp4' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.pdf' {
  const src: string;
  export default src;
}

declare module 'maath/random/dist/maath-random.esm' {
  export function inSphere(array: Float32Array, options: { radius: number }): Float32Array;
}

declare interface NavLink {
  id: string;
  title: string;
}

declare interface SkillItem {
  name: string;
  icon: string;
}

declare interface TimelineEntry {
  id: number;
  title: string;
  location: string;
  date: string;
  type: 'fulltime' | 'freelance' | 'internship' | 'education' | 'origin';
  description?: string[];
}

declare interface ProjectTag {
  skills: string;
  color: string;
}

declare interface Project {
  title: string;
  description: string;
  tags: ProjectTag[];
  image: string;
  status: 'completed' | 'abandoned' | 'developing' | 'coming-soon';
  source?: string;
  demo?: string;
  size?: 'large' | 'medium' | 'small';
}

declare interface SocialMediaLink {
  id: number;
  siteName: string;
  icon: React.ComponentType | string;
  url: string;
}
