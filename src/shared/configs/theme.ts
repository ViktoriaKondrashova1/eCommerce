import type { ThemeConfig } from 'antd'

export const theme = {
  token: {
    colorPrimary: '#001529',
  },
  components: {
    Notification: {
      colorError: '#ff4d4f',
      fontSize: 16,
    },
    Button: {
      colorPrimaryTextHover: '#fff',
    },
  },

} satisfies ThemeConfig
