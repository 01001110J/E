import React, { useContext } from 'react';
import { motion } from 'framer-motion';

import { EmojiContext } from '@context/index';

type Props = {
  emoji: string;
};

const variants = {
  initial: {
    opacity: 0,
    y: -50,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
};

const Emoji: React.FC<Props> = ({ emoji }) => {
  const { copyEmoji } = useContext(EmojiContext);
  
  return (
    <motion.article
      onClick={() => copyEmoji(emoji)}
      className="w-10 h-10 p-px m-1.5 grid place-content-center cursor-pointer bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      variants={variants}
      initial="initial"
      animate="animate"
      whileHover={{ scale: 1.2 }}
    >
      {emoji}
    </motion.article>
  );
};

export default Emoji;
