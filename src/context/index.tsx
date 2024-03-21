import React, {
  useRef,
  useState,
  useEffect,
  ReactNode,
  createContext,
} from 'react';

import { EMOJI_FILE_PATH, LOCAL_STORAGE_KEY } from '@constants/index';

interface EmojiType {
  emoji: string;
  category: string;
  keywords: string[];
}

interface ContextType {
  emojis: EmojiType[];
  emojisHistory: string[];
  showToast: boolean;
  filterEmojis: (word: string) => void;
  copyEmoji: (emoji: string) => void;
}

interface Props {
  children: ReactNode;
}

const initialContext: ContextType = {
  emojis: [],
  emojisHistory: [],
  showToast: false,
  filterEmojis: () => null,
  copyEmoji: () => null,
};

export const EmojiContext = createContext<ContextType>(initialContext);

const saveInLocalStorage = (emojis: Array<string>) =>
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(emojis));

const EmojiProvider: React.FC<Props> = ({ children }) => {
  const [emojis, setEmojis] = useState<EmojiType[]>([]);
  const [emojisHistory, setEmojisHistory] = useState<string[]>([]);
  const [showToast, setShowToast] = useState(false);
  const emojiRef = useRef<EmojiType[]>([]);

  const filterEmojis = (word: string) => {
    const result = emojiRef.current.filter((emoji) => {
      return emoji.keywords.some((keyword) => {
        return keyword.includes(word);
      });
    });

    setEmojis(result);

    if (word === '') {
      setEmojis(emojiRef.current);
    }
  };

  const copyEmoji = (emoji: string) => {
    navigator.clipboard.writeText(emoji);

    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 1500);

    const localStorageEmoji = localStorage.getItem(LOCAL_STORAGE_KEY);
    const emojiHistory = localStorageEmoji ? JSON.parse(localStorageEmoji) : [];

    if (!Array.isArray(emojiHistory)) return;
    if (emojiHistory.includes(emoji)) return;
    if (emojiHistory.length > 9) {
      emojiHistory.pop();
      const newEmojis = [emoji, ...emojiHistory];
      saveInLocalStorage(newEmojis);
      return setEmojisHistory(newEmojis);
    }

    const newEmojis = [emoji, ...emojiHistory];
    saveInLocalStorage(newEmojis);
    setEmojisHistory(newEmojis);
  };

  const fetchEmojis = () => {
    fetch(EMOJI_FILE_PATH)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data: EmojiType[]) => {
        setEmojis(data);
        emojiRef.current = data;
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      })
      .finally(() => {
        const emojiHistory = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (!emojiHistory) {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([]));
          return setEmojisHistory([]);
        }

        return setEmojisHistory(JSON.parse(emojiHistory as string));
      });
  };

  useEffect(() => {
    fetchEmojis();
  }, []);

  return (
    <EmojiContext.Provider
      value={{
        emojis,
        showToast,
        emojisHistory,
        copyEmoji,
        filterEmojis,
      }}
    >
      {children}
    </EmojiContext.Provider>
  );
};

export default EmojiProvider;
