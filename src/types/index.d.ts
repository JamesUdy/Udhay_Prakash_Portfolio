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
  status: 'completed' | 'developing';
  source?: string;
  demo?: string;
}

declare interface SocialMediaLink {
  id: number;
  siteName: string;
  icon: React.ComponentType | string;
  url: string;
}
