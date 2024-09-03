import { toast } from 'sonner';
import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router';
import { useState, useCallback } from 'react';
import { useForm, FormProvider, useFieldArray } from 'react-hook-form';

import {
  Box,
  Card,
  Radio,
  Stack,
  Button,
  Divider,
  Tooltip,
  MenuItem,
  TextField,
  CardHeader,
  RadioGroup,
  Typography,
  useMediaQuery,
  InputAdornment,
  FormControlLabel,
} from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import { Form } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';
import FileUpload from 'src/components/upload/upload';
import ChatBox from 'src/components/chat-box/chat-box';
import PageHeader from 'src/components/page-header/page-header';

import Image1 from '../../assets/images/chatImage/imagechat.png';
import { TEMPLATE_LANGUAGES } from '../../assets/data/template-languages';

export default function AddTemplate() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Template Cateogry List Events

  const [categorylist, setCategorytList] = useState('Marketing');

  const handleChangeCategoryList = useCallback((event) => {
    setCategorytList(event.target.value);
  }, []);

  const CATEGORYLISTS = [
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Utility', label: 'Utility' },
    { value: 'Authentication', label: 'Authentication' },
  ];

  // Country code Events

  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeLanguage = useCallback((event) => {
    setSelectedLanguage(event.target.value);
  }, []);

  //   Template Type radio controls
  const [templateType, setTemplateType] = useState('text');

  const handleTemplateTypeChange = (event) => {
    setTemplateType(event.target.value);
  };

  //   Interactive Action radio controls
  const [actionType, setaActionType] = useState('none');

  const handleActionTypeChange = (event) => {
    setaActionType(event.target.value);
  };

  //   Quick Reply action type

  const isTabletOrMobile = useMediaQuery(theme.breakpoints.down('md'));

  const methods = useForm({
    defaultValues: {
      items: [{ title: '', description: '' }],
      callToAction1Urls: [{ label: '', url: '' }],
      callToAction2PhoneNumbers: [{ label: '', phoneNumber: '' }],
      couponCodes: [{ code: '', description: '' }],
    },
  });

  const { control } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const handleAdd = () => {
    append({
      title: '',
      description: '',
    });
  };

  const handleRemove = (index) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  // Call to Action 1 (URL) Action type

  const {
    fields: callToAction1Fields,
    append: appendCallToAction1,
    remove: removeCallToAction1,
  } = useFieldArray({
    control,
    name: 'callToAction1Urls',
  });

  const handleAddCallToAction1 = () => {
    appendCallToAction1({
      label: '',
      url: '',
    });
  };

  const handleRemoveCallToAction1 = (index) => {
    if (callToAction1Fields.length > 1) {
      removeCallToAction1(index);
    }
  };

  // Call to Action 2 (Phone Number) Action Type

  const {
    fields: callToAction2Fields,
    append: appendCallToAction2,
    remove: removeCallToAction2,
  } = useFieldArray({
    control,
    name: 'callToAction2PhoneNumbers',
  });

  const handleAddCallToAction2 = () => {
    appendCallToAction2({
      label: '',
      phoneNumber: '',
    });
  };

  const handleRemoveCallToAction2 = (index) => {
    if (callToAction2Fields.length > 1) {
      removeCallToAction2(index);
    }
  };

  // Coupon Code Action Type

  const {
    fields: couponCodeFields,
    append: appendCouponCode,
    remove: removeCouponCode,
  } = useFieldArray({
    control,
    name: 'couponCodes',
  });

  const handleAddCouponCode = () => {
    appendCouponCode({
      code: '',
      description: '',
    });
  };

  const handleRemoveCouponCode = (index) => {
    if (couponCodeFields.length > 1) {
      removeCouponCode(index);
    }
  };

  // Handle form submission logic here
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  // Submit and Cancel Button Functions
  const navigate = useNavigate();

  const handleCancel = () => {
    // Replace '/your-page' with the path you want to navigate to
    navigate('/app/template');
  };

  const showToast = () => {
    toast.success('Template Submitted Successfully!');
  };

  const addTemplate = () => {
    showToast();
    navigate('/app/template');
  };

  return (
    <DashboardContent maxWidth="xl">
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center',
          justifyContent: 'space-between',
          mb: 0,
        }}
      >
        <PageHeader
          title="New Template"
          Subheading="Create new template as per your needs."
          link_added="#"
        />
      </Box>
      <Box
        sx={{ mt: '24px', flexWrap: { xs: 'wrap', sm: 'nowrap', md: 'nowrap' } }}
        gap={3}
        display="flex"
      >
        <Card sx={{ width: { md: '90%', xs: '100%', sm: '90%' } }}>
          <CardHeader title="Add New Template" sx={{ mb: 3 }} />
          <Divider />
          <FormProvider>
            <Form onSubmit={handleSubmit}>
              {/* Template Name */}
              <FormControlLabel
                control={
                  <TextField
                    fullWidth
                    type="text"
                    margin="dense"
                    variant="outlined"
                    label="Template Name"
                    helperText="Enter the name of the template."
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip
                            title="Enter the name of the template."
                            arrow
                            placement="top"
                            sx={{
                              fontSize: '16px', // Adjust the font size as needed
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
                }
                sx={{ width: '100%', padding: '24px 24px 24px 24px', mr: 0, ml: 0 }}
              />
              {/* Template Category */}

              <FormControlLabel
                control={
                  <TextField
                    sx={{ width: '100%' }}
                    id="select-currency-label-x"
                    variant="outlined"
                    select
                    fullWidth
                    label="Select Template Category"
                    value={categorylist}
                    onChange={handleChangeCategoryList}
                    helperText="Select template category."
                    InputLabelProps={{ htmlFor: `outlined-select-currency-label` }}
                    inputProps={{ id: `outlined-select-currency-label` }}
                  >
                    {CATEGORYLISTS.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                }
                sx={{ width: '100%', padding: '0px 24px 24px 24px', mr: 0, ml: 0 }}
              />
              {/* Template Language */}

              <FormControlLabel
                control={
                  <TextField
                    sx={{ width: '100%' }}
                    id="select-language-label"
                    variant="outlined"
                    select
                    fullWidth
                    label="Select Language (Required)"
                    value={selectedLanguage}
                    onChange={handleChangeLanguage}
                    onClick={handleClick} // Open menu on click
                    helperText="Select the language for the template."
                    InputLabelProps={{ htmlFor: 'outlined-select-language-label' }}
                    inputProps={{ id: 'outlined-select-language-label' }}
                    SelectProps={{
                      MenuProps: {
                        PaperProps: {
                          style: {
                            maxHeight: 400, // Adjust height as needed
                            width: '20ch', // Adjust width as needed
                          },
                        },
                      },
                    }}
                  >
                    {TEMPLATE_LANGUAGES.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                }
                sx={{ width: '100%', padding: '0px 24px 24px 24px', mr: 0, ml: 0 }}
              />
              {/* Template Type */}

              <Box sx={{ width: '100%', padding: '0px 24px 24px 24px', mr: 0, ml: 0 }}>
                <Typography variant="h7" sx={{ fontSize: '14px', fontWeight: '600' }}>
                  Template Type
                </Typography>
                <RadioGroup
                  sx={{ mt: '24px' }}
                  row
                  value={templateType}
                  onChange={handleTemplateTypeChange}
                >
                  <FormControlLabel value="text" control={<Radio size="small" />} label="Text" />
                  <FormControlLabel value="image" control={<Radio size="small" />} label="Image" />
                  <FormControlLabel value="video" control={<Radio size="small" />} label="Video" />
                  <FormControlLabel
                    value="document"
                    control={<Radio size="small" />}
                    label="Document"
                  />
                  <FormControlLabel
                    value="location"
                    control={<Radio size="small" />}
                    label="Location"
                  />
                  <FormControlLabel
                    value="carousel"
                    control={<Radio size="small" />}
                    label="Carousel"
                  />
                  <FormControlLabel
                    value="limited_time_offer"
                    control={<Radio size="small" />}
                    label="Limited Time Offer"
                  />
                </RadioGroup>

                {templateType === 'text' && (
                  <FormControlLabel
                    control={
                      <TextField
                        fullWidth
                        type="text"
                        margin="dense"
                        variant="outlined"
                        label="Template Header (optional)"
                        helperText="You're allowed a maximum of 60 characters."
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Tooltip
                                title="You're allowed a maximum of 60 characters."
                                arrow
                                placement="top"
                                sx={{
                                  fontSize: '16px', // Adjust the font size as needed
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
                    }
                    sx={{ width: '100%', padding: '24px 0px 0px 0px', mr: 0, ml: 0 }}
                  />
                )}
                {templateType === 'image' && (
                  <>
                    <Divider sx={{ borderStyle: 'dashed', mt: '24px' }} />
                    <TextField
                      sx={{ mt: '24px' }}
                      fullWidth
                      type="text"
                      margin="dense"
                      variant="outlined"
                      label="Template Header File URL"
                      helperText="Size < 5MB, Accepted formats : .png or .jpeg"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Tooltip
                              title="Enter header URL"
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
                    <Typography
                      sx={{
                        fontSize: '14px',
                        fontWeight: '600',
                        width: '100%',
                        padding: '24px 0px 24px 0px',
                        mr: 0,
                        ml: 0,
                      }}
                    >
                      OR
                    </Typography>
                    <FileUpload />
                    <Divider sx={{ borderStyle: 'dashed', mt: '24px' }} />
                  </>
                )}
                {templateType === 'video' && (
                  <>
                    <Divider sx={{ borderStyle: 'dashed', mt: '24px' }} />
                    <TextField
                      sx={{ mt: '24px' }}
                      fullWidth
                      type="text"
                      margin="dense"
                      variant="outlined"
                      label="Template Header File URL"
                      helperText="Size < 5MB, Accepted formats : .mp4 or .mkv"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Tooltip
                              title="Enter header URL"
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
                    <Typography
                      sx={{
                        fontSize: '14px',
                        fontWeight: '600',
                        width: '100%',
                        padding: '24px 0px 24px 0px',
                        mr: 0,
                        ml: 0,
                      }}
                    >
                      OR
                    </Typography>
                    <FileUpload />
                    <Divider sx={{ borderStyle: 'dashed', mt: '24px' }} />
                  </>
                )}
                {templateType === 'document' && (
                  <>
                    <Divider sx={{ borderStyle: 'dashed', mt: '24px' }} />
                    <TextField
                      sx={{ mt: '24px' }}
                      fullWidth
                      type="text"
                      margin="dense"
                      variant="outlined"
                      label="Template Header File URL"
                      helperText="Size < 5MB"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Tooltip
                              title="Enter header URL"
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
                    <Typography
                      sx={{
                        fontSize: '14px',
                        fontWeight: '600',
                        width: '100%',
                        padding: '24px 0px 24px 0px',
                        mr: 0,
                        ml: 0,
                      }}
                    >
                      OR
                    </Typography>
                    <FileUpload />
                    <Divider sx={{ borderStyle: 'dashed', mt: '24px' }} />
                  </>
                )}
                {templateType === 'location' && (
                  <FormControlLabel
                    control={
                      <TextField
                        fullWidth
                        type="text"
                        margin="dense"
                        variant="outlined"
                        label="Location URl"
                        helperText="You're allowed a maximum of 60 characters."
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Tooltip
                                title="You're allowed a maximum of 60 characters."
                                arrow
                                placement="top"
                                sx={{
                                  fontSize: '16px', // Adjust the font size as needed
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
                    }
                    sx={{ width: '100%', padding: '24px 0px 0px 0px', mr: 0, ml: 0 }}
                  />
                )}
                {templateType === 'carousel' && (
                  <FormControlLabel
                    control={
                      <TextField
                        fullWidth
                        type="text"
                        margin="dense"
                        variant="outlined"
                        label="Coupon Code"
                        helperText="You're allowed a maximum of 60 characters."
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Tooltip
                                title="You're allowed a maximum of 60 characters."
                                arrow
                                placement="top"
                                sx={{
                                  fontSize: '16px', // Adjust the font size as needed
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
                    }
                    sx={{ width: '100%', padding: '24px 0px 0px 0px', mr: 0, ml: 0 }}
                  />
                )}
                {templateType === 'limited_time_offer' && (
                  <FormControlLabel
                    control={
                      <TextField
                        fullWidth
                        type="text"
                        margin="dense"
                        variant="outlined"
                        label="Location URl"
                        helperText="You're allowed a maximum of 60 characters."
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Tooltip
                                title="You're allowed a maximum of 60 characters."
                                arrow
                                placement="top"
                                sx={{
                                  fontSize: '16px', // Adjust the font size as needed
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
                    }
                    sx={{ width: '100%', padding: '24px 0px 0px 0px', mr: 0, ml: 0 }}
                  />
                )}
              </Box>
              {/* Template Format */}

              <FormControlLabel
                control={
                  <TextField
                    fullWidth
                    type="text"
                    margin="dense"
                    rows={4}
                    multiline
                    variant="outlined"
                    label="Template Format"
                    helperText="Use text formatting - *bold* , _italic_ & ~strikethrough~. For example -  Hello {{1}}, your code will expire in {{2}} mins.. You're allowed a maximum of 1024 characters."
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip
                            title="Use text formatting - *bold* , _italic_ & ~strikethrough~. For example -  Hello {{1}}, your code will expire in {{2}} mins.. You're allowed a maximum of 1024 characters."
                            arrow
                            placement="top"
                            sx={{
                              fontSize: '16px', // Adjust the font size as needed
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
                }
                sx={{ width: '100%', padding: '0px 24px 24px 24px', mr: 0, ml: 0 }}
              />
              {/* Template Footer */}

              <FormControlLabel
                control={
                  <TextField
                    fullWidth
                    type="text"
                    margin="dense"
                    variant="outlined"
                    label="Template Footer"
                    helperText="You're allowed a maximum of 60 characters."
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip
                            title="You're allowed a maximum of 60 characters."
                            arrow
                            placement="top"
                            sx={{
                              fontSize: '16px', // Adjust the font size as needed
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
                }
                sx={{ width: '100%', padding: '0px 24px 24px 24px', mr: 0, ml: 0 }}
              />
              {/* Template Interactive Actions */}

              <Box sx={{ width: '100%', padding: '0px 24px 24px 24px' }}>
                <Typography variant="h7" sx={{ fontSize: '14px', fontWeight: '600' }}>
                  Interactive Actions
                </Typography>
                <RadioGroup
                  sx={{ mt: '24px', ml: '-10px' }}
                  row
                  value={actionType}
                  onChange={handleActionTypeChange}
                >
                  {[
                    { value: 'none', label: 'None' },
                    { value: 'call_to_actions', label: 'Call To Actions' },
                    { value: 'quick_replies', label: 'Quick Replies' },
                    { value: 'all', label: 'All' },
                  ].map((option) => (
                    <FormControlLabel
                      key={option.value}
                      value={option.value}
                      control={<Radio size="small" />}
                      label={option.label}
                      sx={{
                        m: 0,
                        '& .MuiFormControlLabel-label': {
                          fontSize: '14px',
                        },
                      }}
                    />
                  ))}
                </RadioGroup>

                {actionType === 'none' && <Box mt={2}>No Action</Box>}
                {actionType === 'call_to_actions' && (
                  <Box>
                    <Box mt={3}>
                      <Box sx={{ mr: 0 }}>
                        <Box sx={{ display: 'flex', mb: 3 }}>
                          <Typography sx={{ mb: 0, fontWeight: 600, fontSize: '14px' }}>
                            Call To Action 1 (URL)
                          </Typography>
                        </Box>
                      </Box>
                      <Stack spacing={3}>
                        {callToAction1Fields.map((item, index) => (
                          <Stack key={item.id} spacing={isTabletOrMobile ? 1 : 0}>
                            <Stack
                              direction={{ xs: 'column', md: 'row' }}
                              spacing={2}
                              sx={{ width: 1 }}
                              alignItems="center"
                            >
                              <TextField
                                {...methods.register(`callToAction1Urls.${index}.label`)}
                                variant="outlined"
                                fullWidth
                                label="Enter URL"
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Tooltip
                                        title="You're allowed a maximum of 60 characters."
                                        arrow
                                        placement="top"
                                        sx={{
                                          fontSize: '16px', // Adjust the font size as needed
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
                              <TextField
                                {...methods.register(`callToAction1Urls.${index}.label`)}
                                variant="outlined"
                                fullWidth
                                label="Enter Button Title"
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Tooltip
                                        title="You're allowed a maximum of 60 characters."
                                        arrow
                                        placement="top"
                                        sx={{
                                          fontSize: '16px', // Adjust the font size as needed
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
                              <TextField
                                {...methods.register(`callToAction1Urls.${index}.label`)}
                                variant="outlined"
                                fullWidth
                                label="Enter Button Value"
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Tooltip
                                        title="You're allowed a maximum of 60 characters."
                                        arrow
                                        placement="top"
                                        sx={{
                                          fontSize: '16px', // Adjust the font size as needed
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

                              {!isTabletOrMobile && (
                                <Button
                                  size="small"
                                  sx={{ color: 'grey.600', minWidth: 'auto' }}
                                  onClick={() => handleRemoveCallToAction1(index)}
                                  disabled={callToAction1Fields.length === 1}
                                >
                                  <Iconify width={24} icon="solar:trash-bin-trash-bold" />
                                </Button>
                              )}
                            </Stack>
                            {isTabletOrMobile && (
                              <Box
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'flex-end',
                                  width: '100%',
                                }}
                              >
                                <Button
                                  size="small"
                                  sx={{ color: 'grey.600', minWidth: 'auto' }}
                                  onClick={() => handleRemoveCallToAction1(index)}
                                  disabled={callToAction1Fields.length === 1}
                                >
                                  <Iconify width={24} icon="solar:trash-bin-trash-bold" />
                                </Button>
                              </Box>
                            )}
                          </Stack>
                        ))}
                      </Stack>
                      <Button
                        size="medium"
                        variant="outlined"
                        color="primary"
                        startIcon={<Iconify icon="mingcute:add-line" />}
                        onClick={handleAddCallToAction1}
                        sx={{ mt: 3, alignSelf: 'flex-start' }}
                      >
                        URL
                      </Button>
                    </Box>
                    <Box mt={3}>
                      <Box sx={{ mr: 0 }}>
                        <Box sx={{ display: 'flex', mb: 3 }}>
                          <Typography sx={{ mb: 0, fontWeight: 600, fontSize: '14px' }}>
                            Call To Action 2 (Phone Number)
                          </Typography>
                        </Box>
                      </Box>
                      <Stack spacing={3}>
                        {callToAction2Fields.map((item, index) => (
                          <Stack key={item.id} spacing={isTabletOrMobile ? 1 : 0}>
                            <Stack
                              direction={{ xs: 'column', md: 'row' }}
                              spacing={2}
                              sx={{ width: 1 }}
                              alignItems="center"
                            >
                              <TextField
                                {...methods.register(`callToAction2PhoneNumbers.${index}.label`)}
                                variant="outlined"
                                fullWidth
                                label="Enter Phone Number"
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Tooltip
                                        title="You're allowed a maximum of 60 characters."
                                        arrow
                                        placement="top"
                                        sx={{
                                          fontSize: '16px', // Adjust the font size as needed
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
                              <TextField
                                {...methods.register(`callToAction2PhoneNumbers.${index}.label`)}
                                variant="outlined"
                                fullWidth
                                label="Enter Button Value"
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Tooltip
                                        title="You're allowed a maximum of 60 characters."
                                        arrow
                                        placement="top"
                                        sx={{
                                          fontSize: '16px', // Adjust the font size as needed
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
                              <TextField
                                {...methods.register(`callToAction2PhoneNumbers.${index}.label`)}
                                variant="outlined"
                                fullWidth
                                label="Enter Code"
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Tooltip
                                        title="You're allowed a maximum of 60 characters."
                                        arrow
                                        placement="top"
                                        sx={{
                                          fontSize: '16px', // Adjust the font size as needed
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
                              <TextField
                                {...methods.register(`callToAction2PhoneNumbers.${index}.label`)}
                                variant="outlined"
                                fullWidth
                                label="Enter Button Value"
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Tooltip
                                        title="You're allowed a maximum of 60 characters."
                                        arrow
                                        placement="top"
                                        sx={{
                                          fontSize: '16px', // Adjust the font size as needed
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

                              {!isTabletOrMobile && (
                                <Button
                                  size="small"
                                  sx={{ color: 'grey.600', minWidth: 'auto' }}
                                  onClick={() => handleRemoveCallToAction2(index)}
                                  disabled={callToAction2Fields.length === 1}
                                >
                                  <Iconify width={24} icon="solar:trash-bin-trash-bold" />
                                </Button>
                              )}
                            </Stack>
                            {isTabletOrMobile && (
                              <Box
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'flex-end',
                                  width: '100%',
                                }}
                              >
                                <Button
                                  size="small"
                                  sx={{ color: 'grey.600', minWidth: 'auto' }}
                                  onClick={() => handleRemoveCallToAction2(index)}
                                  disabled={callToAction2Fields.length === 1}
                                >
                                  <Iconify width={24} icon="solar:trash-bin-trash-bold" />
                                </Button>
                              </Box>
                            )}
                          </Stack>
                        ))}
                      </Stack>
                      <Button
                        size="medium"
                        variant="outlined"
                        color="primary"
                        startIcon={<Iconify icon="mingcute:add-line" />}
                        onClick={handleAddCallToAction2}
                        sx={{ mt: 3, alignSelf: 'flex-start' }}
                      >
                        Phone Number
                      </Button>
                    </Box>
                  </Box>
                )}
                {actionType === 'quick_replies' && (
                  <Box mt={3}>
                    <Box sx={{ mr: 0 }}>
                      <Box sx={{ display: 'flex', mb: 3 }}>
                        <Typography sx={{ mb: 0, fontWeight: 600, fontSize: '14px' }}>
                          Quick Replies
                        </Typography>
                      </Box>
                    </Box>
                    <Stack spacing={3}>
                      {fields.map((item, index) => (
                        <Stack key={item.id} spacing={isTabletOrMobile ? 1 : 0}>
                          <Stack
                            direction={{ xs: 'column', md: 'row' }}
                            spacing={2}
                            sx={{ width: 1 }}
                            alignItems="center"
                          >
                            <TextField
                              variant="outlined"
                              fullWidth
                              label="Enter Quick Reply"
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <Tooltip
                                      title="You're allowed a maximum of 60 characters."
                                      arrow
                                      placement="top"
                                      sx={{
                                        fontSize: '16px', // Adjust the font size as needed
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

                            {!isTabletOrMobile && (
                              <Button
                                size="small"
                                sx={{ color: 'grey.600', minWidth: 'auto' }}
                                onClick={() => handleRemove(index)}
                                disabled={fields.length === 1}
                              >
                                <Iconify width={24} icon="solar:trash-bin-trash-bold" />
                              </Button>
                            )}
                          </Stack>
                          {isTabletOrMobile && (
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                width: '100%',
                              }}
                            >
                              <Button
                                size="small"
                                sx={{ color: 'grey.600', minWidth: 'auto' }}
                                onClick={() => handleRemove(index)}
                                disabled={fields.length === 1}
                              >
                                <Iconify width={24} icon="solar:trash-bin-trash-bold" />
                              </Button>
                            </Box>
                          )}
                        </Stack>
                      ))}
                    </Stack>

                    <Button
                      size="medium"
                      variant="outlined"
                      color="primary"
                      startIcon={<Iconify icon="mingcute:add-line" />}
                      onClick={handleAdd}
                      sx={{ mt: 3, alignSelf: 'flex-start' }}
                    >
                      Add Quick Replies
                    </Button>
                  </Box>
                )}
                {actionType === 'all' && (
                  <Box>
                    <Box mt={3}>
                      <Box sx={{ mr: 0 }}>
                        <Box sx={{ display: 'flex', mb: 3 }}>
                          <Typography sx={{ mb: 0, fontWeight: 600, fontSize: '14px' }}>
                            Quick Replies
                          </Typography>
                        </Box>
                      </Box>
                      <Stack spacing={3}>
                        {fields.map((item, index) => (
                          <Stack key={item.id} spacing={isTabletOrMobile ? 1 : 0}>
                            <Stack
                              direction={{ xs: 'column', md: 'row' }}
                              spacing={2}
                              sx={{ width: 1 }}
                              alignItems="center"
                            >
                              <TextField variant="outlined" fullWidth label="Enter Quick Reply" />

                              {!isTabletOrMobile && (
                                <Button
                                  size="small"
                                  sx={{ color: 'grey.600', minWidth: 'auto' }}
                                  onClick={() => handleRemove(index)}
                                  disabled={fields.length === 1}
                                >
                                  <Iconify width={24} icon="solar:trash-bin-trash-bold" />
                                </Button>
                              )}
                            </Stack>
                            {isTabletOrMobile && (
                              <Box
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'flex-end',
                                  width: '100%',
                                }}
                              >
                                <Button
                                  size="small"
                                  sx={{ color: 'grey.600', minWidth: 'auto' }}
                                  onClick={() => handleRemove(index)}
                                  disabled={fields.length === 1}
                                >
                                  <Iconify width={24} icon="solar:trash-bin-trash-bold" />
                                </Button>
                              </Box>
                            )}
                          </Stack>
                        ))}
                      </Stack>

                      <Button
                        size="medium"
                        variant="outlined"
                        color="primary"
                        startIcon={<Iconify icon="mingcute:add-line" />}
                        onClick={handleAdd}
                        sx={{ mt: 3, alignSelf: 'flex-start' }}
                      >
                        Add Quick Replies
                      </Button>
                    </Box>
                    <Box mt={3}>
                      <Box sx={{ mr: 0 }}>
                        <Box sx={{ display: 'flex', mb: 3 }}>
                          <Typography sx={{ mb: 0, fontWeight: 600, fontSize: '14px' }}>
                            Call To Action 1 (URL)
                          </Typography>
                        </Box>
                      </Box>
                      <Stack spacing={3}>
                        {callToAction1Fields.map((item, index) => (
                          <Stack key={item.id} spacing={isTabletOrMobile ? 1 : 0}>
                            <Stack
                              direction={{ xs: 'column', md: 'row' }}
                              spacing={2}
                              sx={{ width: 1 }}
                              alignItems="center"
                            >
                              <TextField
                                {...methods.register(`callToAction1Urls.${index}.label`)}
                                variant="outlined"
                                fullWidth
                                label="Enter URL"
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Tooltip
                                        title="You're allowed a maximum of 60 characters."
                                        arrow
                                        placement="top"
                                        sx={{
                                          fontSize: '16px', // Adjust the font size as needed
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
                              <TextField
                                {...methods.register(`callToAction1Urls.${index}.label`)}
                                variant="outlined"
                                fullWidth
                                label="Enter Button Title"
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Tooltip
                                        title="You're allowed a maximum of 60 characters."
                                        arrow
                                        placement="top"
                                        sx={{
                                          fontSize: '16px', // Adjust the font size as needed
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
                              <TextField
                                {...methods.register(`callToAction1Urls.${index}.label`)}
                                variant="outlined"
                                fullWidth
                                label="Enter Button Value"
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Tooltip
                                        title="You're allowed a maximum of 60 characters."
                                        arrow
                                        placement="top"
                                        sx={{
                                          fontSize: '16px', // Adjust the font size as needed
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

                              {!isTabletOrMobile && (
                                <Button
                                  size="small"
                                  sx={{ color: 'grey.600', minWidth: 'auto' }}
                                  onClick={() => handleRemoveCallToAction1(index)}
                                  disabled={callToAction1Fields.length === 1}
                                >
                                  <Iconify width={24} icon="solar:trash-bin-trash-bold" />
                                </Button>
                              )}
                            </Stack>
                            {isTabletOrMobile && (
                              <Box
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'flex-end',
                                  width: '100%',
                                }}
                              >
                                <Button
                                  size="small"
                                  sx={{ color: 'grey.600', minWidth: 'auto' }}
                                  onClick={() => handleRemoveCallToAction1(index)}
                                  disabled={callToAction1Fields.length === 1}
                                >
                                  <Iconify width={24} icon="solar:trash-bin-trash-bold" />
                                </Button>
                              </Box>
                            )}
                          </Stack>
                        ))}
                      </Stack>
                      <Button
                        size="medium"
                        variant="outlined"
                        color="primary"
                        startIcon={<Iconify icon="mingcute:add-line" />}
                        onClick={handleAddCallToAction1}
                        sx={{ mt: 3, alignSelf: 'flex-start' }}
                      >
                        URL
                      </Button>
                    </Box>
                    <Box mt={3}>
                      <Box sx={{ mr: 0 }}>
                        <Box sx={{ display: 'flex', mb: 3 }}>
                          <Typography sx={{ mb: 0, fontWeight: 600, fontSize: '14px' }}>
                            Call To Action 2 (Phone Number)
                          </Typography>
                        </Box>
                      </Box>
                      <Stack spacing={3}>
                        {callToAction2Fields.map((item, index) => (
                          <Stack key={item.id} spacing={isTabletOrMobile ? 1 : 0}>
                            <Stack
                              direction={{ xs: 'column', md: 'row' }}
                              spacing={2}
                              sx={{ width: 1 }}
                              alignItems="center"
                            >
                              <TextField
                                {...methods.register(`callToAction2PhoneNumbers.${index}.label`)}
                                variant="outlined"
                                fullWidth
                                label="Enter Phone Number"
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Tooltip
                                        title="You're allowed a maximum of 60 characters."
                                        arrow
                                        placement="top"
                                        sx={{
                                          fontSize: '16px', // Adjust the font size as needed
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
                              <TextField
                                {...methods.register(`callToAction2PhoneNumbers.${index}.label`)}
                                variant="outlined"
                                fullWidth
                                label="Enter Button Value"
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Tooltip
                                        title="You're allowed a maximum of 60 characters."
                                        arrow
                                        placement="top"
                                        sx={{
                                          fontSize: '16px', // Adjust the font size as needed
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
                              <TextField
                                {...methods.register(`callToAction2PhoneNumbers.${index}.label`)}
                                variant="outlined"
                                fullWidth
                                label="Enter Code"
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Tooltip
                                        title="You're allowed a maximum of 60 characters."
                                        arrow
                                        placement="top"
                                        sx={{
                                          fontSize: '16px', // Adjust the font size as needed
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
                              <TextField
                                {...methods.register(`callToAction2PhoneNumbers.${index}.label`)}
                                variant="outlined"
                                fullWidth
                                label="Enter Button Value"
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Tooltip
                                        title="You're allowed a maximum of 60 characters."
                                        arrow
                                        placement="top"
                                        sx={{
                                          fontSize: '16px', // Adjust the font size as needed
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

                              {!isTabletOrMobile && (
                                <Button
                                  size="small"
                                  sx={{ color: 'grey.600', minWidth: 'auto' }}
                                  onClick={() => handleRemoveCallToAction2(index)}
                                  disabled={callToAction2Fields.length === 1}
                                >
                                  <Iconify width={24} icon="solar:trash-bin-trash-bold" />
                                </Button>
                              )}
                            </Stack>
                            {isTabletOrMobile && (
                              <Box
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'flex-end',
                                  width: '100%',
                                }}
                              >
                                <Button
                                  size="small"
                                  sx={{ color: 'grey.600', minWidth: 'auto' }}
                                  onClick={() => handleRemoveCallToAction2(index)}
                                  disabled={callToAction2Fields.length === 1}
                                >
                                  <Iconify width={24} icon="solar:trash-bin-trash-bold" />
                                </Button>
                              </Box>
                            )}
                          </Stack>
                        ))}
                      </Stack>
                      <Button
                        size="medium"
                        variant="outlined"
                        color="primary"
                        startIcon={<Iconify icon="mingcute:add-line" />}
                        onClick={handleAddCallToAction2}
                        sx={{ mt: 3, alignSelf: 'flex-start' }}
                      >
                        Phone Number
                      </Button>
                    </Box>
                    <Box mt={3}>
                      <Box sx={{ mr: 0 }}>
                        <Box sx={{ display: 'flex', mb: 3 }}>
                          <Typography sx={{ mb: 0, fontWeight: 600, fontSize: '14px' }}>
                            Coupon Code
                          </Typography>
                        </Box>
                      </Box>
                      <Stack spacing={3}>
                        {couponCodeFields.map((item, index) => (
                          <Stack key={item.id} spacing={isTabletOrMobile ? 1 : 0}>
                            <Stack
                              direction={{ xs: 'column', md: 'row' }}
                              spacing={2}
                              sx={{ width: 1 }}
                              alignItems="center"
                            >
                              <TextField
                                {...methods.register(`couponCodes.${index}.code`)}
                                variant="outlined"
                                fullWidth
                                label="Enter Coupon Code"
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Tooltip
                                        title="You're allowed a maximum of 60 characters."
                                        arrow
                                        placement="top"
                                        sx={{
                                          fontSize: '16px', // Adjust the font size as needed
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

                              {!isTabletOrMobile && (
                                <Button
                                  size="small"
                                  sx={{ color: 'grey.600', minWidth: 'auto' }}
                                  onClick={() => handleRemoveCouponCode(index)}
                                  disabled={couponCodeFields.length === 1}
                                >
                                  <Iconify width={24} icon="solar:trash-bin-trash-bold" />
                                </Button>
                              )}
                            </Stack>
                            {isTabletOrMobile && (
                              <Box
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'flex-end',
                                  width: '100%',
                                }}
                              >
                                <Button
                                  size="small"
                                  sx={{ color: 'grey.600', minWidth: 'auto' }}
                                  onClick={() => handleRemoveCouponCode(index)}
                                  disabled={couponCodeFields.length === 1}
                                >
                                  <Iconify width={24} icon="solar:trash-bin-trash-bold" />
                                </Button>
                              </Box>
                            )}
                          </Stack>
                        ))}
                      </Stack>
                      <Button
                        size="medium"
                        variant="outlined"
                        color="primary"
                        startIcon={<Iconify icon="mingcute:add-line" />}
                        onClick={handleAddCouponCode}
                        sx={{ mt: 3, alignSelf: 'flex-start' }}
                      >
                        Add Coupon Code
                      </Button>
                    </Box>
                  </Box>
                )}
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  width: '100%',
                  padding: '0px 24px 24px 24px',
                  mr: 0,
                  ml: 0,
                }}
              >
                <Button onClick={addTemplate} variant="contained" size="large" color="inherit">
                  Submit
                </Button>
                <Button onClick={handleCancel} variant="outlined" size="large" color="inherit">
                  Cancel
                </Button>
              </Box>
            </Form>
          </FormProvider>
        </Card>
        <Box>
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
        </Box>
      </Box>
    </DashboardContent>
  );
}
