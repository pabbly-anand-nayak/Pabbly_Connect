import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Box, Card, Divider, Tooltip,CardHeader } from '@mui/material';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import PageHeader from 'src/components/page-header/page-header';

// ----------------------------------------------------------------------

const metadata = { title: `Page four | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      {/* <BlankView title="Notification Preferences" /> */}
      <DashboardContent maxWidth="xl">
        <PageHeader
          title="Notification Preferences"
          Subheading="You can customize different notificatons for user chats requesting for intervention."
          showButton={false}
        />
        <Box sx={{ mt: 4 }}>
          {' '}
          {/* Add margin-top and padding for spacing */}
          <Card>
            <CardHeader
              title="Sound Notification"
              // subheader="Title, short description, image..."
              sx={{ mb: 3 }}
            />
            <Divider />
            <Tooltip title="Click to disable/enable sound alerts." arrow placement="top">
            <FormControlLabel
              control={
                <Switch
                  id="toggle-taxes"
                  // checked={includeTaxes}
                  // onChange={handleChangeIncludeTaxes}
                />
              }
              label="Disable sound notification"
              sx={{ paddingLeft: 3, mt: 2, mb: 2 }}
            />
            </Tooltip>
          </Card>
        </Box>
      </DashboardContent>
    </>
  );
}
