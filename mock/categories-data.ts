interface I_INTERESET_CATEGORY {
  id: string;
  name: string;
  icon: string;
}

const CATEGORIES_MOCK_DATA: I_INTERESET_CATEGORY[] = [
  { id: 'beauty', name: 'Beauty', icon: '/assets/icons/svg/beauty-icon.svg' },
  { id: 'games', name: 'Games', icon: '/assets/icons/svg/games-icon.svg' },
  {
    id: 'hobbies',
    name: 'Hobbies',
    icon: '/assets/icons/svg/hobbies-icon.svg',
  },
  {
    id: 'travel',
    name: 'Travel & Tours',
    icon: '/assets/icons/svg/travel-icon.svg',
  },
  { id: 'food', name: 'Food', icon: '/assets/icons/svg/food-icon.svg' },
  { id: 'sports', name: 'Sports', icon: '/assets/icons/svg/sports-icon.svg' },
  {
    id: 'laugh',
    name: 'Laughs & Humour',
    icon: '/assets/icons/svg/laugh-icon.svg',
  },
  { id: 'health', name: 'Health', icon: '/assets/icons/svg/health-icon.svg' },
];

export default CATEGORIES_MOCK_DATA;