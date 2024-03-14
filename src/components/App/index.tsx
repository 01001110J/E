import EmojiProvider from '@context/index';
import { Search, Panel, Toast } from '@components/index';

const App = () => {
  return (
    <EmojiProvider>
      <Search />
      <Panel />
      <Toast />
    </EmojiProvider>
  );
};

export default App;
