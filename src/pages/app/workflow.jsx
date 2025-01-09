import { Box } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

import InitialTriggerNode from 'src/sections/workflows/flows';
import TriggerNode from 'src/sections/history/task-history/components/workflows/history_flows copy'; 


// import { ChatView } from 'src/sections/chat/view';

const metadata = { title: `Workflow | Dashboard - ${CONFIG.site.name}` };

// ----------------------------------------------------------------------

export default function Page({ sx, icon, title, total, color = 'warning', ...other }) {
  const dialog = useBoolean();
  return (
    <DashboardContent maxWidth="xl">
      {/* <PageHeader
        title="Workflows"
        Subheading="Pabbly Connect provides you the ability to integrate multiple applications by managing the data flow smoothly."
      /> */}
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
          <Box display="flex" flexDirection="column" alignItems="center">
            <Iconify
              icon="vaadin:line-v"
              sx={{
                // color: '#84889780',
                '[data-mui-color-scheme="light"] &': {
                  color: '#84889780',
                },
                '[data-mui-color-scheme="dark"] &': {
                  color: 'var(--palette-text-secondary)',
                },
              }}
            />
            <Iconify
              icon="bxs:down-arrow"
              sx={{
                mt: '-4px',
                mb: '-3px',
                color: '#84889780',
                '[data-mui-color-scheme="light"] &': {
                  color: '#84889780',
                },
                '[data-mui-color-scheme="dark"] &': {
                  color: 'var(--palette-text-secondary)',
                },
              }}
            />
          </Box>
        </Box>
        <Box>
          <TriggerNode />
          <Box display="flex" flexDirection="column" alignItems="center">
            <Iconify
              icon="vaadin:line-v"
              sx={{
                // color: '#84889780',
                '[data-mui-color-scheme="light"] &': {
                  color: '#84889780',
                },
                '[data-mui-color-scheme="dark"] &': {
                  color: 'var(--palette-text-secondary)',
                },
              }}
            />
            <Iconify
              icon="bxs:down-arrow"
              sx={{
                mt: '-4px',
                mb: '-3px',
                color: '#84889780',
                '[data-mui-color-scheme="light"] &': {
                  color: '#84889780',
                },
                '[data-mui-color-scheme="dark"] &': {
                  color: 'var(--palette-text-secondary)',
                },
              }}
            />
          </Box>{' '}
        </Box>{' '}
        <Box width="350px">
          <InitialTriggerNode />
        </Box>{' '}
      </Box>
    </DashboardContent>
  );
}
