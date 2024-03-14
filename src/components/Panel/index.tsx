import { useContext } from 'react';
import { Emoji } from '@components/index';
import { EmojiContext } from '@context/index';

const Panel = () => {
  const { emojis } = useContext(EmojiContext);

  return (
    <section className="flex flex-wrap mx-4">
      {emojis.map(({ emoji }) => (
        <Emoji emoji={emoji} key={emoji} />
      ))}
    </section>
  );
};

export default Panel;
