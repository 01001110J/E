import React, { useContext } from 'react';

import { EmojiContext } from '@context/index';

type Props = {
  emoji: string;
  index: number;
};

const Emoji: React.FC<Props> = ({ emoji, index }) => {
  const { copyEmoji } = useContext(EmojiContext);
  
  return (
    <article
      onClick={() => copyEmoji(emoji)}
      className="emoji w-10 h-10 p-px m-1.5 grid place-content-center transition-transform transform hover:scale-125 cursor-pointer bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      style={{ animationDelay: `${index * 10}ms` }}
    >
      {emoji}
    </article>
  );
};

export default Emoji;
