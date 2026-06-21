'use client';

import StatsGrid from '@/component/dashboard/StatsGrid';
import { useSession } from '@/lib/auth-client';
const DummyIcon = () => <span>📊</span>;

const AdminPage = () => {
  const { data: session, isPending } = useSession();

  // Data Sample 1: Admin Stats Layout Array Configuration
  const adminData = [
    {
      title: 'Total Users',
      value: 12842,
      change: 12,
      isPositive: true,
      icon: DummyIcon,
      bgIcon: DummyIcon,
      iconColorClass: 'text-neutral-400',
      iconBgClass: 'bg-neutral-800/50',
    },
    {
      title: 'Total Recipes',
      value: 4291,
      change: 5,
      isPositive: true,
      icon: DummyIcon,
      bgIcon: DummyIcon,
      iconColorClass: 'text-lime-500',
      iconBgClass: 'bg-lime-950/40',
    },
    {
      title: 'Premium Members',
      value: 892,
      change: 24,
      isPositive: true,
      icon: DummyIcon,
      bgIcon: DummyIcon,
      iconColorClass: 'text-cyan-400',
      iconBgClass: 'bg-cyan-950/40',
    },
    {
      title: 'Active Reports',
      value: 14,
      change: -8,
      isPositive: false,
      icon: DummyIcon,
      bgIcon: DummyIcon,
      iconColorClass: 'text-rose-400',
      iconBgClass: 'bg-rose-950/40',
    },
  ];

  // Data Sample 2: Recipe Metrics Dashboard Array Configuration
  const recipeData = [
    {
      title: 'Recipe Views',
      value: 45200,
      change: 18,
      isPositive: true,
      icon: DummyIcon,
      bgIcon: DummyIcon,
      iconColorClass: 'text-blue-400',
      iconBgClass: 'bg-blue-950/40',
    },
    {
      title: 'Total Saves',
      value: 3120,
      change: 32,
      isPositive: true,
      icon: DummyIcon,
      bgIcon: DummyIcon,
      iconColorClass: 'text-pink-400',
      iconBgClass: 'bg-pink-950/40',
    },
    {
      title: 'Trending Score',
      value: 98,
      change: 4,
      isPositive: true,
      icon: DummyIcon,
      bgIcon: DummyIcon,
      iconColorClass: 'text-orange-400',
      iconBgClass: 'bg-orange-950/40',
    },
    {
      title: 'New Comments',
      value: 41,
      change: -2,
      isPositive: false,
      icon: DummyIcon,
      bgIcon: DummyIcon,
      iconColorClass: 'text-purple-400',
      iconBgClass: 'bg-purple-950/40',
    },
  ];

  if (isPending) {
    return (
      <div>
        <div className="flex flex-col items-center gap-2 justify-center min-h-screen">
          <span className="loading loading-spinner loading-xl  "></span>
          <h3 className="text-lg font-bold"> Loading </h3>
        </div>
      </div>
    );
  }

  const user = session?.user;

  return (
    <div className="">
      <h1 className="text-3xl font-bold ml-4 ">
        {' '}
        {user.name.toUpperCase()} WelCame to Admin page
      </h1>

      <div className="py-4 ml-4">
        <StatsGrid data={recipeData} />
      </div>
    </div>
  );
};

export default AdminPage;
