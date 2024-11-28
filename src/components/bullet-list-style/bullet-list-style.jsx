// Common list style configuration
export const commonBulletListStyle = {
  paddingLeft: '8px',
  '[data-mui-color-scheme="light"] &': {
    color: 'grey.600',
  },
  '[data-mui-color-scheme="dark"] &': {
    color: 'var(--palette-text-secondary)',
  },
  fontSize: '12px',
};

export const listItemCustomStyle = {
  marginBottom: '8px',
  fontSize: '14px',
  fontWeight: '500',
  listStyleType: 'disc',
  listStylePosition: 'outside',
  color: 'grey.800',
};
