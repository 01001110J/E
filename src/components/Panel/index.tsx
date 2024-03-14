import { useContext } from 'react';
import { motion } from 'framer-motion';

import { Emoji } from '@components/index';
import { EmojiContext } from '@context/index';

const variants = {
  initial: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  }
};

const Panel = () => {
  const { emojis } = useContext(EmojiContext);

  return (
    <motion.section
      className="flex flex-wrap justify-center w-full px-4 mt-2"
      variants={variants}
      initial="initial"
      animate="animate"
    >
      {emojis.map(({ emoji }) => (
        <Emoji emoji={emoji} key={emoji} />
      ))}
    </motion.section>
  );
};

export default Panel;
