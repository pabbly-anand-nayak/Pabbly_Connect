import { useState } from 'react';

import { Box } from '@mui/material';

import TemplateList from './template-list';
import FoodTemplatesRender from './food-templates';
import EcommTemplatesRender from './ecommerce-templates';
// import FestivalTemplatesRender from './festivaltemplates';
// import HealthcareTemplatesRender from './healthcaretemplates';
// import SpecialOccasionsTemplatesRender from './specialoccasionstemplates';
// import TravelTemplatesRender from './traveltemplates';
// import ServicesTemplatesRender from './servicestemplates';
// import EducationTemplatesRender from './educationtemplates';

export default function ExploreTemplate() {
  const [selectedListItem, setSelectedListItem] = useState(0);

  const handleListItemSelect = (index) => {
    setSelectedListItem(index);
  };

  const renderSelectedTemplate = () => {
    switch (selectedListItem) {
      case 0:
        return <EcommTemplatesRender />;
      case 1:
        return <FoodTemplatesRender />;
      // case 2:
      //   return <FestivalTemplatesRender />;
      // case 3:
      //   return <HealthcareTemplatesRender />;
      // case 4:
      //   return <SpecialOccasionsTemplatesRender />;
      // case 5:
      //   return <TravelTemplatesRender />;
      // case 6:
      //   return <ServicesTemplatesRender />;
      // case 7:
      //   return <EducationTemplatesRender />;
      default:
        return <EcommTemplatesRender />;
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        gap: '40px',
        mt: '24px',
        flexDirection: {
          xs: 'column', // mobile
          sm: 'column', // tablet
          md: 'row', // desktop
        },
      }}
    >
      <TemplateList onItemSelect={handleListItemSelect} />
      {renderSelectedTemplate()}
    </Box>
  );
}
