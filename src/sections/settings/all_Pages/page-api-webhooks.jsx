import React, { useState } from 'react';
import { useTheme } from '@emotion/react';
import { Helmet } from 'react-helmet-async';

import { useMediaQuery } from '@mui/material';

import { CONFIG } from 'src/config-global';

import BigCard from 'src/components/big-card/big-card';

import NewTokenInput from '../components/page-webhook/hook/new-token-input';
import WebhookTable from '../components/page-webhook/table-webhook/webhook-table';
import { WebhookDialog } from '../components/page-webhook/hook/add-update-webhook-dialog';

// ----------------------------------------------------------------------

const metadata = {
  title: `API & Webhooks | ${CONFIG.site.name}`,
};
export default function APIWebhooksPage() {
  // Custom handler to open dialog
  const [isWebhookDialogOpen, setDialogOpen] = useState(false);

  const handleConfigureWebhook = () => {
    setDialogOpen(true);
  };

  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <NewTokenInput />

      <BigCard
        title="Points To Remember!"
        secondarytitle=""
        steps={[
          "Click 'Generate API Token' to create a new token, invalidating the previous one.",
          "Click 'Copy' to quickly copy the API token for use in Pabbly Connect Manager application.",
          'Ensure that you do not share the API token with anyone. ',
          <>
            With the Pabbly Connect API, you can obtain real-time status updates for workflows,
            manage team members, and much more.{' '}
          </>,
        ]}
        learnMoreLink=""
        videoThumbnail="API_Webhooks.png"
        videoId="https://www.youtube.com/embed/Lv9Rnzoh-vY"
        buttonText="Add Webhook"
        buttonTooltip="Click here to add a webhook URL and a webhook event that will trigger the webhook URL."
        onButtonClick={handleConfigureWebhook}
        buttonIcon="heroicons:plus-circle-16-solid"
      />

      {/* Separate Dialog */}
      <WebhookDialog open={isWebhookDialogOpen} onClose={() => setDialogOpen(false)} />

      <WebhookTable />
    </>
  );
}
