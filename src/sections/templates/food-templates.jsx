import {
  Box,
  Button,
  MenuItem,
  MenuList,
  TextField,
  Pagination,
  Typography,
  InputAdornment,
  paginationClasses,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import ChatBox from 'src/components/chat-box/chat-box';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import Image1 from '../../assets/images/chatImage/imagechat.png';
// import Image2 from '../../assets/images/chatImage/Video.png';

export default function FoodTemplatesRender() {
  const popover = usePopover();
  const confirm = useBoolean();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Typography sx={{ fontSize: 18, fontWeight: 600 }}>Food</Typography>
      <Box display="flex" justifyContent="space-between">
        <TextField
          // value={searchContacts.query}
          // onChange={(event) => handleSearchContacts(event.target.value)}
          placeholder="Search templates..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
          sx={{ mt: 2.5 }}
        />
        <Button
          disableRipple
          color="inherit"
          onClick={popover.onOpen}
          endIcon={
            <Iconify
              icon={popover.open ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
            />
          }
          sx={{ fontWeight: 'fontWeightSemiBold' }}
        >
          Sort by:
          <Box
            component="span"
            sx={{ ml: 0.5, fontWeight: 'fontWeightBold', textTransform: 'capitalize' }}
          >
            dfdf
          </Box>
        </Button>

        <CustomPopover
          open={popover.open}
          anchorEl={popover.anchorEl}
          onClose={popover.onClose}
          // slotProps={{ arrow: { placement: 'right-top' } }}
        >
          <MenuList>
            <MenuItem>Latest</MenuItem>
            <MenuItem>Popular</MenuItem>

            <MenuItem>Oldest</MenuItem>
          </MenuList>
        </CustomPopover>
      </Box>
      <Box
        sx={{ mt: '24px' }}
        gap={3}
        display="grid"
        gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
      >
        <ChatBox
          coverSrc={Image1}
          showImage
          text={
            <>
              <span style={{ fontWeight: '600' }}>{` Hi {{1}}! 🎧🛒`} </span> <br /> <br />
              {`  Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌`}
              <br /> <br />
              {` Order Details:`}
              <br />
              {` Product: {{2}}`}
              <br />
              {`Quantity: {{3}}`}
              <br />
              {`Order ID: {{4}}`}
              <br />
              {`Delivery Address: {{5}}`}
              <br />
              {`Estimated Delivery Date: {{6}}`}
            </>
          }
          showLinks
          showVisit
        />
        <ChatBox
          coverSrc={Image1}
          showImage
          text={
            <>
              <span style={{ fontWeight: '600' }}>{` Hi {{1}}! 🎧🛒`} </span> <br /> <br />
              {`  Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌`}
              <br /> <br />
              {` Order Details:`}
              <br />
              {`Product: {{2}}
      Quantity: {{3}}
      Order ID: {{4}}
      Delivery Address: {{5}}
      Estimated Delivery Date: {{6}}`}
            </>
          }
          showLinks
          showVisit
          showCall
          showCoupon
        />
        <ChatBox
          text={
            <>
              <span style={{ fontWeight: '600' }}>{` Hi {{1}}! 🎧🛒`} </span> <br /> <br />
              {`  Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌`}
              <br /> <br />
              {` Order Details:`}
              <br />
              {`Product: {{2}}
      Quantity: {{3}}
      Order ID: {{4}}
      Delivery Address: {{5}}
      Estimated Delivery Date: {{6}}`}
            </>
          }
        />
        <ChatBox
          text={
            <>
              <span style={{ fontWeight: '600' }}>{` Hi {{1}}! 🎧🛒`} </span> <br /> <br />
              {`  Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌`}
              <br /> <br />
              {` Order Details:`}
              <br />
              {`Product: {{2}}
      Quantity: {{3}}
      Order ID: {{4}}
      Delivery Address: {{5}}
      Estimated Delivery Date: {{6}}`}
            </>
          }
        />
        <ChatBox
          text={
            <>
              <span style={{ fontWeight: '600' }}>{` Hi {{1}}! 🎧🛒`} </span> <br /> <br />
              {`  Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌`}
              <br /> <br />
              {` Order Details:`}
              <br />
              {`Product: {{2}}
      Quantity: {{3}}
      Order ID: {{4}}
      Delivery Address: {{5}}
      Estimated Delivery Date: {{6}Product: {{2}}
      Quantity: {{3}}
      Order ID: {{4}}
      Delivery Address: {{5}}
      Estimated Delivery Date: {{6}}Product: {{2}}
      Quantity: {{3}}
      Order ID: {{4}}
      Delivery Address: {{5}}
      Estimated Delivery Date: {{6}}Product: {{2}}
      Quantity: {{3}}
      Order ID: {{4}}
      Delivery Address: {{5}}
      Estimated Delivery Date: {{6}}}`}
            </>
          }
        />
        <ChatBox
          text={
            <>
              <span style={{ fontWeight: '600' }}>{` Hi {{1}}! 🎧🛒`} </span> <br /> <br />
              {`  Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌`}
              <br /> <br />
              {` Order Details:`}
              <br />
              {`Product: {{2}}
      Quantity: {{3}}
      Order ID: {{4}}
      Delivery Address: {{5}}
      Estimated Delivery Date: {{6}}`}
            </>
          }
        />
      </Box>

      <Pagination
        count={8}
        sx={{
          mt: { xs: 5, md: 8 },
          [`& .${paginationClasses.ul}`]: { justifyContent: 'center' },
        }}
      />
    </Box>
  );
}
