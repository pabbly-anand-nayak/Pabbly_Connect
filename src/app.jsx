import 'src/global.css';

// ----------------------------------------------------------------------

import { Provider } from 'react-redux';

import { Router } from 'src/routes/sections';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import { ThemeProvider } from 'src/theme/theme-provider';

import { ProgressBar } from 'src/components/progress-bar';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import { SettingsDrawer, defaultSettings, SettingsProvider } from 'src/components/settings';

import { AuthProvider } from 'src/auth/context/jwt';

import store from './redux/store'; // Adjust the path if necessary
import { SnackbarProvider } from './redux/snackbarProvider/SnackbarProvider';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <Provider store={store}>
      <AuthProvider>
        <SettingsProvider settings={defaultSettings}>
          <ThemeProvider>
            <SnackbarProvider>
              <MotionLazy>
                <ProgressBar />
                <SettingsDrawer />
                <Router />
              </MotionLazy>
            </SnackbarProvider>
          </ThemeProvider>
        </SettingsProvider>
      </AuthProvider>
    </Provider>
  );
}
