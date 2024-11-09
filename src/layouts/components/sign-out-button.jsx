import { useCallback } from 'react';

import Button from '@mui/material/Button';

import { useRouter } from 'src/routes/hooks';

import { useAuthContext } from 'src/auth/hooks';
import { signOut } from 'src/auth/context/jwt/action';

// ----------------------------------------------------------------------

export function SignOutButton({ onClose, ...other }) {
  const router = useRouter();

  const { checkUserSession } = useAuthContext();

  const handleLogout = useCallback(async () => {
    try {
      await signOut();
      await checkUserSession?.();

      onClose?.();
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  }, [checkUserSession, onClose, router]);

  // return (
  //   <Button
  //     sx={{
  //       '[data-mui-color-scheme="light"] &': {
  //         color: 'rgba(var(--palette-primary-mainChannel) / 0.16)',
  //       },
  //       '[data-mui-color-scheme="dark"] &': {
  //         color: 'var(--palette-text-secondary)',
  //       },
  //     }}
  //     fullWidth
  //     variant="soft"
  //     size="large"
  //     color="primary"
  //     onClick={handleLogout}
  //     {...other}
  //   >
  //     Logout
  //   </Button>
  // );

  return (
    <Button
      sx={{
        '[data-mui-color-scheme="light"] &': {
          color: '#0351ab', // Black color for light mode
        },
        '[data-mui-color-scheme="dark"] &': {
          color: '#078DEE', // White color for dark mode
        },
      }}
      fullWidth
      variant="soft"
      size="large"
      color="primary"
      onClick={handleLogout}
      {...other}
    >
      Logout
    </Button>
  );
}
