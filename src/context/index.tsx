import React, { ReactNode, createContext, useEffect, useState } from 'react';

const filePath = 'emojis.json';

interface EmojiType {
  emoji: string;
  category: string;
  keywords: string[];
}

interface ContextType {
  emojis: EmojiType[];
}

interface Props {
  children: ReactNode;
}

export const EmojiContext = createContext<ContextType | undefined>(undefined);

const EmojiProvider: React.FC<Props> = ({ children }) => {
  const [emojis, setEmojis] = useState<EmojiType[]>([]);

  const fetchEmojis = () => {
    fetch(filePath)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data: EmojiType[]) => {
        console.log(data);
        setEmojis(data);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  useEffect(() => {
    fetchEmojis();
  }, []);

  return <EmojiContext.Provider value={{ emojis }}>{children}</EmojiContext.Provider>;
};

export default EmojiProvider;
