// // import TableRow from '@mui/material/TableRow';
// // import TableCell from '@mui/material/TableCell';

// // import { EmptyContent } from '../empty-content';

// // // ----------------------------------------------------------------------

// // export function TableNoData({ title, subTitle, notFound, sx }) {
// //   return (
// //     <TableRow>
// //       {notFound ? (
// //         <TableCell colSpan={12}>
// //           {/* <EmptyContent filled sx={{ py: 10, ...sx }} /> */}
// //           <EmptyContent title={title} description={subTitle} filled sx={{ py: 10, ...sx }} />
// //         </TableCell>
// //       ) : (
// //         <TableCell colSpan={12} sx={{ p: 0 }} />
// //       )}
// //     </TableRow>
// //   );
// // }

// // ----------------------------------------------------------------------

// import React from 'react';

// import { Link, Tooltip } from '@mui/material';
// import TableRow from '@mui/material/TableRow';
// import TableCell from '@mui/material/TableCell';

// import { EmptyContent } from '../empty-content';

// const LearnMoreLink = ({ link, children, tooltipTitle }) => {
//   if (!link) return null;

//   const linkComponent = (
//     <Link
//       style={{ color: '#078DEE', cursor: 'pointer', marginLeft: 3 }}
//       underline="always"
//       href={link}
//       target="_blank"
//       rel="noopener noreferrer"
//     >
//       {children || 'Learn more'}
//     </Link>
//   );

//   // If tooltip title is provided, wrap the link in a Tooltip
//   if (tooltipTitle) {
//     return (
//       <Tooltip title={tooltipTitle} arrow placement="top">
//         {linkComponent}
//       </Tooltip>
//     );
//   }

//   // If no tooltip, return the link as is
//   return linkComponent;
// };

// export function TableNoData({
//   title,
//   subTitle,
//   learnMoreText = 'Click for more details',
//   learnMoreLink,
//   tooltipTitle, // New prop for tooltip
//   notFound,
//   sx,
// }) {
//   return (
//     <TableRow>
//       {notFound ? (
//         <TableCell colSpan={12}>
//           <EmptyContent
//             title={title}
//             description={
//               <>
//                 {subTitle}
//                 {learnMoreLink && (
//                   <LearnMoreLink link={learnMoreLink} tooltipTitle={tooltipTitle}>
//                     {learnMoreText}
//                   </LearnMoreLink>
//                 )}
//               </>
//             }
//             filled
//             sx={{ py: 10, ...sx }}
//           />
//         </TableCell>
//       ) : (
//         <TableCell colSpan={12} sx={{ p: 0 }} />
//       )}
//     </TableRow>
//   );
// }

import React from 'react';

import { Link, Tooltip } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import { EmptyContent } from '../empty-content';

const LearnMoreLink = ({ link, children, tooltipTitle }) => {
  if (!link) return null;

  const linkComponent = (
    <Link
      style={{ color: '#078DEE', cursor: 'pointer', marginLeft: 3 }}
      underline="always"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children || 'Learn more'}
    </Link>
  );

  // If tooltip title is provided, wrap the link in a Tooltip
  if (tooltipTitle) {
    return (
      <Tooltip title={tooltipTitle} arrow placement="top">
        {linkComponent}
      </Tooltip>
    );
  }

  // If no tooltip, return the link as is
  return linkComponent;
};

export function TableNoData({
  title,
  subTitle,
  additionalSubTitle, // New prop for additional description
  learnMoreText = 'Click for more details',
  learnMoreLink,
  tooltipTitle,
  notFound,
  sx,
}) {
  return (
    <TableRow>
      {notFound ? (
        <TableCell colSpan={12}>
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
        </TableCell>
      ) : (
        <TableCell colSpan={12} sx={{ p: 0 }} />
      )}
    </TableRow>
  );
}
