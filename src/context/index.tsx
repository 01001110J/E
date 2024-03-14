import React, { ReactNode, createContext, useEffect, useState, useRef } from 'react';

const filePath = 'emojis.json';

interface EmojiType {
  emoji: string;
  category: string;
  keywords: string[];
}

interface ContextType {
  emojis: EmojiType[];
  showToast: boolean
  filterEmojis: (word:string) => void;
  copyEmoji: () => void;
}

interface Props {
  children: ReactNode;
}

export const EmojiContext = createContext<ContextType | undefined>(undefined);

const EmojiProvider: React.FC<Props> = ({ children }) => {
  const [emojis, setEmojis] = useState<EmojiType[]>([]);
  const [showToast, setShowToast] = useState(false);
  const emojiRef = useRef<EmojiType[]>([])

  const filterEmojis = (word: string) => {
    const result = emojiRef.current.filter((emoji) => {
      return emoji.keywords.some((keyword) => {
        return keyword.includes(word);
      });
    });
  
    setEmojis(result);

    if (word === '') {
      setEmojis(emojiRef.current)
    }
  };

  const copyEmoji = (emoji) => {
    setShowToast(true);
    navigator.clipboard.writeText(emoji)
      setTimeout(() => {
        setShowToast(false);
      }, 800);
  }

  const fetchEmojis = () => {
    fetch(filePath)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data: EmojiType[]) => {
        setEmojis(data);
        emojiRef.current = data
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  useEffect(() => {
    fetchEmojis();
  }, []);

  return (
    <EmojiContext.Provider value={{ emojis, filterEmojis, copyEmoji, showToast }}>
      {children}
    </EmojiContext.Provider>
  );
};

export default EmojiProvider;
