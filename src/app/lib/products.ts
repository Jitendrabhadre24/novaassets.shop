
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
    id: 'canva-bundle',
    title: 'Canva Pro Access + Premium Design Bundle',
    description: 'Get access to premium design tools, templates, and exclusive resources for your next big project.',
    category: 'Graphics',
    imageUrl: PlaceHolderImages.find(img => img.id === 'canva-bundle')?.imageUrl || '',
    price: 'Free',
    features: [
      'Access to premium design templates',
      'Social media post packs',
      'Business branding kits',
      'Resume & presentation templates',
      'Step-by-step Canva Pro usage guide'
    ],
    stats: { downloads: '642', rating: '4.8' }
  },
  {
    id: '1',
    title: 'Modern UI/UX Mastery',
    description: 'Master the art of high-conversion interface design for SaaS products.',
    category: 'Courses',
    imageUrl: PlaceHolderImages.find(img => img.id === 'course-2')?.imageUrl || '',
    price: 'Free',
    features: ['12 High-Res Modules', 'Figma Resource Kit', 'Case Study Templates', 'Design Checklist'],
    stats: { downloads: '527', rating: '4.8' }
  },
  {
    id: '2',
    title: 'SaaS Analytics Dashboard',
    description: 'Professional-grade React components for data-heavy applications.',
    category: 'Templates',
    imageUrl: PlaceHolderImages.find(img => img.id === 'template-1')?.imageUrl || '',
    price: 'Free',
    features: ['React & Tailwind', 'Dark/Light Mode', 'Fully Responsive', 'Chart Library Included'],
    stats: { downloads: '612', rating: '4.9' }
  },
  {
    id: '3',
    title: 'Digital Empire Ebook',
    description: 'The definitive guide to scaling your first digital asset portfolio.',
    category: 'Ebooks',
    imageUrl: PlaceHolderImages.find(img => img.id === 'ebook-1')?.imageUrl || '',
    price: 'Free',
    features: ['200+ Pages PDF', 'Market Strategy Map', 'Outsourcing Guide', 'Bonus Worksheets'],
    stats: { downloads: '489', rating: '4.7' }
  },
  {
    id: '4',
    title: 'Social Automation Suite',
    description: 'Automate your content pipeline with these powerful script templates.',
    category: 'Software',
    imageUrl: PlaceHolderImages.find(img => img.id === 'software-1')?.imageUrl || '',
    price: 'Free',
    features: ['API Integrations', 'Scheduling Engine', 'Proxy Support', 'Detailed Logs'],
    stats: { downloads: '734', rating: '4.6' }
  },
  {
    id: '5',
    title: 'Premium 3D Element Pack',
    description: 'High-quality 3D icons optimized for web and mobile performance.',
    category: 'Graphics',
    imageUrl: PlaceHolderImages.find(img => img.id === 'graphics-1')?.imageUrl || '',
    price: 'Free',
    features: ['4K PNG Textures', 'Source Blender Files', 'Customizable Colors', 'Commercial License'],
    stats: { downloads: '321', rating: '4.9' }
  }
];

export const CATEGORIES = ['Ebooks', 'Courses', 'Templates', 'Software', 'Graphics'] as const;
