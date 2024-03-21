import { useContext } from 'react';

import { Emoji } from '@components/index';
import { EmojiContext } from '@context/index';

const Panel = () => {
  const { emojis, emojisHistory } = useContext(EmojiContext);

  return (
    <section className="flex flex-wrap justify-center w-full px-4 mt-2">
      <div className="flex flex-col w-full px-4 mb-3">
        <p className="ml-1.5">History</p>
        <div className="flex flex-wrap w-full">
          {emojisHistory.map((emoji, index) => (
            <Emoji emoji={emoji} key={emoji} index={index} />
          ))}
        </div>
      </div>

      {emojis.map(({ emoji }, index) => (
        <Emoji emoji={emoji} key={emoji} index={index} />
      ))}
    </section>
  );
};

export default Panel;
