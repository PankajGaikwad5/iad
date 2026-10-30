import { notFound } from 'next/navigation';
import { projects, getProjectBySlug, getAdjacentProjects } from '@/data/projects';
import ProjectDetailClient from './ProjectDetailClient';

export async function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found | Studio Ia.D',
    };
  }

  return {
    title: `${project.title} | Studio Ia.D`,
    description: project.tagline || `Architectural project ${project.title} in ${project.loc} by Studio Ia.D.`,
    openGraph: {
      title: `${project.title} | Studio Ia.D`,
      description: project.tagline,
      images: project.heroImage ? [project.heroImage] : [],
    },
  };
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { next, prev } = getAdjacentProjects(slug);

  return <ProjectDetailClient project={project} nextProject={next} prevProject={prev} />;
}
