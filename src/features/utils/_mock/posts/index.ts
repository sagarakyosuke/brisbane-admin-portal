export type PostStatus = 'Published' | 'Draft' | 'Archived';

export type StatusFilter = 'All' | PostStatus;

export interface Post {
  id: number;
  title: string;
  author: string;
  status: PostStatus;
  date: string;
}

export const MOCK_POSTS: Post[] = [
  {
    id: 1,
    title: 'New Logistics Route Announced',
    author: 'Paul Sager',
    status: 'Published',
    date: '2026-10-24'
  },
  {
    id: 2,
    title: 'Fleet Expansion 2026',
    author: 'Sarah Jenkins',
    status: 'Draft',
    date: '2026-10-22'
  },
  {
    id: 3,
    title: 'Holiday Schedule Update',
    author: 'Paul Sager',
    status: 'Published',
    date: '2026-10-15'
  },
  {
    id: 4,
    title: 'Brisbane Warehouse Maintenance',
    author: 'Mike Ross',
    status: 'Archived',
    date: '2026-10-10'
  }
];
