import { PlaceHolderImages } from '@/lib/placeholder-images';

export interface Product {
  id: string;
  title: string;
  description: string;
  category: 'Ebooks' | 'Courses' | 'Templates' | 'Software' | 'Graphics';
  imageUrl: string;
  price: string;
  features: string[];
  stats: {
    downloads: string;
    rating: string;
  };
}

export const PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Modern UI/UX Mastery',
    description: 'Learn the principles of modern interface design and user experience.',
    category: 'Courses',
    imageUrl: PlaceHolderImages.find(img => img.id === 'course-2')?.imageUrl || '',
    price: 'Free',
    features: ['10+ Hours Content', 'Project Files Included', 'Certificate of Completion', 'Lifetime Access'],
    stats: { downloads: '12,532', rating: '4.8' }
  },
  {
    id: '2',
    title: 'SaaS Dashboard Template',
    description: 'A fully responsive React + Tailwind CSS dashboard template.',
    category: 'Templates',
    imageUrl: PlaceHolderImages.find(img => img.id === 'template-1')?.imageUrl || '',
    price: 'Free',
    features: ['React & Tailwind', 'Dark mode support', 'Figma Files', 'Documentation'],
    stats: { downloads: '8,210', rating: '4.9' }
  },
  {
    id: '3',
    title: 'The Digital Wealth Guide',
    description: 'A comprehensive ebook on building a digital asset portfolio.',
    category: 'Ebooks',
    imageUrl: PlaceHolderImages.find(img => img.id === 'ebook-1')?.imageUrl || '',
    price: 'Free',
    features: ['150+ Pages', 'PDF & EPUB', 'Case Studies', 'Interactive Worksheets'],
    stats: { downloads: '15,600', rating: '4.7' }
  },
  {
    id: '4',
    title: 'Automation Workflow Engine',
    description: 'Software tool to automate repetitive social media tasks.',
    category: 'Software',
    imageUrl: PlaceHolderImages.find(img => img.id === 'software-1')?.imageUrl || '',
    price: 'Free',
    features: ['API Access', 'Multi-platform', 'Cloud Sync', 'Detailed Analytics'],
    stats: { downloads: '5,400', rating: '4.5' }
  },
  {
    id: '5',
    title: 'Ultimate 3D Icon Pack',
    description: 'Over 200 high-resolution 3D icons for your next project.',
    category: 'Graphics',
    imageUrl: PlaceHolderImages.find(img => img.id === 'graphics-1')?.imageUrl || '',
    price: 'Free',
    features: ['PNG & BLEND Files', 'Transparent Backgrounds', 'Multiple Angles', '4K Resolution'],
    stats: { downloads: '22,100', rating: '4.9' }
  },
  {
    id: '6',
    title: 'Digital Marketing Playbook',
    description: 'Advanced strategies for scaling your digital products.',
    category: 'Courses',
    imageUrl: PlaceHolderImages.find(img => img.id === 'course-1')?.imageUrl || '',
    price: 'Free',
    features: ['Live Sessions', 'Email Templates', 'Ad Spend Analysis', 'Community Access'],
    stats: { downloads: '9,800', rating: '4.6' }
  }
];

export const CATEGORIES = ['Ebooks', 'Courses', 'Templates', 'Software', 'Graphics'] as const;