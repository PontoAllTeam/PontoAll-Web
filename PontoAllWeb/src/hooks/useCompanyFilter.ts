import { useMemo } from 'react';
import { useAuth } from '@/features/auth';

interface CompanyEntity {
  companyId: number;
}

export default function useCompanyFilter<T extends CompanyEntity>(
  data: T[]
): T[] {
  const { user } = useAuth();

  return useMemo(() => {
    if (!user?.companyId) return data;
    return data.filter((item) => item.companyId === user.companyId);
  }, [data, user?.companyId]);
}
