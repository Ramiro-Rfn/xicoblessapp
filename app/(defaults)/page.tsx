import ComponentsDashboardSales from '@/components/dashboard/components-dashboard-sales';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Dashboard',
};

const Sales = () => {
    return <ComponentsDashboardSales />;
};

export default Sales;
