import { Box } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import PageHeader from 'src/components/page-header/page-header';

import InitialTriggerNode from 'src/sections/workflows/flows';
import DividerFlow from 'src/sections/history/Workflows/line_divider_flow';
import TriggerNode from 'src/sections/history/Workflows/history_flows copy';

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
      {/* <ChatView /> */}
      <Box
        sx={{
          p: 6,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // Center-aligns items horizontally within the column
          justifyContent: 'center', // Center-aligns items vertically
        }}
      >
        <Box>
          <TriggerNode />
          <DividerFlow />
        </Box>
        <Box>
          <TriggerNode />
          <DividerFlow />
        </Box>{' '}
        <Box width="350px">
          <InitialTriggerNode />
        </Box>{' '}
      </Box>
    </DashboardContent>
  );
}
