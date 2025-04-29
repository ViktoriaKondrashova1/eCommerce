import { Button, ConfigProvider } from 'antd'

const theme = {
  token: {
    colorPrimary: '#61d627',
  },
}

function App() {
  return (
    <ConfigProvider theme={theme}>
      <Button type="primary">Primary Button</Button>
      {' '}
    </ConfigProvider>
  )
}

export default App
