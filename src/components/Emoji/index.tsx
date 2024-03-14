import React from 'react';

type Props = {
  emoji: string;
};

const Emoji: React.FC<Props> = ({ emoji }) => {
  return (
    <article className="block w-10 h-10 p-px m-1.5 grid place-content-center hover:duration-700 cursor-pointer hover:w-11 hover:h-11 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      {emoji}
    </article>
  );
};

export default Emoji;
