// hooks/useThemeColor.ts

import { useColorScheme } from './useColorScheme';
import { Colors } from '../constants/Colors';

// Hook to get a theme-aware color with optional overrides
export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  return colorFromProps ?? Colors[theme][colorName];
}
