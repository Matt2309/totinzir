import { getSession } from '@/lib/sessions';
import HeaderClient from '@/components/HeaderMainClient';

export default async function HeaderMain() {
    const session = await getSession();
    const user = session?.userId;

    return <HeaderClient user={user} />;
}
