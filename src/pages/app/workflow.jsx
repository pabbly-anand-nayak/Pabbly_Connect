import { useBoolean } from 'src/hooks/use-boolean';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import PageHeader from 'src/components/page-header/page-header';

// import { ChatView } from 'src/sections/chat/view';

const metadata = { title: `Workflow | Dashboard - ${CONFIG.site.name}` };

// ----------------------------------------------------------------------

export default function Page({ sx, icon, title, total, color = 'warning', ...other }) {
  const dialog = useBoolean();
  return (
    <DashboardContent maxWidth="xl">
      <PageHeader
        title="Workflows"
        Subheading="Pabbly Connect provides you the ability to integrate multiple applications by managing the data flow smoothly."
      />
    </DashboardContent>
  );
}
