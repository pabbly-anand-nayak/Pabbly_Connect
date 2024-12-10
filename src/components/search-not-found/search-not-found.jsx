// import { Card } from '@mui/material';
// import Typography from '@mui/material/Typography';

// import { EmptyContent } from '../empty-content';

// // ----------------------------------------------------------------------

// export function SearchNotFound({ query, sx, ...other }) {
//   if (!query) {
//     return (
//       <Typography variant="body2" sx={sx}>
//         Please enter keywords
//       </Typography>
//     );
//   }

//   return (
//     <>
//       {/* <Box sx={{ textAlign: 'center', px: 3, borderRadius: 1.5, ...sx }} {...other}> */}
//       {/* <Box sx={{ mb: 1, typography: 'h6' }}>Not found</Box>

//       <Typography variant="body2">
//         No results found for &nbsp;
//         <strong>{`"${query}"`}</strong>
//         .
//         <br /> Try checking for typos or using complete words.
//       </Typography> */}
//       <Card
//         sx={{
//           p: '0px 24px 24px 24px',
//           height: 366,
//           boxShadow: 'none', // This removes the box-shadow
//         }}
//       >
//         <EmptyContent
//           title="Search Not Found!"
//           description={
//             <Typography
//               sx={{
//                 width: 360,
//                 whiteSpace: 'nowrap',
//                 overflow: 'hidden',
//                 textOverflow: 'ellipsis',
//               }}
//               fontSize="14px"
//               variant="body2"
//             >
//               No results found for &nbsp;
//               <strong>{`"${query}"`}</strong>
//             </Typography>
//           }
//           filled
//           sx={{ py: 10, ...sx }}
//         />
//       </Card>
//       {/* </Box> */}
//     </>
//   );
// }

import { Card } from '@mui/material';
import Typography from '@mui/material/Typography';

import { EmptyContent } from '../empty-content';
import LearnMoreLink from '../learn-more-link/learn-more-link';

// ----------------------------------------------------------------------

export function SearchNotFound({
  title,
  subTitle,
  additionalSubTitle, // New prop for additional description
  learnMoreText = 'Click for more details',
  learnMoreLink,
  tooltipTitle,
  notFound,
  query,
  sx,
  ...other
}) {
  if (!query) {
    return (
      <Typography variant="body2" sx={sx}>
        Please enter keywords
      </Typography>
    );
  }

  return (
    <Card
      sx={{
        p: '0px 24px 24px 24px',
        height: 366,
        boxShadow: 'none', // This removes the box-shadow
      }}
    >
      {/* <EmptyContent
        title="Search Not Found!"
        description={
          <Typography
            sx={{
              width: 360,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
            fontSize="14px"
            variant="body2"
          >
            No results found for &nbsp;
            <strong>{`"${query}"`}</strong>
          </Typography>
        }
        filled
        sx={{ py: 10, ...sx }}
      /> */}

      <EmptyContent
        title={title}
        description={
          <div style={{ fontSize: '14px' }}>
            {subTitle}
            {learnMoreLink && (
              <LearnMoreLink link={learnMoreLink} tooltipTitle={tooltipTitle}>
                {learnMoreText}
              </LearnMoreLink>
            )}
            {additionalSubTitle && <div style={{ marginTop: '8px' }}>{additionalSubTitle}</div>}
          </div>
        }
        filled
        sx={{ py: 10, ...sx }}
      />
    </Card>
  );
}
