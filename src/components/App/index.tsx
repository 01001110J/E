import EmojiProvider from '@context/index';
import { Search, Panel } from '@components/index';

const App = () => {
  return (
    <EmojiProvider>
      <Search />
      <Panel />
    </EmojiProvider>
  );
};

export default App;
