import { Link } from 'react-router-dom';
import React, { useState, Fragment } from 'react';

import { styled } from '@mui/material/styles';
import {
  Tab,
  Box,
  Card,
  Tabs,
  Avatar,
  Button,
  Tooltip,
  TextField,
  Typography,
  CardContent,
  InputAdornment,
} from '@mui/material';

import { useTabs } from 'src/hooks/use-tabs';

import { varAlpha } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';

const FixedSizeGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, 120px)',
  gap: theme.spacing(2),
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  paddingLeft: theme.spacing('1px'),
  paddingRight: theme.spacing('1px'),
}));

const AppCard = styled(Card)(({ theme }) => ({
  width: 120,
  height: 120,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  '&:hover': { outline: '1px solid #078DEE' },
}));

export default function ActionSetup({ onEnableConnectionTab, onClose, onSelectApp }) {
  const [selectedApp, setSelectedApp] = useState(null);
  const [isSearchVisible, setIsSearchVisible] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const basicTabs = useTabs('one');

  const external_apps = [
    {
      name: 'Annature',
      icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1611236137587_1626158489-annature.png',
      helpText: (
        <Typography
          sx={{
            fontSize: '14px',
            color: '#637381',
          }}
        >
          All connections are fully encrypted and secure. Pabbly is{' '}
          <Link
            href="https://www.pabbly.com/security/"
            target="_blank"
            style={{ color: '#078DEE' }}
          >
            SOC2 Type 2
          </Link>{' '}
          and{' '}
          <Link
            href="https://www.pabbly.com/security/"
            target="_blank"
            style={{ color: '#078DEE' }}
          >
            ISO 27001:2022
          </Link>{' '}
          Certified.{' '}
          <Link
            href="https://www.pabbly.com/privacy-policy/"
            target="_blank"
            style={{ color: '#078DEE' }}
          >
            View privacy policy
          </Link>
          .
        </Typography>
      ),
    },
    {
      name: 'ChargeOver',
      icon: 'https://s3.us-west-2.amazonaws.com/connect.pabbly/images/1717494873-ChargeOver.png',
      helpText: (
        <Typography
          sx={{
            fontSize: '14px',
            color: '#637381',
          }}
        >
          All connections are fully encrypted and secure. Pabbly is{' '}
          <Link
            href="https://www.pabbly.com/security/"
            target="_blank"
            style={{ color: '#078DEE' }}
          >
            SOC2 Type 2
          </Link>{' '}
          and{' '}
          <Link
            href="https://www.pabbly.com/security/"
            target="_blank"
            style={{ color: '#078DEE' }}
          >
            ISO 27001:2022
          </Link>{' '}
          Certified.{' '}
          <Link
            href="https://www.pabbly.com/privacy-policy/"
            target="_blank"
            style={{ color: '#078DEE' }}
          >
            View privacy policy
          </Link>
          .
        </Typography>
      ),
    },
    {
      name: '123Formbuilder',
      icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1591083099349_1591774916-123FormBuilder.png',
      helpText: (
        <Typography
          sx={{
            fontSize: '14px',
            color: '#637381',
          }}
        >
          All connections are fully encrypted and secure. Pabbly is{' '}
          <Link
            href="https://www.pabbly.com/security/"
            target="_blank"
            style={{ color: '#078DEE' }}
          >
            SOC2 Type 2
          </Link>{' '}
          and{' '}
          <Link
            href="https://www.pabbly.com/security/"
            target="_blank"
            style={{ color: '#078DEE' }}
          >
            ISO 27001:2022
          </Link>{' '}
          Certified.{' '}
          <Link
            href="https://www.pabbly.com/privacy-policy/"
            target="_blank"
            style={{ color: '#078DEE' }}
          >
            View privacy policy
          </Link>
          .
        </Typography>
      ),
    },
    {
      name: '360 Dialog (Cloud)',
      icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1642563579878_1653308257-360-Dialog.png',
      helpText: (
        <Typography
          sx={{
            fontSize: '14px',
            color: '#637381',
          }}
        >
          All connections are fully encrypted and secure. Pabbly is{' '}
          <Link
            href="https://www.pabbly.com/security/"
            target="_blank"
            style={{ color: '#078DEE' }}
          >
            SOC2 Type 2
          </Link>{' '}
          and{' '}
          <Link
            href="https://www.pabbly.com/security/"
            target="_blank"
            style={{ color: '#078DEE' }}
          >
            ISO 27001:2022
          </Link>{' '}
          Certified.{' '}
          <Link
            href="https://www.pabbly.com/privacy-policy/"
            target="_blank"
            style={{ color: '#078DEE' }}
          >
            View privacy policy
          </Link>
          .
        </Typography>
      ),
    },
    {
      name: '360 Dialog (On-Premise)',
      icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1642563579878_1653308257-360-Dialog.png',
      helpText: (
        <Typography
          sx={{
            fontSize: '14px',
            color: '#637381',
          }}
        >
          All connections are fully encrypted and secure. Pabbly is{' '}
          <Link
            href="https://www.pabbly.com/security/"
            target="_blank"
            style={{ color: '#078DEE' }}
          >
            SOC2 Type 2
          </Link>{' '}
          and{' '}
          <Link
            href="https://www.pabbly.com/security/"
            target="_blank"
            style={{ color: '#078DEE' }}
          >
            ISO 27001:2022
          </Link>{' '}
          Certified.{' '}
          <Link
            href="https://www.pabbly.com/privacy-policy/"
            target="_blank"
            style={{ color: '#078DEE' }}
          >
            View privacy policy
          </Link>
          .
        </Typography>
      ),
    },
    {
      name: 'Adyen',
      icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1603100395158_1605873194-adyen.png',
      helpText: (
        <Typography
          sx={{
            fontSize: '14px',
            color: '#637381',
          }}
        >
          All connections are fully encrypted and secure. Pabbly is{' '}
          <Link
            href="https://www.pabbly.com/security/"
            target="_blank"
            style={{ color: '#078DEE' }}
          >
            SOC2 Type 2
          </Link>{' '}
          and{' '}
          <Link
            href="https://www.pabbly.com/security/"
            target="_blank"
            style={{ color: '#078DEE' }}
          >
            ISO 27001:2022
          </Link>{' '}
          Certified.{' '}
          <Link
            href="https://www.pabbly.com/privacy-policy/"
            target="_blank"
            style={{ color: '#078DEE' }}
          >
            View privacy policy
          </Link>
          .
        </Typography>
      ),
    },
    {
      name: 'ActiveTrail',
      icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1591083099349_1597145299-ActiveTrail.png',
      helpText: (
        <Typography
          sx={{
            fontSize: '14px',
            color: '#637381',
          }}
        >
          All connections are fully encrypted and secure. Pabbly is{' '}
          <Link
            href="https://www.pabbly.com/security/"
            target="_blank"
            style={{ color: '#078DEE' }}
          >
            SOC2 Type 2
          </Link>{' '}
          and{' '}
          <Link
            href="https://www.pabbly.com/security/"
            target="_blank"
            style={{ color: '#078DEE' }}
          >
            ISO 27001:2022
          </Link>{' '}
          Certified.{' '}
          <Link
            href="https://www.pabbly.com/privacy-policy/"
            target="_blank"
            style={{ color: '#078DEE' }}
          >
            View privacy policy
          </Link>
          .
        </Typography>
      ),
    },
    {
      name: 'AnnounceKit',
      icon: 'https://s3.us-west-2.amazonaws.com/connect.pabbly/images/1717572942-AnnounceKit.png',
      helpText: (
        <Typography
          sx={{
            fontSize: '14px',
            color: '#637381',
          }}
        >
          All connections are fully encrypted and secure. Pabbly is{' '}
          <Link
            href="https://www.pabbly.com/security/"
            target="_blank"
            style={{ color: '#078DEE' }}
          >
            SOC2 Type 2
          </Link>{' '}
          and{' '}
          <Link
            href="https://www.pabbly.com/security/"
            target="_blank"
            style={{ color: '#078DEE' }}
          >
            ISO 27001:2022
          </Link>{' '}
          Certified.{' '}
          <Link
            href="https://www.pabbly.com/privacy-policy/"
            target="_blank"
            style={{ color: '#078DEE' }}
          >
            View privacy policy
          </Link>
          .
        </Typography>
      ),
    },
    {
      name: 'Campaign Monitor',
      icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1598084818603_1599215654-Campaign-Monitor.png',
      helpText: (
        <Typography
          sx={{
            fontSize: '14px',
            color: '#637381',
          }}
        >
          All connections are fully encrypted and secure. Pabbly is{' '}
          <Link
            href="https://www.pabbly.com/security/"
            target="_blank"
            style={{ color: '#078DEE' }}
          >
            SOC2 Type 2
          </Link>{' '}
          and{' '}
          <Link
            href="https://www.pabbly.com/security/"
            target="_blank"
            style={{ color: '#078DEE' }}
          >
            ISO 27001:2022
          </Link>{' '}
          Certified.{' '}
          <Link
            href="https://www.pabbly.com/privacy-policy/"
            target="_blank"
            style={{ color: '#078DEE' }}
          >
            View privacy policy
          </Link>
          .
        </Typography>
      ),
    },
    {
      name: '8x8',
      icon: 'https://s3.us-west-2.amazonaws.com/connect.pabbly/images/1717572958-8x8.png',
      helpText: (
        <Typography
          sx={{
            fontSize: '14px',
            color: '#637381',
          }}
        >
          All connections are fully encrypted and secure. Pabbly is{' '}
          <Link
            href="https://www.pabbly.com/security/"
            target="_blank"
            style={{ color: '#078DEE' }}
          >
            SOC2 Type 2
          </Link>{' '}
          and{' '}
          <Link
            href="https://www.pabbly.com/security/"
            target="_blank"
            style={{ color: '#078DEE' }}
          >
            ISO 27001:2022
          </Link>{' '}
          Certified.{' '}
          <Link
            href="https://www.pabbly.com/privacy-policy/"
            target="_blank"
            style={{ color: '#078DEE' }}
          >
            View privacy policy
          </Link>
          .
        </Typography>
      ),
    },
    {
      name: 'Alchemer',
      icon: 'https://s3.us-west-2.amazonaws.com/connect.pabbly/images/1717567705-Alchemer.png',
      helpText: (
        <Typography
          sx={{
            fontSize: '14px',
            color: '#637381',
          }}
        >
          All connections are fully encrypted and secure. Pabbly is{' '}
          <Link
            href="https://www.pabbly.com/security/"
            target="_blank"
            style={{ color: '#078DEE' }}
          >
            SOC2 Type 2
          </Link>{' '}
          and{' '}
          <Link
            href="https://www.pabbly.com/security/"
            target="_blank"
            style={{ color: '#078DEE' }}
          >
            ISO 27001:2022
          </Link>{' '}
          Certified.{' '}
          <Link
            href="https://www.pabbly.com/privacy-policy/"
            target="_blank"
            style={{ color: '#078DEE' }}
          >
            View privacy policy
          </Link>
          .
        </Typography>
      ),
    },
    {
      name: 'BigCommerce',
      icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1591083099349_1592046278-bigcommerce-64.png',
      helpText: (
        <Typography
          sx={{
            fontSize: '14px',
            color: '#637381',
          }}
        >
          All connections are fully encrypted and secure. Pabbly is{' '}
          <Link
            href="https://www.pabbly.com/security/"
            target="_blank"
            style={{ color: '#078DEE' }}
          >
            SOC2 Type 2
          </Link>{' '}
          and{' '}
          <Link
            href="https://www.pabbly.com/security/"
            target="_blank"
            style={{ color: '#078DEE' }}
          >
            ISO 27001:2022
          </Link>{' '}
          Certified.{' '}
          <Link
            href="https://www.pabbly.com/privacy-policy/"
            target="_blank"
            style={{ color: '#078DEE' }}
          >
            View privacy policy
          </Link>
          .
        </Typography>
      ),
    },
    {
      name: 'Albacross',
      icon: 'https://s3.us-west-2.amazonaws.com/connect.pabbly/images/1717502343-Albacross.png',
      helpText: (
        <Typography
          sx={{
            fontSize: '14px',
            color: '#637381',
          }}
        >
          All connections are fully encrypted and secure. Pabbly is{' '}
          <Link
            href="https://www.pabbly.com/security/"
            target="_blank"
            style={{ color: '#078DEE' }}
          >
            SOC2 Type 2
          </Link>{' '}
          and{' '}
          <Link
            href="https://www.pabbly.com/security/"
            target="_blank"
            style={{ color: '#078DEE' }}
          >
            ISO 27001:2022
          </Link>{' '}
          Certified.{' '}
          <Link
            href="https://www.pabbly.com/privacy-policy/"
            target="_blank"
            style={{ color: '#078DEE' }}
          >
            View privacy policy
          </Link>
          .
        </Typography>
      ),
    },
    {
      name: 'Brilliant Directory',
      icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1642563579878_1667028056-brilliant-directories.png',
      helpText: (
        <Typography
          sx={{
            fontSize: '14px',
            color: '#637381',
          }}
        >
          All connections are fully encrypted and secure. Pabbly is{' '}
          <Link
            href="https://www.pabbly.com/security/"
            target="_blank"
            style={{ color: '#078DEE' }}
          >
            SOC2 Type 2
          </Link>{' '}
          and{' '}
          <Link
            href="https://www.pabbly.com/security/"
            target="_blank"
            style={{ color: '#078DEE' }}
          >
            ISO 27001:2022
          </Link>{' '}
          Certified.{' '}
          <Link
            href="https://www.pabbly.com/privacy-policy/"
            target="_blank"
            style={{ color: '#078DEE' }}
          >
            View privacy policy
          </Link>
          .
        </Typography>
      ),
    },
    {
      name: 'Heights Platform',
      icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1591083099349_1592396845-heightsplatform.png',
      helpText: (
        <Typography
          sx={{
            fontSize: '14px',
            color: '#637381',
          }}
        >
          All connections are fully encrypted and secure. Pabbly is{' '}
          <Link
            href="https://www.pabbly.com/security/"
            target="_blank"
            style={{ color: '#078DEE' }}
          >
            SOC2 Type 2
          </Link>{' '}
          and{' '}
          <Link
            href="https://www.pabbly.com/security/"
            target="_blank"
            style={{ color: '#078DEE' }}
          >
            ISO 27001:2022
          </Link>{' '}
          Certified.{' '}
          <Link
            href="https://www.pabbly.com/privacy-policy/"
            target="_blank"
            style={{ color: '#078DEE' }}
          >
            View privacy policy
          </Link>
          .
        </Typography>
      ),
    },
  ];
  const core_apps = [
    {
      name: 'Email Parser (Pabbly)',
      icon: 'https://s3.us-west-2.amazonaws.com/connect.pabbly/images/1719902117-Pabbly-Email-Parser.png',
    },
    {
      name: 'Schedule (Pabbly)',
      icon: 'https://s3.us-west-2.amazonaws.com/connect.pabbly/images/1590489835035_1590663807-pabbly.png',
    },
    {
      name: 'Filter (Pabbly)',
      icon: 'https://s3.us-west-2.amazonaws.com/connect.pabbly/images/1717070968-Filter--Pabbly-.png',
    },
    {
      name: 'Router (Pabbly)',
      icon: 'https://s3.us-west-2.amazonaws.com/connect.pabbly/images/1717503844-Router--Pabbly-.png',
    },
    {
      name: 'Iterator (Pabbly)',
      icon: 'https://s3.us-west-2.amazonaws.com/connect.pabbly/images/1717057453-Iterator--Pabbly-.png',
    },
    {
      name: 'Delay (Pabbly)',
      icon: 'https://s3.us-west-2.amazonaws.com/connect.pabbly/images/1717070803-Delay--Pabbly-.png',
    },
    {
      name: 'API (Pabbly)',
      icon: 'https://s3.us-west-2.amazonaws.com/connect.pabbly/images/1717652425-API--Pabbly-.png',
    },
    {
      name: 'Pabbly Email Marketing',
      icon: 'https://s3.us-west-2.amazonaws.com/connect.pabbly/images/1590489835035_1590663807-pabbly.png',
    },
  ];

  const private_apps = [
    {
      name: 'Annaturedfdfd',
      icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1611236137587_1626158489-annature.png',
    },
    {
      name: 'ChargeOver',
      icon: 'https://s3.us-west-2.amazonaws.com/connect.pabbly/images/1717494873-ChargeOver.png',
    },
    {
      name: '123Formbuilder',
      icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1591083099349_1591774916-123FormBuilder.png',
    },
    {
      name: '360 Dialog (Cloud)',
      icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1642563579878_1653308257-360-Dialog.png',
    },
    {
      name: '360 Dialog (On-Premise)',
      icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1642563579878_1653308257-360-Dialog.png',
    },
    {
      name: 'Adyen',
      icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1603100395158_1605873194-adyen.png',
    },
    {
      name: 'ActiveTrail',
      icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1591083099349_1597145299-ActiveTrail.png',
    },
    {
      name: 'AnnounceKit',
      icon: 'https://s3.us-west-2.amazonaws.com/connect.pabbly/images/1717572942-AnnounceKit.png',
    },
    {
      name: 'Campaign Monitor',
      icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1598084818603_1599215654-Campaign-Monitor.png',
    },
    {
      name: '8x8',
      icon: 'https://s3.us-west-2.amazonaws.com/connect.pabbly/images/1717572958-8x8.png',
    },
    {
      name: 'Alchemer',
      icon: 'https://s3.us-west-2.amazonaws.com/connect.pabbly/images/1717567705-Alchemer.png',
    },
    {
      name: 'BigCommerce',
      icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1591083099349_1592046278-bigcommerce-64.png',
    },
    {
      name: 'Albacross',
      icon: 'https://s3.us-west-2.amazonaws.com/connect.pabbly/images/1717502343-Albacross.png',
    },
    {
      name: 'Brilliant Directory',
      icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1642563579878_1667028056-brilliant-directories.png',
    },
    {
      name: 'Heights Platform',
      icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1591083099349_1592396845-heightsplatform.png',
    },
    {
      name: 'Heights Platform',
      icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1591083099349_1592396845-heightsplatform.png',
    },
    {
      name: 'Heights Platform',
      icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1591083099349_1592396845-heightsplatform.png',
    },
    {
      name: 'Heights Platform',
      icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1591083099349_1592396845-heightsplatform.png',
    },
    {
      name: 'Heights Platform',
      icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1591083099349_1592396845-heightsplatform.png',
    },
    {
      name: 'Heights Platform',
      icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1591083099349_1592396845-heightsplatform.png',
    },
    {
      name: 'Heights Platform',
      icon: 'https://d23j5fl26hha5c.cloudfront.net/images/1591083099349_1592396845-heightsplatform.png',
    },
  ];

  const allApps = [...external_apps, ...core_apps, ...private_apps];

  const handleAppSelect = (app) => {
    setSelectedApp(app);
    setIsSearchVisible(false);
    onSelectApp(app); // Pass the entire app object, including helpText
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleAppDropdown = () => {
    setIsSearchVisible(!isSearchVisible);
    setSelectedApp(null); // Reset selection when toggling
    setSearchTerm('');
  };

  const renderAppGrid = (apps) => (
    <FixedSizeGrid>
      {apps.map((app, index) => (
        <AppCard key={index} onClick={() => handleAppSelect(app)}>
          <CardContent
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
          >
            <Avatar variant="rounded" src={app.icon} sx={{ width: 40, height: 40 }} />
            <Typography
              textAlign="center"
              variant="caption"
              component="div"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                lineHeight: '1.2em',
                height: '2.4em',
              }}
            >
              {app.name}
            </Typography>
          </CardContent>
        </AppCard>
      ))}
    </FixedSizeGrid>
  );

  const TABS = [
    {
      value: 'one',
      icon: <Iconify icon="gridicons:external" width={20} />,
      label: 'External Apps',
      form: renderAppGrid(external_apps),
    },
    {
      value: 'two',
      icon: <Iconify icon="mdi:star-four-points-circle-outline" width={20} />,
      label: 'Core Apps',
      form: renderAppGrid(core_apps),
    },
    {
      value: 'three',
      icon: <Iconify icon="material-symbols-light:private-connectivity-outline" width={30} />,
      label: 'Private Apps',
      form: renderAppGrid(private_apps),
    },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography fontSize={14} fontWeight={600} mb="8px" ml="13px">
          Choose App
        </Typography>

        {/* App selection with Search Field visible by default */}
        <Box
          onClick={toggleAppDropdown}
          sx={{
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            padding: '10px',
            display: 'flex',
            alignItems: 'center',
            '&:hover': { border: '1px solid #1C252E' },
            cursor: 'pointer',
          }}
        >
          {selectedApp && !isSearchVisible ? (
            <Box display="flex" alignItems="center">
              <Avatar
                variant="rounded"
                src={selectedApp.icon}
                sx={{ mr: 1, width: 24, height: 24 }}
              />
              <Typography>{selectedApp.name}</Typography>
            </Box>
          ) : (
            <TextField
              fullWidth
              variant="standard"
              placeholder="Search apps..."
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <Iconify icon="mingcute:search-line" sx={{ color: 'text.secondary', mr: 1 }} />
                ),
              }}
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </Box>

        {/* Tabs and search functionality */}
        {isSearchVisible && (
          <Box mt={2}>
            <Tabs
              value={basicTabs.value}
              onChange={basicTabs.onChange}
              sx={{
                mt: '0px',
                boxShadow: (theme1) =>
                  `inset 0 -2px 0 0 ${varAlpha(theme1.vars.palette.grey['500Channel'], 0.08)}`,
              }}
            >
              {TABS.map((tab) => (
                <Tab key={tab.value} icon={tab.icon} label={tab.label} value={tab.value} />
              ))}
            </Tabs>
            {TABS.map((tab) =>
              tab.value === basicTabs.value ? <Fragment key={tab.value}>{tab.form}</Fragment> : null
            )}
          </Box>
        )}

        {/* Connection name and Connect button */}
        {!isSearchVisible && selectedApp && (
          <Box mt={2}>
            <Box width="100%" sx={{ gap: 2, display: 'flex', flexDirection: 'column' }}>
              <Box width="100%" sx={{ gap: 2, display: 'flex', flexDirection: 'column' }}>
                <Box>
                  <Typography fontSize={14} fontWeight={600} mb="8px" ml="13px">
                    New Connection Name
                  </Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={selectedApp.name}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Box>

                <Box>
                  <Typography
                    sx={{
                      ml: '13px',
                      fontSize: '14px',
                      fontWeight: '600',
                      width: '100%',
                    }}
                  >
                    Id
                  </Typography>
                  <TextField
                    sx={{ mt: '8px' }}
                    fullWidth
                    type="text"
                    margin="dense"
                    variant="outlined"
                    placeholder="Enter Id here"
                    helperText={
                      <>
                        Enter your Id. You can create Id from{' '}
                        <Link
                          href="https://mailchimp.com/developer/marketing/guides/quick-start/"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: '#078DEE' }}
                        >
                          here
                        </Link>
                        .
                      </>
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip
                            title="Enter your ID"
                            arrow
                            placement="top"
                            sx={{
                              fontSize: '16px',
                            }}
                          >
                            <Iconify
                              icon="material-symbols:info-outline"
                              style={{ width: 20, height: 20 }}
                            />
                          </Tooltip>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>

                <Box>
                  <Typography
                    sx={{
                      ml: '13px',
                      fontSize: '14px',
                      fontWeight: '600',
                      width: '100%',
                    }}
                  >
                    Key
                  </Typography>
                  <TextField
                    sx={{ mt: '8px' }}
                    fullWidth
                    type="text"
                    margin="dense"
                    variant="outlined"
                    placeholder="Enter Key here"
                    helperText={
                      <>
                        Enter your Key. You can create Key from{' '}
                        <Link
                          href="https://mailchimp.com/developer/marketing/guides/quick-start/"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: '#078DEE' }}
                        >
                          here
                        </Link>
                        .
                      </>
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip
                            title="Enter your Key"
                            arrow
                            placement="top"
                            sx={{
                              fontSize: '16px',
                            }}
                          >
                            <Iconify
                              icon="material-symbols:info-outline"
                              style={{ width: 20, height: 20 }}
                            />
                          </Tooltip>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </Box>
            </Box>

            <Box
              mt={3}
              sx={{
                gap: 2,
                display: 'flex',
              }}
            >
              <Button
                size="medium"
                variant="contained"
                color="primary"
                startIcon={<Iconify icon="fa6-solid:plug" />}
              >
                Connect
              </Button>

              <Button size="medium" onClick={onClose} variant="outlined" color="primary">
                Cancel
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
